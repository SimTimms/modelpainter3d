import React from 'react';

export function ModelImport(props) {
  return (
    <group>
      <group {...props} position={props.position}>
        <group position={[0, -9.8, -4.0]}>{props.torso}</group>
      </group>
    </group>
  );
}
