import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from './Mesh.jsx';

export function BaseTermieLeft(props) {
  const { nodes, materials } = useGLTF(
    'https://model-painter.s3.eu-west-2.amazonaws.com/base_termie_left.gltf'
  );
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
            key={`${index}-armTLeft`}
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
  'https://model-painter.s3.eu-west-2.amazonaws.com/base_termie_left.gltf'
);
