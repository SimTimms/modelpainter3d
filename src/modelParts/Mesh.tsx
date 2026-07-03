import { memo, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Edges, Html, Line } from '@react-three/drei';
import { BufferAttribute, BufferGeometry, Vector3 } from 'three';
import { PaintType } from '../paints';

interface MeshProps {
  paintRef: any;
  currentPaintRef: React.MutableRefObject<PaintType | string>;
  paintTargetId: string;
  name: string;
  show: boolean;
  baseColor: PaintType | string;
  nodeGeometry: any;
  material: any;
  unitNumber: number;
  clone: boolean;
  showEdges: boolean;
  showPaintLabels: boolean;
  hoveredPaintLabelKey: string | null;
  setHoveredPaintLabelKey: React.Dispatch<React.SetStateAction<string | null>>;
  paintSyncTick: number;
  isSurfacePaintEnabled: boolean;
  surfaceAngleThreshold: number;
  surfaceBrushRadius: number;
  onPaintApplied: (payload: {
    paintKey: string;
    unitNumber: number;
    previousPaint: PaintType | string | null;
    nextPaint: PaintType | string;
  }) => void;
  isPaintingEnabled: boolean;
}

const hexToRgb = (hexValue: string) => {
  const normalized = hexValue.startsWith('#') ? hexValue.slice(1) : hexValue;
  const safeHex =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized;
  const int = Number.parseInt(safeHex, 16);
  return {
    r: ((int >> 16) & 255) / 255,
    g: ((int >> 8) & 255) / 255,
    b: (int & 255) / 255,
  };
};

const buildSurfaceKey = (paintKey: string, faceIndex: number) =>
  `${paintKey}::surface::${faceIndex}`;
const MAX_HOVER_SURFACE_FACES = 1400;
const MAX_PAINT_SURFACE_FACES = 6000;
const HOVER_UPDATE_INTERVAL_MS = 40;

