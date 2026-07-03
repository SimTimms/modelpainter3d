import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useThree } from '@react-three/fiber';

export const CameraController = ({
  light,
  isLightFixed = false,
  resetCameraSignal = 0,
}) => {
  const { camera, gl } = useThree();
  const isLightFixedRef = useRef(isLightFixed);
  const controlsRef = useRef(null);

  useEffect(() => {
    isLightFixedRef.current = isLightFixed;
  }, [isLightFixed]);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;
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
      controlsRef.current = null;
      controls.dispose();
    };
  }, [camera, gl, light]);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.reset();
    controlsRef.current.update();
  }, [resetCameraSignal]);

  return null;
};
