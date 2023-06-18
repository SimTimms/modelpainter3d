import React, { useState, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'rc-slider/assets/index.css';
import { Spacehulk } from './modelParts/Spacehulk.jsx';
import { paints } from './paints.js';
import { SliderGroup } from './SliderGroup';
import { TyranidModel } from './TyranidModel.jsx';
const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 1;
    controls.maxDistance = 200;
    controls.zoomSpeed = 0.5;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default function ThreeD({}) {
  const [currentPaint, setCurrentPaint] = React.useState(paints[0]);
  const [neck, setNeck] = React.useState(0);
  const [torsoBone, setTorsoBone] = React.useState(0);
  const [torsoTopBone, setTorsoTopBone] = React.useState(0);
  const [arm, setArm] = React.useState(0);
  const [armR, setArmR] = React.useState('boltgun');
  const [attachment, setAttachment] = React.useState('');
  const [ironCross, setIronCross] = React.useState('');
  const [armRRot, setArmRRot] = React.useState(0);
  const [lighting, setLighting] = React.useState(1);
  const [head, setHead] = React.useState('helmet');
  const paintRef = useRef({});
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        margin: 'auto',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: 'rgba(17, 50, 33, 1)',
          width: '100%',
          position: 'fixed',
          zIndex: 2,
          bottom: 0,
          padding: 10,
          boxSizing: 'border-box',
          borderTop: '2px solid #333',
          borderLeft: '2px solid #333',
          borderBottom: '2px solid #111',
          borderRight: '2px solid #111',
          boxShadow: 'inset 0 0 10px #000',
        }}
      >
        <div
          style={{
            background:
              'repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0px,rgba(0,0,0,0.2) 4px,rgba(0,0,0,0) 2px,rgba(0,0,0,0) 2px) ',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        ></div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {paints.map((paint, index) => (
            <div
              key={`${index}-${paint.color}`}
              style={{
                background: paint.color,
                width: 20,
                height: 20,
              }}
              onClick={() => setCurrentPaint(paint)}
            ></div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: 'rgba(17, 50, 33, 0.4)',
          width: 200,
          position: 'fixed',
          padding: 10,
          zIndex: 100,
          borderTop: '2px solid #333',
          borderLeft: '2px solid #333',
          borderBottom: '2px solid #222',
          borderRight: '2px solid #222',
          boxShadow: 'inset 0 0 10px #000',
        }}
      >
        <div
          style={{
            background:
              'repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0px,rgba(0,0,0,0.4) 4px,rgba(0,0,0,0) 2px,rgba(0,0,0,0) 2px) ',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        ></div>
        <SliderGroup
          title="Lighting"
          min={0.1}
          max={2}
          value={lighting}
          change={setLighting}
        />
        <SliderGroup
          title="Torso"
          min={-1}
          max={1}
          value={torsoTopBone}
          change={setTorsoTopBone}
        />
        <SliderGroup
          title="Legs"
          min={-0.5}
          max={0.5}
          value={torsoBone}
          change={setTorsoBone}
        />
        <SliderGroup
          title="Head"
          min={-0.5}
          max={0.5}
          value={neck}
          change={setNeck}
        />
        <SliderGroup
          title="Left Arm"
          min={-0.5}
          max={0.5}
          value={arm}
          change={setArm}
        />
        <SliderGroup
          title="Right Arm"
          min={-0.5}
          max={0.5}
          value={armRRot}
          change={setArmRRot}
        />
      </div>
      <div
        style={{
          background: 'rgba(17, 50, 33, 0.4)',
          width: 200,
          position: 'fixed',
          padding: 10,
          left: 220,
          zIndex: 100,
          borderTop: '2px solid #333',
          borderLeft: '2px solid #333',
          borderBottom: '2px solid #222',
          borderRight: '2px solid #222',
          boxShadow: 'inset 0 0 10px #000',
        }}
      >
        <div
          style={{
            background:
              'repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0px,rgba(0,0,0,0.4) 4px,rgba(0,0,0,0) 2px,rgba(0,0,0,0) 2px) ',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        ></div>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: armR === 'sword' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => {
            setArmR('sword');
          }}
        >
          {'Sword'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: armR === 'boltgun' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setArmR('boltgun')}
        >
          {'Boltgun'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: armR === 'auto' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setArmR('auto')}
        >
          {'Auto'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: armR === 'flamer' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setArmR('flamer')}
        >
          {'Flamer'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: attachment === 'cloak' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setAttachment(attachment === 'cloak' ? '' : 'cloak')}
        >
          {'Cloak'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: ironCross === 'ironCross' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() =>
            setIronCross(ironCross === 'ironCross' ? '' : 'ironCross')
          }
        >
          {'Iron Cross'}
        </button>
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: head === 'helmet' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setHead('helmet')}
        >
          Helmet
        </button>{' '}
        <button
          style={{
            background: 'none',
            color: '#6fe861',
            opacity: head === 'face' ? 1 : 0.5,
            border: 'none',
          }}
          onClick={() => setHead('face')}
        >
          Face
        </button>
      </div>
      <div
        style={{
          /*background:
            'repeating-linear-gradient(to bottom,rgba(0,0,0,0) 0px,rgba(0,0,0,0.4) 4px,rgba(0,0,0,0) 2px,rgba(0,0,0,0) 2px)',*/
          position: 'fixed',
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      ></div>
      <Canvas
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: '#222',
        }}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 50, position: [0, 0, 40], near: 0.1, zoom: 1 }}
      >
        <CameraController />
        <group position={[0, 20, 20]}>
          <directionalLight intensity={lighting * 0.1} />
        </group>

        <Suspense fallback={null}>
          <group
            position={[0, -52, 0]}
            scale={1.4}
            rotation={[0, -0.4 * Math.PI, 0]}
          >
            <Spacehulk currentPaint={currentPaint} lighting={lighting} />
          </group>
          <group position={[0, 0, -60]}>
            <TyranidModel currentPaint={currentPaint} paintRef={paintRef} />
          </group>
          <Model
            neck={neck}
            torsoBone={torsoBone}
            torsoTopBone={torsoTopBone}
            currentPaint={currentPaint}
            armRRot={armRRot}
            arm={arm}
            armR={armR}
            attachment={attachment}
            head={head}
            ironCross={ironCross}
            paintRef={paintRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
