/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/shoulder_termie_left.gltf
*/

import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from './Mesh.jsx';

export function TyranidArm(props) {
  const { nodes, materials } = useGLTF(
    props.show
      ? 'https://model-painter.s3.eu-west-2.amazonaws.com/tyranid_arm.gltf'
      : 'https://model-painter.s3.eu-west-2.amazonaws.com/hidden.gltf'
  );

  const [newNodeArr, setNewNodeArr] = useState([]);

  useEffect(() => {
    const nodeArr = Object.keys(nodes);
    setNewNodeArr(nodeArr);
  }, [nodes]);

  return (
    <group
      {...props}
      rotation={[0.4 * Math.PI, 0.1 * Math.PI, 0.1 * Math.PI]}
      position={[-10, 6, -6]}
    >
      {newNodeArr.map((node, index) => {
        if (!nodes[node]) return null;
        if (!nodes[node].geometry) return null;
        return (
          <Mesh
            key={`${index}-TYH`}
            nodeGeometry={nodes[node].geometry}
            position={nodes[node].position}
            material={nodes[node].material}
            currentPaint={props.currentPaint}
            paintRef={props.paintRef}
            name={node}
            show={props.show}
          />
        );
      })}
    </group>
  );
}
