import React from 'react';

export function ModelImport(props) {
  return (
    <group position={[1, -30, 0]}>
      <group position={[1, -1, 0]} rotation={[0, 1.4 * Math.PI, 0]}>
        {props.base}
      </group>
      {props.torso}
    </group>
  );
}
