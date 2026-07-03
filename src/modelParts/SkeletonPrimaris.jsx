import  { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';

export function ModelImport(props) {
  const [newNodeArr, setNewNodeArr] = useState(null);
  const { nodes } = useGLTF(
    'skeleton.gltf'
  );

  useEffect(() => {
    setNewNodeArr({
      armature: nodes.Armature.clone(),
      core: nodes.Core.clone(),
      upperArmL: nodes.UpperArmL.clone(),
      upperArmR: nodes.UpperArmR.clone(),
      bone008: nodes.Bone008.clone(),
      spine: nodes.Bone001.clone(),
    });
  }, [nodes]);

  if (!newNodeArr) return null;
  return (
    <group>
      <group {...props} position={props.position}>
        <group position={[1, -37, 0]} rotation={[0, 1.4 * Math.PI, 0]}>
          {props.base}
        </group>
        <group position={[0, -9.8, -4.0]}>{props.torso}</group>
      </group>
    </group>
  );
}
