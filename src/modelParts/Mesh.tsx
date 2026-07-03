import { memo, useState, useRef, useEffect, useMemo } from 'react';
import { Edges, Html, Line } from '@react-three/drei';
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
  onPaintApplied: (payload: {
    paintKey: string;
    unitNumber: number;
    previousPaint: PaintType | string | null;
    nextPaint: PaintType | string;
  }) => void;
  isPaintingEnabled: boolean;
}
    
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
    onPaintApplied,
    isPaintingEnabled,
  } = props;
  const [colours, setColours] = useState<PaintType | string | null>(null);
  const pointerGestureRef = useRef({
    startX: 0,
    startY: 0,
    moved: false,
  });
  const activePaint = colours || baseColor;
  const activePaintColor =
    typeof activePaint === 'string' ? activePaint : activePaint?.color;
  const activePaintIsMetal =
    typeof activePaint === 'object' && !!activePaint?.metal;
  const paintKey = `${unitNumber}:${paintTargetId}`;

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

  const labelAnchor = useMemo(() => {
    if (!nodeGeometry) return [0, 0, 0] as [number, number, number];
    if (!nodeGeometry.boundingBox) {
      nodeGeometry.computeBoundingBox();
    }
    const box = nodeGeometry.boundingBox;
    if (!box) return [0, 0, 0] as [number, number, number];
    return [
      (box.min.x + box.max.x) / 2,
      box.max.y,
      (box.min.z + box.max.z) / 2,
    ] as [number, number, number];
  }, [nodeGeometry]);
  const labelTop: [number, number, number] = [
    labelAnchor[0],
    labelAnchor[1] + 8,
    labelAnchor[2],
  ];
  const labelPaint = typeof activePaint === 'object' ? activePaint : null;
  const labelKey = paintKey;
  const showLabel =
    showPaintLabels && !!labelPaint && hoveredPaintLabelKey === labelKey;

  if (!activePaintColor) return null;
  return (
    <mesh
      key="mesh"
      geometry={nodeGeometry}
      onPointerUp={(event) => {
        if (isPaintingEnabled && !pointerGestureRef.current.moved) {
          event.stopPropagation();
          const paint = currentPaintRef?.current || '#ff0000';
          const previousPaint =
            paintRef && paintRef.current[paintKey]
              ? paintRef.current[paintKey].paint
              : null;
          const isSamePaint =
            JSON.stringify(previousPaint) === JSON.stringify(paint);
          if (isSamePaint) return;
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
        }
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
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHoveredPaintLabelKey(labelKey);
      }}
      onPointerOut={() => {
        setHoveredPaintLabelKey((prev) => (prev === labelKey ? null : prev));
      }}
      material={material}
    >
     {showEdges && <Edges color={'#000'} scale={1.001} />}
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
        color={activePaintColor}
        metalness={activePaintIsMetal ? 0.6 : 0}
        roughness={activePaintIsMetal ? 0.7 : 1}
      ></meshStandardMaterial>
    </mesh>
  );
}

export const MemoMesh = memo(Mesh);
