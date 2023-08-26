/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/skeleton.gltf
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';

export function TyranidSkeleton(props) {
  const { nodes } = useGLTF(
    'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf'
  );
  return (
    <group>
      <group {...props} position={props.position}>
        <group position={[0, -9.8, -4.0]}>{props.torso}</group>
        <group
          position={[0, 10, 10]}
          rotation={[-0.2 * Math.PI, 0, -0.02 * Math.PI]}
        >
          {props.head}
        </group>

        <group
          position={[6, 10, 1.0]}
          rotation={[0.4 * Math.PI, -2 * Math.PI, 0 * Math.PI]}
        >
          {props.arm2}
        </group>
        <group
          position={[16, 2, 0]}
          rotation={[0.8 * Math.PI, 1 * Math.PI, 0.4 * Math.PI]}
        >
          {props.arm2}
        </group>
        <group position={[0, 10, 7.0]}>{props.arm}</group>
        <group
          position={[0, -2, 6]}
          rotation={[0.1 * Math.PI, -0.2 * Math.PI, 0.1 * Math.PI]}
        >
          {props.arm}
        </group>
        <group position={[-1, -26, -5]}>{props.leg}</group>
        <group position={[0, -16, -10]}>{props.tail}</group>
      </group>
    </group>
  );
}

useGLTF.preload(
  'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf'
);
