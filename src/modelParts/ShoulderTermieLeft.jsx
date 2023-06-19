/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/shoulder_termie_left.gltf
*/

import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from './Mesh.jsx';

export function ShoulderTermieLeft(props) {
  const { nodes, materials } = useGLTF(
    'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_left.gltf'
  );
  const [colours, setColours] = useState([]);
  const [newNodeArr, setNewNodeArr] = useState([]);

  useEffect(() => {
    const nodeArr = Object.keys(nodes);
    setNewNodeArr(nodeArr);
  }, [nodes]);

  return (
    <group {...props}>
      {newNodeArr.map((node, index) => {
        if (!nodes[node].geometry) return null;
        return (
          <Mesh
            key={`${index}-SL`}
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

useGLTF.preload(
  'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_left.gltf'
);