export function Mesh(props: MeshProps) {
  const {
    paintRef,
    currentPaintRef,
    paintTargetId,
    name,
    show,
    baseColor,
    nodeGeometry,
    material,
    unitNumber,
    clone,
    showEdges,
    showPaintLabels,
    hoveredPaintLabelKey,
    setHoveredPaintLabelKey,
    paintSyncTick,
    isSurfacePaintEnabled,
    surfaceAngleThreshold,
    surfaceBrushRadius,
    onPaintApplied,
    isPaintingEnabled,
  } = props;
  const [colours, setColours] = useState<PaintType | string | null>(null);
  const [surfacePaintsVersion, setSurfacePaintsVersion] = useState(0);
  const [hoveredSurfaceFaces, setHoveredSurfaceFaces] = useState<number[] | null>(null);
  const pointerGestureRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
  });
  const lastHoverFaceRef = useRef<number | null>(null);
  const lastHoverUpdateAtRef = useRef(0);
  const lastHoverSignatureRef = useRef('');
  const facePaintsRef = useRef<Map<number, PaintType | string>>(new Map());
  const activePaint = colours || baseColor;
  const activePaintColor =
    typeof activePaint === 'string' ? activePaint : activePaint?.color;
  const activePaintIsMetal =
    typeof activePaint === 'object' && !!activePaint?.metal;
  const paintKey = `${unitNumber}:${paintTargetId}`;

  const localGeometry = useMemo(() => {
    if (!nodeGeometry) return null;
    return nodeGeometry.clone() as BufferGeometry;
  }, [nodeGeometry]);

  const topology = useMemo(() => {
    if (!localGeometry) return null;
    const positionAttribute = localGeometry.getAttribute('position') as BufferAttribute;
    if (!positionAttribute) return null;

    const triangleCount = localGeometry.index
      ? localGeometry.index.count / 3
      : positionAttribute.count / 3;
    const edgeMap = new Map<string, number[]>();
    const faceNormals: Vector3[] = new Array(triangleCount);
    const faceCenters: Vector3[] = new Array(triangleCount);

    const a = new Vector3();
    const b = new Vector3();
    const c = new Vector3();
    const ab = new Vector3();
    const ac = new Vector3();
    const normal = new Vector3();

    const getVertexIndex = (triangleIndex: number, point: number) =>
      localGeometry.index
        ? Number(localGeometry.index.array[triangleIndex * 3 + point])
        : triangleIndex * 3 + point;

    const quantize = (value: number) => Math.round(value * 10000);

    const getVertexPositionKey = (vertexIndex: number) => {
      const x = quantize(positionAttribute.getX(vertexIndex));
      const y = quantize(positionAttribute.getY(vertexIndex));
      const z = quantize(positionAttribute.getZ(vertexIndex));
      return `${x}:${y}:${z}`;
    };

    const registerEdge = (v1: number, v2: number, faceIndex: number) => {
      const p1 = getVertexPositionKey(v1);
      const p2 = getVertexPositionKey(v2);
      const key = p1 < p2 ? `${p1}|${p2}` : `${p2}|${p1}`;
      const faces = edgeMap.get(key);
      if (faces) {
        faces.push(faceIndex);
      } else {
        edgeMap.set(key, [faceIndex]);
      }
    };

    for (let faceIndex = 0; faceIndex < triangleCount; faceIndex++) {
      const ia = getVertexIndex(faceIndex, 0);
      const ib = getVertexIndex(faceIndex, 1);
      const ic = getVertexIndex(faceIndex, 2);
      a.fromBufferAttribute(positionAttribute, ia);
      b.fromBufferAttribute(positionAttribute, ib);
      c.fromBufferAttribute(positionAttribute, ic);
      ab.subVectors(b, a);
      ac.subVectors(c, a);
      normal.crossVectors(ab, ac).normalize();
      faceNormals[faceIndex] = normal.clone();
      faceCenters[faceIndex] = a.clone().add(b).add(c).multiplyScalar(1 / 3);
      registerEdge(ia, ib, faceIndex);
      registerEdge(ib, ic, faceIndex);
      registerEdge(ic, ia, faceIndex);
    }

    const neighbors = Array.from({ length: triangleCount }, () => [] as number[]);
    edgeMap.forEach((faces) => {
      if (faces.length < 2) return;
      for (let i = 0; i < faces.length; i++) {
        for (let j = i + 1; j < faces.length; j++) {
          neighbors[faces[i]].push(faces[j]);
          neighbors[faces[j]].push(faces[i]);
        }
      }
    });

    return { geometry: localGeometry, neighbors, faceNormals, faceCenters, triangleCount };
  }, [localGeometry]);

  const cosineThreshold = useMemo(() => {
    const clamped = Math.max(0, Math.min(179, surfaceAngleThreshold));
    return Math.cos((clamped * Math.PI) / 180);
  }, [surfaceAngleThreshold]);

  const getConnectedSurfaceFaces = useCallback(
    (startFace: number, maxFaces = Number.POSITIVE_INFINITY) => {
      if (!topology || startFace < 0 || startFace >= topology.triangleCount) {
        return [];
      }
      const queue = [startFace];
      const visited = new Set<number>([startFace]);

      while (queue.length > 0 && visited.size < maxFaces) {
        const face = queue.shift()!;
        const currentNormal = topology.faceNormals[face];
        for (const neighbor of topology.neighbors[face]) {
          if (visited.size >= maxFaces) break;
          if (visited.has(neighbor)) continue;
          const dot = topology.faceNormals[neighbor].dot(currentNormal);
          if (dot >= cosineThreshold) {
            visited.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
      return [...visited];
    },
    [topology, cosineThreshold]
  );

  const getSurfaceFacesFromPointer = useCallback(
    (event: any, maxFaces = Number.POSITIVE_INFINITY) => {
      if (!topology || event?.faceIndex === undefined || event?.faceIndex === null) {
        return [];
      }
      const hitFace = event.faceIndex as number;
      if (surfaceBrushRadius <= 0) {
        return getConnectedSurfaceFaces(hitFace, maxFaces);
      }

      const localHitPoint = event.point?.clone?.();
      if (localHitPoint && event.object?.worldToLocal) {
        event.object.worldToLocal(localHitPoint);
      }

      const radiusSq = surfaceBrushRadius * surfaceBrushRadius;
      const seedFaces = new Set<number>([hitFace]);
      if (localHitPoint) {
        for (let faceIndex = 0; faceIndex < topology.triangleCount; faceIndex++) {
          if (topology.faceCenters[faceIndex].distanceToSquared(localHitPoint) <= radiusSq) {
            seedFaces.add(faceIndex);
          }
        }
      }

      const allFaces = new Set<number>();
      seedFaces.forEach((seed) => {
        if (allFaces.size >= maxFaces) return;
        const budget = Math.max(0, maxFaces - allFaces.size);
        getConnectedSurfaceFaces(seed, budget).forEach((face) => allFaces.add(face));
      });
      return [...allFaces];
    },
    [topology, surfaceBrushRadius, getConnectedSurfaceFaces]
  );

  const applyFaceColors = useCallback(() => {
    if (!topology) return;
    const geometry = topology.geometry;
    const positionAttribute = geometry.getAttribute('position') as BufferAttribute;
    if (!positionAttribute) return;
    const fallbackColor = activePaintColor || '#808080';
    const fallback = hexToRgb(fallbackColor);
    const colors = new Float32Array(positionAttribute.count * 3);

    for (let vertex = 0; vertex < positionAttribute.count; vertex++) {
      colors[vertex * 3] = fallback.r;
      colors[vertex * 3 + 1] = fallback.g;
      colors[vertex * 3 + 2] = fallback.b;
    }

    const getVertexIndex = (faceIndex: number, corner: number) =>
      geometry.index
        ? Number(geometry.index.array[faceIndex * 3 + corner])
        : faceIndex * 3 + corner;

    facePaintsRef.current.forEach((paint, faceIndex) => {
      const colorValue = typeof paint === 'string' ? paint : paint.color;
      if (!colorValue) return;
      const rgb = hexToRgb(colorValue);
      for (let corner = 0; corner < 3; corner++) {
        const vertexIndex = getVertexIndex(faceIndex, corner);
        colors[vertexIndex * 3] = rgb.r;
        colors[vertexIndex * 3 + 1] = rgb.g;
        colors[vertexIndex * 3 + 2] = rgb.b;
      }
    });

    geometry.setAttribute('color', new BufferAttribute(colors, 3));
    geometry.attributes.color.needsUpdate = true;
  }, [topology, activePaintColor]);

  const hoverOverlayGeometry = useMemo(() => {
    if (!topology || !hoveredSurfaceFaces || hoveredSurfaceFaces.length === 0) {
      return null;
    }
    const sourceGeometry = topology.geometry;
    const positionAttribute = sourceGeometry.getAttribute('position') as BufferAttribute;
    if (!positionAttribute) return null;
    const positions: number[] = [];

    const getVertexIndex = (faceIndex: number, corner: number) =>
      sourceGeometry.index
        ? Number(sourceGeometry.index.array[faceIndex * 3 + corner])
        : faceIndex * 3 + corner;

    hoveredSurfaceFaces.forEach((faceIndex) => {
      for (let corner = 0; corner < 3; corner++) {
        const vertexIndex = getVertexIndex(faceIndex, corner);
        positions.push(
          positionAttribute.getX(vertexIndex),
          positionAttribute.getY(vertexIndex),
          positionAttribute.getZ(vertexIndex)
        );
      }
    });

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    geometry.computeVertexNormals();
    return geometry;
  }, [topology, hoveredSurfaceFaces]);

  useEffect(() => {
    if (paintRef && paintRef.current[paintKey]) {
      setColours(paintRef.current[paintKey].paint);
    }
  }, [paintRef, paintKey]);

  useEffect(() => {
    if (paintRef && paintRef.current[paintKey]) {
      setColours(paintRef.current[paintKey].paint);
    }
  }, [clone, paintRef, paintKey]);

  useEffect(() => {
    if (paintRef && paintRef.current[paintKey]) {
      setColours(paintRef.current[paintKey].paint);
      return;
    }
    setColours(null);
  }, [paintKey, paintRef, paintSyncTick]);

  useEffect(() => {
    if (!isSurfacePaintEnabled || !paintRef || !topology) {
      facePaintsRef.current = new Map();
      setSurfacePaintsVersion((prev) => prev + 1);
      return;
    }
    const prefix = `${paintKey}::surface::`;
    const nextFacePaints = new Map<number, PaintType | string>();
    Object.entries(paintRef.current || {}).forEach(([entryKey, entry]: [string, any]) => {
      if (!entryKey.startsWith(prefix)) return;
      const faceIndex = Number.parseInt(entryKey.slice(prefix.length), 10);
      if (!Number.isFinite(faceIndex)) return;
      const surfaceFaces = getConnectedSurfaceFaces(faceIndex);
      surfaceFaces.forEach((face) => nextFacePaints.set(face, entry.paint));
    });
    facePaintsRef.current = nextFacePaints;
    setSurfacePaintsVersion((prev) => prev + 1);
  }, [paintKey, paintRef, paintSyncTick, isSurfacePaintEnabled, topology, getConnectedSurfaceFaces]);

  useEffect(() => {
    if (!isSurfacePaintEnabled) return;
    applyFaceColors();
  }, [isSurfacePaintEnabled, applyFaceColors, surfacePaintsVersion, activePaintColor]);

  useEffect(
    () => () => {
      if (hoverOverlayGeometry) hoverOverlayGeometry.dispose();
    },
    [hoverOverlayGeometry]
  );

  const labelAnchor = useMemo(() => {
    if (!localGeometry) return [0, 0, 0] as [number, number, number];
    if (!localGeometry.boundingBox) {
      localGeometry.computeBoundingBox();
    }
    const box = localGeometry.boundingBox;
    if (!box) return [0, 0, 0] as [number, number, number];
    return [
      (box.min.x + box.max.x) / 2,
      box.max.y,
      (box.min.z + box.max.z) / 2,
    ] as [number, number, number];
  }, [localGeometry]);
  const labelTop: [number, number, number] = [
    labelAnchor[0],
    labelAnchor[1] + 8,
    labelAnchor[2],
  ];
  const labelPaint = typeof activePaint === 'object' ? activePaint : null;
  const labelKey = paintKey;
  const showLabel =
    showPaintLabels && !!labelPaint && hoveredPaintLabelKey === labelKey;

  if (!activePaintColor || !localGeometry) return null;

  return (
    <group>
      <mesh
        key={name}
        geometry={localGeometry}
        onPointerUp={(event) => {
          if (!isPaintingEnabled || pointerGestureRef.current.moved) return;
          event.stopPropagation();
          const paint = currentPaintRef?.current || '#ff0000';

          if (isSurfacePaintEnabled && event.faceIndex !== undefined && event.faceIndex !== null) {
            const surfaceFaces = getSurfaceFacesFromPointer(event, MAX_PAINT_SURFACE_FACES);
            if (surfaceFaces.length === 0) return;
            const surfaceId = Math.min(...surfaceFaces);
            const surfacePaintKey = buildSurfaceKey(paintKey, surfaceId);
            const previousPaint = paintRef?.current?.[surfacePaintKey]?.paint || null;
            if (JSON.stringify(previousPaint) === JSON.stringify(paint)) return;

            surfaceFaces.forEach((face) => facePaintsRef.current.set(face, paint));
            setSurfacePaintsVersion((prev) => prev + 1);
            applyFaceColors();

            if (paintRef) {
              paintRef.current[surfacePaintKey] = {
                paint,
                unitNumber: unitNumber,
              };
            }
            onPaintApplied({
              paintKey: surfacePaintKey,
              unitNumber,
              previousPaint,
              nextPaint: paint,
            });
            return;
          }

          const previousPaint = paintRef?.current?.[paintKey]?.paint || null;
          if (JSON.stringify(previousPaint) === JSON.stringify(paint)) return;
          setColours(paint);
          if (paintRef) {
            paintRef.current[paintKey] = {
              paint,
              unitNumber: unitNumber,
            };
          }
          onPaintApplied({
            paintKey,
            unitNumber,
            previousPaint,
            nextPaint: paint,
          });
        }}
        position={show && [0, 10, 0]}
        castShadow={true}
        receiveShadow={true}
        onPointerDown={(event) => {
          pointerGestureRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          const dx = Math.abs(event.clientX - pointerGestureRef.current.startX);
          const dy = Math.abs(event.clientY - pointerGestureRef.current.startY);
          if (dx > 8 || dy > 8) {
            pointerGestureRef.current.moved = true;
          }
          if (!isSurfacePaintEnabled || event.faceIndex === undefined || event.faceIndex === null) {
            return;
          }
          const now = performance.now();
          const hitFace = event.faceIndex as number;
          if (
            lastHoverFaceRef.current === hitFace &&
            now - lastHoverUpdateAtRef.current < HOVER_UPDATE_INTERVAL_MS
          ) {
            return;
          }
          if (now - lastHoverUpdateAtRef.current < HOVER_UPDATE_INTERVAL_MS) {
            return;
          }
          lastHoverUpdateAtRef.current = now;
          lastHoverFaceRef.current = hitFace;
          const hoverFaces = getSurfaceFacesFromPointer(event, MAX_HOVER_SURFACE_FACES);
          const signature = `${hitFace}:${hoverFaces.length}`;
          if (signature === lastHoverSignatureRef.current) return;
          lastHoverSignatureRef.current = signature;
          setHoveredSurfaceFaces(hoverFaces);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHoveredPaintLabelKey(labelKey);
          if (!isSurfacePaintEnabled || event.faceIndex === undefined || event.faceIndex === null) {
            return;
          }
          const hitFace = event.faceIndex as number;
          lastHoverFaceRef.current = hitFace;
          lastHoverUpdateAtRef.current = performance.now();
          const hoverFaces = getSurfaceFacesFromPointer(event, MAX_HOVER_SURFACE_FACES);
          lastHoverSignatureRef.current = `${hitFace}:${hoverFaces.length}`;
          setHoveredSurfaceFaces(hoverFaces);
        }}
        onPointerOut={() => {
          setHoveredPaintLabelKey((prev) => (prev === labelKey ? null : prev));
          lastHoverFaceRef.current = null;
          lastHoverSignatureRef.current = '';
          setHoveredSurfaceFaces(null);
        }}
        material={material}
      >
        {showEdges && <Edges color="#000" scale={1.001} />}
        {showLabel && (
          <>
            <Line
              points={[labelAnchor, labelTop]}
              color="#ffffff"
              lineWidth={1}
              transparent
              opacity={0.85}
            />
            <Html position={labelTop} center distanceFactor={20}>
              <div
                style={{
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: 4,
                  padding: '6px 10px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: labelPaint.color,
                    border: '1px solid rgba(255,255,255,0.5)',
                    flexShrink: 0,
                  }}
                />
                <span>{labelPaint.name}</span>
              </div>
            </Html>
          </>
        )}

        <meshStandardMaterial
          attach="material"
          color={isSurfacePaintEnabled ? '#ffffff' : activePaintColor}
          vertexColors={isSurfacePaintEnabled}
          metalness={activePaintIsMetal ? 0.6 : 0}
          roughness={activePaintIsMetal ? 0.7 : 1}
        />
      </mesh>
      {isSurfacePaintEnabled && hoverOverlayGeometry && (
        <mesh
          geometry={hoverOverlayGeometry}
          position={show && [0, 10, 0]}
          renderOrder={10}
        >
          <meshBasicMaterial
            color="#6ac6ff"
            transparent
            opacity={0.35}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
      )}
    </group>
  );
}

export const MemoMesh = memo(Mesh);
