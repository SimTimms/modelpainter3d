import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { Dild } from './Dild';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Euler } from 'three';

import { TwitterPicker } from 'react-color';
import { PoseMenu } from './components/PoseMenu';
import { standPos } from './poseData';
import { animation } from './animation';

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 100;
    controls.zoomSpeed = 0.5;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default function ThreeD({}) {
  const canvas = useRef(null);
  const bones = ['pb_R_YA201_Breast_01', 'pb_R_YA201_Breast_01', 'b_R_Leg1'];
  const [boneConfig, setBoneConfig] = React.useState({
    pb_R_YA201_Breast_01: { rotation: [0.15, 0, 0], scale: 1 },
    pb_L_YA201_Breast_01: { rotation: [0.15, 0, 0], scale: 1 },
    b_R_Leg1: { rotation: [0.15, 0, 0], scale: 1 },
  });
  const [activeBone, setActiveBone] = React.useState(bones[0]);
  const [skin, setSkin] = React.useState('#fff');
  const [wetness, setWetness] = React.useState(1);
  const [spread, setSpread] = React.useState(0);
  const [showHair, setShowHair] = React.useState(false);
  const [showSuit, setShowSuit] = React.useState(false);
  const [hair, setHair] = React.useState('#fff');
  const [suit, setSuit] = React.useState('#fff');
  const [tits, setTits] = React.useState(1);
  const [ass, setAss] = React.useState(1);

  const [toFrom, setToFrom] = React.useState({
    ...standPos,
  });
  const [posMap, setPosMap] = React.useState({
    ...standPos,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const keys = Object.keys(standPos).map((key) => key);

      const newPos = { ...posMap };
      let diffs = false;
      for (let i = 0; i < keys.length; i++) {
        const rotFrom = newPos[keys[i]];
        const rotTo = toFrom[keys[i]];
        const isEuler = rotFrom.isEuler;

        let diffX = 0;
        let diffY = 0;
        let diffZ = 0;

        let rotFromPar = [];

        if (isEuler) {
          rotFromPar = [rotFrom.x, rotFrom.y, rotFrom.z];
          diffX = rotFromPar[0] - rotTo[0];
          diffY = rotFromPar[1] - rotTo[1];
          diffZ = rotFromPar[2] - rotTo[2];

          if (diffX.toFixed(2) > 0) {
            newPos[keys[i]]._x -= 0.01;
            diffs = true;
          }
          if (diffX.toFixed(2) < 0) {
            newPos[keys[i]]._x += 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) > 0) {
            newPos[keys[i]]._y -= 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) < 0) {
            newPos[keys[i]]._y += 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) > 0) {
            newPos[keys[i]]._z -= 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) < 0) {
            newPos[keys[i]]._z += 0.01;
            diffs = true;
          }

          const newEuler = new Euler(
            newPos[keys[i]]._x,
            newPos[keys[i]]._y,
            newPos[keys[i]]._z
          );
          newPos[keys[i]] = newEuler;
        } else {
          rotFromPar = [rotFrom[0], rotFrom[1], rotFrom[2]];
          diffX = rotFromPar[0] - rotTo[0];
          diffY = rotFromPar[1] - rotTo[1];
          diffZ = rotFromPar[2] - rotTo[2];

          if (diffX.toFixed(2) > 0) {
            newPos[keys[i]][0] -= 0.01;
            diffs = true;
          }
          if (diffX.toFixed(2) < 0) {
            newPos[keys[i]][0] += 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) > 0) {
            newPos[keys[i]][1] -= 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) < 0) {
            newPos[keys[i]][1] += 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) > 0) {
            newPos[keys[i]][2] -= 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) < 0) {
            newPos[keys[i]][2] += 0.01;
            diffs = true;
          }

          const newEuler = new Euler(
            newPos[keys[i]][0],
            newPos[keys[i]][1],
            newPos[keys[i]][2]
          );
          newPos[keys[i]] = newEuler;
        }

        setPosMap(newPos);
      }

      animation(diffs, toFrom, setToFrom);
    }, 10);
    return () => clearInterval(interval);
  }, [toFrom]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        position: 'rewlative',
        flexDirection: 'column',
      }}
    >
      <PoseMenu
        setToFrom={setToFrom}
        standPos={standPos}
        skin={skin}
        setSkin={setSkin}
        hair={hair}
        setHair={setHair}
        suit={suit}
        setSuit={setSuit}
      />

      <div style={{ position: 'fixed', left: 0, top: 60, zIndex: 1000 }}>
        <div
          style={{
            display: 'flex',
            maxWidth: 300,
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Tits
          <Slider
            min={0.8}
            max={2}
            value={tits}
            step={0.01}
            onChange={(value) => setTits(value)}
            style={{ margin: 10, width: 100, boxSizing: 'border-box' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            margin: 'auto',
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 300,
          }}
        >
          Ass
          <Slider
            min={1}
            max={1.3}
            value={ass}
            step={0.01}
            onChange={(value) => setAss(value)}
            style={{ margin: 10, width: 100, boxSizing: 'border-box' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            maxWidth: 300,
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Wetness
          <Slider
            min={0}
            max={1}
            value={wetness}
            step={0.01}
            onChange={(value) => setWetness(value)}
            style={{ margin: 10, width: 100, boxSizing: 'border-box' }}
          />
        </div>
      </div>
      <Canvas
        ref={canvas}
        style={{
          width: '100vw',
          height: 'calc(100vh - 60px)',
        }}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 50, position: [0, 1, 3], near: 0.001, zoom: 2 }}
      >
        <CameraController />
        <group position={[0, 20, 5.5]}>
          <ambientLight intensity={0.2} />
        </group>
        <group position={[10, 30, 0]}>
          <spotLight
            castShadow={true}
            intensity={0.8}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-focus={1}
          />
        </group>
        <group position={[10, 0, 0]}>
          <spotLight
            castShadow={true}
            intensity={0.8}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-focus={1}
            color="white"
          />
        </group>

        <Suspense fallback={null}>
          <group>
            <Model
              boneConfig={boneConfig}
              kneelPos={posMap}
              skin={skin}
              hair={hair}
              tits={tits}
              ass={ass}
              suit={suit}
              spread={spread}
              wetness={wetness}
            />
            <Dild boneConfig={boneConfig} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
