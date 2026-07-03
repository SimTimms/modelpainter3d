import { memo, useState, useRef, useEffect } from 'react';
import { Edges } from '@react-three/drei';
import { PaintType } from '../paints';

interface MeshProps {
  paintRef: any;
  currentPaintRef: React.MutableRefObject<PaintType | string>;
  name: string;
  show: boolean;
  baseColor: PaintType | string;
  nodeGeometry: any;
  material: any;
  unitNumber: number;
  clone: boolean;
  showEdges: boolean;
  isPaintingEnabled: boolean;
}
    
export function Mesh(props: MeshProps) {
  const {
    paintRef,
    currentPaintRef,
    name,
    show,
    baseColor,
    nodeGeometry,
    material,
    unitNumber,
    clone,
    showEdges,
    isPaintingEnabled,
  } = props;
  const [colours, setColours] = useState<PaintType | string | null>(null);
  const canPaint = useRef(true);
  const activePaint = colours || baseColor;
  const activePaintColor =
    typeof activePaint === 'string' ? activePaint : activePaint?.color;
  const activePaintIsMetal =
    typeof activePaint === 'object' && !!activePaint?.metal;

  useEffect(() => {
    if (paintRef && paintRef.current[name]) {
      setColours(paintRef.current[name].paint);
    }
  }, [paintRef]);

  useEffect(() => {
    if (paintRef && paintRef.current[name]) {
      setColours(paintRef.current[name].paint);
    }
  }, [clone]);

  if (!activePaintColor) return null;
  return (
    <mesh
      key="mesh"
      geometry={nodeGeometry}
      onPointerUp={(event) => {
        if (isPaintingEnabled && canPaint.current) {
          event.stopPropagation();
            const paint = currentPaintRef?.current || '#ff0000';
            setColours(paint);
            if (paintRef) {
              paintRef.current[name] = {
                paint,
                unitNumber: unitNumber,
              };
            }
        }
      }}
      position={show && [0, 10, 0]}
      castShadow={true}
      receiveShadow={true}
      onPointerDown={() => {
        canPaint.current = true;
      }}
      onPointerMove={() => (canPaint.current = false)}
      material={material}
    >
     {showEdges && <Edges color={'#000'} scale={1.001} />}

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
