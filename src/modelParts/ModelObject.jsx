/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/terminator_cloak.gltf
*/
import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Mesh } from './Mesh.jsx';

export function ModelObject(props) {
  const { squadIndex, url, paintRef, show, currentPaint, baseColor, clone } =
    props;
  const { nodes } = useGLTF(url);
  const [newNodeArr, setNewNodeArr] = useState([]);

  useEffect(() => {
    const nodeArr = Object.keys(nodes);
    setNewNodeArr(nodeArr);
  }, [nodes]);
  console.log('paintRef', paintRef);
  return (
    <group {...props}>
      {newNodeArr.map((node, index) => {
        if (!nodes[node] || !nodes[node].geometry) return null;
        return (
          <Mesh
            key={`${index}-${squadIndex}-${url}`}
            nodeGeometry={nodes[node].geometry}
            position={nodes[node].position}
            material={nodes[node].material}
            currentPaint={currentPaint}
            paintRef={paintRef}
            name={`${node}`}
            unitNumber={squadIndex}
            show={show}
            baseColor={baseColor}
            clone={clone}
          />
        );
      })}
    </group>
  );
}
