export function Light(props) {
  return (
    <group position={props.position}>
      {props.v && (
        <mesh position={[0, 0, 0]}>
          <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
          <meshStandardMaterial castShadow={true} receiveShadow={true} />
        </mesh>
      )}

      <pointLight
        color={props.c}
        intensity={props.i || 10}
        distance={props.d || 42}
      />
    </group>
  );
}
