import { useState, useRef, useEffect } from 'react';
import { Edges } from '@react-three/drei';
import { PaintType } from '../paints';

interface MeshProps {
  paintRef: any;
  currentPaint: PaintType | string;
  name: string;
  show: boolean;
  baseColor: PaintType | string;
  nodeGeometry: any;
  material: any;
  unitNumber: number;
  clone: boolean;
}
    
export function Mesh(props: MeshProps) {
  const {
    paintRef,
    currentPaint,
    name,
    show,
    baseColor,
    nodeGeometry,
    material,
    unitNumber,
    clone,
  } = props;
  const [colours, setColours] = useState<PaintType | string | null>(null);
  const [base, setBase] = useState<PaintType | string | null>(null);
  const canPaint = useRef(true);
  const activePaint = colours || base;
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
      if (clone) setColours(paintRef.current[name].paint);
    }
  }, [clone]);

  useEffect(() => {
    setBase(baseColor);
  }, [baseColor]);
  if (!base || !activePaintColor) return null;
  return (
    <mesh
      key="mesh"
      geometry={nodeGeometry}
      onPointerUp={(event) => {
        if (canPaint.current) {
          event.stopPropagation();
            setColours(currentPaint ? currentPaint : '#ff0000');
            if (paintRef) {
              paintRef.current[name] = {
                paint: currentPaint ? currentPaint : '#ff0000',
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
      <Edges
        color={
        '#000'
        }
        scale={1.001}
      />

      <meshStandardMaterial
        attach="material"
        color={activePaintColor}
        metalness={activePaintIsMetal ? 0.6 : 0}
        roughness={activePaintIsMetal ? 0.7 : 1}
      ></meshStandardMaterial>
    </mesh>
  );
}
