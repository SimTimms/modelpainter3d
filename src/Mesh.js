import { useRef, useState, useLayoutEffect } from 'react';

export function Mesh({ nodes, node, material, skeleton, geometry }) {
  const [allowControls, setAllowControls] = useState(true);
  const canvasRef = useRef(document.createElement('canvas'));
  const textureRef = useRef();
  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 1024;
    canvas.height = 1024;

    const context = canvas.getContext('2d');
    if (context) {
      context.rect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'white';
      context.fill();
    }
  }, []);

  function handleBrushPointerMove({ uv }) {
    if (allowControls) {
      return;
    }
    if (uv) {
      const canvas = canvasRef.current;

      const x = uv.x * canvas.width;
      const y = (1 - uv.y) * canvas.height;

      const context = canvas.getContext('2d');
      if (context) {
        context.filter = 'blur(3px)';
        context.beginPath();
        context.arc(x - 2, y - 2, 10, 0, 2 * Math.PI);
        context.fillStyle = 'black';
        context.fill();
        textureRef.current.needsUpdate = true;
      }
    }
  }

  return skeleton ? (
    <skinnedMesh
      geometry={geometry}
      skeleton={skeleton}
      scale={100}
      onPointerDown={() => setAllowControls(false)}
      onPointerUp={() => setAllowControls(true)}
      onPointerMove={handleBrushPointerMove}
    >
      <meshStandardMaterial
        attach="material"
        metalness={0.1}
        roughness={0.75}
        color="blue"
      ></meshStandardMaterial>
    </skinnedMesh>
  ) : (
    <mesh
      geometry={nodes[node].geometry}
      // ref={(mesh) => setMeshToSampleRef(mesh)}
      scale={0.01}
      rotation={nodes[node].rotation}
      position={nodes[node].position}
      onPointerDown={() => setAllowControls(false)}
      onPointerUp={() => setAllowControls(true)}
      onPointerMove={handleBrushPointerMove}
      skeleton={skeleton}
    >
      <meshStandardMaterial
        attach="material"
        map={material.map}
        metalness={0.2}
        roughness={0.75}
        color="red"
      ></meshStandardMaterial>
    </mesh>
  );
}
