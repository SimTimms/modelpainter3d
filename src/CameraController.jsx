import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';

export const CameraController = ({ light, isLightFixed = false }) => {
  const { camera, gl } = useThree();
  const isLightFixedRef = useRef(isLightFixed);

  useEffect(() => {
    isLightFixedRef.current = isLightFixed;
  }, [isLightFixed]);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 40;
    controls.maxDistance = 300;
    controls.zoomSpeed = 1;
    controls.addEventListener('change', syncLightToCamera);
    function syncLightToCamera() {
      if (isLightFixedRef.current) return;
      if (light && camera && light.current) {
        light.current.position.copy({
        x: camera.position.x,
        y: camera.position.y + 20,
        z: camera.position.z,
        });
      }
    }
    syncLightToCamera();

    return () => {
      controls.dispose();
    };
  }, [camera, gl, light]);
  return null;
};
