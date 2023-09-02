import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';

export const CameraController = (light) => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 40;
    controls.maxDistance = 300;
    controls.zoomSpeed = 1;
    controls.addEventListener('change', render);
    if (light && light.light && camera && light.light.current) {
      light.light.current.position.copy({
        x: camera.position.x,
        y: camera.position.y + 20,
        z: camera.position.z,
      });
    }
    function render() {
      if (light && light.light && camera && light.light.current) {
        light.light.current.position.copy({
          x: camera.position.x,
          y: camera.position.y + 20,
          z: camera.position.z,
        });
      }
    }

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
