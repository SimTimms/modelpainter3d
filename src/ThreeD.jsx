import React, { useFrame, useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'rc-slider/assets/index.css';
import { paints } from './paints.js';
import { SliderGroup } from './SliderGroup';
import SelectionButton from './SelectionButton';
const CameraController = (light) => {
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

type LoadedModelType = {
  [key: string]: boolean,
};
export default function ThreeD({}) {
  const [currentPaint, setCurrentPaint] = React.useState(paints[0]);
  const [neck, setNeck] = React.useState(0);
  const [torsoBone, setTorsoBone] = React.useState(0);
  const [torsoTopBone, setTorsoTopBone] = React.useState(0);
  const [baseColor, setBaseColor] = React.useState(paints[3]);
  const [spray, setSpray] = React.useState(false);
  const [modelAttachments, setModelAttachments] = React.useState({
    armR: { 0: 'boltgun', 1: 'flamer', 2: 'auto', 3: 'boltgun', 4: 'boltgun' },
    head: { 0: 'face', 1: 'helmet', 2: 'helmet', 3: 'helmet', 4: 'helmet' },
    attachment: {
      0: 'cloak',
      1: '',
      2: '',
      3: '',
      4: '',
    },
    ironCross: {
      0: 'ironCross',
      1: '',
      2: '',
      3: '',
      4: '',
    },
  });
  const [arm, setArm] = React.useState(0);
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [armRRot, setArmRRot] = React.useState(0);
  const [squadSize, setSquadSize] = React.useState(1);
  const [lighting, setLighting] = React.useState(0.5);
  const [currentModel, setCurrentModel] = React.useState('termie');
  const [loadedModels, setLoadedModels] = React.useState({
    termie: false,
    tyranid: false,
  });

  function buildAttachmentButtons() {
    const attachmentArr = [
      { name: 'armR', value: 'sword', title: 'Sword' },
      { name: 'armR', value: 'boltgun', title: 'Boltgun' },
      { name: 'armR', value: 'auto', title: 'Assualt Cannon' },
      { name: 'armR', value: 'flamer', title: 'Flamer' },
      { name: 'head', value: ['helmet', 'face'], title: 'Helmet' },
      { name: 'attachment', value: ['cloak', ''], title: 'Cloak' },
      { name: 'ironCross', value: ['ironCross', ''], title: 'Cross' },
    ];
    const buttonArr = [];

    for (let i = 0; i < attachmentArr.length; i++) {
      const thisAttach = attachmentArr[i];
      const isArray = Array.isArray(thisAttach.value);
      buttonArr.push(
        <SelectionButton
          onClickEvent={() => {
            const modelAttachmentsCopy = { ...modelAttachments };
            if (isArray) {
              modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] =
                modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] ===
                thisAttach.value[0]
                  ? thisAttach.value[1]
                  : thisAttach.value[0];
            } else {
              modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] =
                thisAttach.value;
            }
            setModelAttachments(modelAttachmentsCopy);
          }}
          title={thisAttach.title}
          isActive={
            isArray
              ? thisAttach.value[0] ===
                modelAttachments[thisAttach.name][`${unitIndex}`]
                ? true
                : false
              : modelAttachments[thisAttach.name][`${unitIndex}`] ===
                thisAttach.value
          }
        />
      );
    }
    return buttonArr;
  }
  function buildSquad(baseColor) {
    const squadArr = [];

    for (let i = 0; i < 5; i++) {
      const positionX =
        i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
      const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 40 : -40;
      squadArr.push(
        <group
          position={[positionX, 0, positionZ]}
          key={`model_${i}`}
          visible={i >= squadSize ? false : true}
        >
          <Model
            neck={neck}
            torsoBone={torsoBone}
            torsoTopBone={torsoTopBone}
            currentPaint={currentPaint}
            armRRot={armRRot}
            arm={arm}
            armR={modelAttachments.armR[`${i}`]}
            attachment={modelAttachments.attachment[`${i}`]}
            head={modelAttachments.head[`${i}`]}
            ironCross={modelAttachments.ironCross[`${i}`]}
            paintRef={paintRef}
            show={true}
            squadIndex={i}
            baseColor={baseColor}
          />
        </group>
      );
    }
    return squadArr;
  }
  const light = useRef();
  useEffect(() => {
    const newModel: LoadedModelType = { ...loadedModels };
    newModel[currentModel] = true;
    setLoadedModels(newModel);
  }, [currentModel]);

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
              onClick={() => {
                if (spray) {
                  setBaseColor(paint);
                } else {
                  setCurrentPaint(paint);
                }
              }}
            ></div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: 'rgba(17, 50, 33, 0.4)',
          width: 50,
          position: 'fixed',
          padding: 10,
          zIndex: 100,
        }}
      >
        <SliderGroup
          title="Squad"
          min={1}
          max={5}
          value={squadSize}
          change={setSquadSize}
          i={1}
        />
        <SliderGroup
          title={`Unit ${unitIndex}`}
          min={0}
          max={squadSize}
          value={unitIndex > squadSize ? squadSize : unitIndex}
          change={setUnitIndex}
          i={1}
        />
        <SliderGroup
          title="Lighting"
          min={0.1}
          max={2}
          value={lighting}
          change={setLighting}
          i={0.1}
        />
        <SliderGroup
          title="Torso"
          min={-1}
          max={1}
          value={torsoTopBone}
          change={setTorsoTopBone}
          i={0.01}
        />
        <SliderGroup
          title="Legs"
          min={-0.5}
          max={0.5}
          value={torsoBone}
          change={setTorsoBone}
          i={0.01}
        />
        <SliderGroup
          title="Head"
          min={-0.5}
          max={0.5}
          value={neck}
          change={setNeck}
          i={0.01}
        />
        <SliderGroup
          title="Left Arm"
          min={-0.5}
          max={0.5}
          value={arm}
          change={setArm}
          i={0.01}
        />
        <SliderGroup
          title="Right Arm"
          min={-0.5}
          max={0.5}
          value={armRRot}
          change={setArmRRot}
          i={0.01}
        />
      </div>
      <div
        style={{
          width: 500,
          position: 'fixed',
          padding: 10,
          left: 220,
          zIndex: 100,
        }}
      >
        {buildAttachmentButtons()}
        <SelectionButton
          onClickEvent={() => {
            setSpray(!spray);
          }}
          title="Spray"
          isActive={spray}
        />
      </div>
      <div
        style={{
          position: 'fixed',
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 1000,
          pointerEvents: 'none',
        }}
      ></div>
      <Canvas
        shadows={true}
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: `radial-gradient(50% 50% at 50% 50%, #222 0%, #000 100%)`,
        }}
        camera={{ fov: 50, position: [0, 100, 140], near: 0.1, zoom: 1 }}
      >
        <CameraController light={light} />
        <group position={[0, 100, 0]}>
          <ambientLight intensity={0.005} />
        </group>
        <group ref={light}>
          <group position={[0, 40, -40]}>
            <spotLight
              intensity={lighting * 1}
              castShadow
              penumbra={1}
              shadow-mapSize-height={4090}
              shadow-mapSize-width={4090}
            />
          </group>
          <group position={[0, 40, 40]}>
            <spotLight
              intensity={lighting * 1}
              castShadow
              penumbra={1}
              shadow-mapSize-height={4090}
              shadow-mapSize-width={4090}
            />
          </group>
        </group>

        <Suspense fallback={null}>
          {loadedModels.termie && (
            <group position={[0, 20, 0]}>{buildSquad(baseColor)}</group>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
