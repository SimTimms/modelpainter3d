import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { Necron } from './Necron-mini';
import 'rc-slider/assets/index.css';
import { paints } from './paints';
import { SliderGroup } from './SliderGroup';
import SelectionButton from './SelectionButton';
import { defaultState, defaultNecronState } from './defaultState';
import { CameraController } from './CameraController';
import { buildAttachmentButtons } from './buildAttachmentButtons';
import { attachmentOptions, attachmentOptionsNecron } from './defaultState';

export default function ThreeD({ isVisible }) {
  const [currentPaint, setCurrentPaint] = React.useState(paints[0]);
  const [neck, setNeck] = React.useState(0);
  const [torsoBone, setTorsoBone] = React.useState(0);
  const [torsoTopBone, setTorsoTopBone] = React.useState(0);
  const [baseColor, setBaseColor] = React.useState(paints[3]);
  const [spray, setSpray] = React.useState(false);
  const [clone, setClone] = React.useState(false);
  const [modelAttachments, setModelAttachments] = React.useState(defaultState);
  const [arm, setArm] = React.useState(0);
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [armRRot, setArmRRot] = React.useState(0);
  const [squadSize, setSquadSize] = React.useState(1);
  const [lighting, setLighting] = React.useState(0.5);
  const [currentModel, setCurrentModel] = React.useState('termie');
  const [attachmentMenu, setAttachmentMenu] = React.useState(attachmentOptions);

  function buildSquad(currentModel) {
    const squadArr = [];
    for (let i = 0; i < squadSize; i++) {
      const positionX =
        i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
      const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 80 : -40;
      squadArr.push(
        <group
          position={[positionX, 0, positionZ]}
          key={`model_${i}`}
          visible={true}
        >
          {currentModel === 'necron' ? (
            <Necron
              neck={neck}
              torsoBone={torsoBone}
              torsoTopBone={torsoTopBone}
              paintRef={paintRef}
              currentPaint={currentPaint}
              armRRot={armRRot}
              armR={modelAttachments.armR[`${i}`]}
              show={true}
              squadIndex={i}
              baseColor={baseColor}
              clone={clone}
            />
          ) : (
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
              shield={modelAttachments.shield[`${i}`]}
              paintRef={paintRef}
              show={true}
              squadIndex={i}
              baseColor={baseColor}
              clone={clone}
            />
          )}
        </group>
      );
    }
    return squadArr;
  }
  const light = useRef();
  const paintRef = useRef({});

  return (
    <div
      style={{
        display: isVisible ? 'flex' : 'none',
        height: '100%',
        margin: 'auto',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: '100%',
          position: 'fixed',
          zIndex: 2,
          bottom: 0,
          boxSizing: 'border-box',
        }}
      >
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
          title="Squad Size"
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
        {currentModel === 'termie' && (
          <>
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
          </>
        )}
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
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultState);
            setAttachmentMenu(attachmentOptions);
            setCurrentModel('termie');
          }}
          title="Terminator"
          isActive={currentModel === 'termie'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultNecronState);
            setAttachmentMenu(attachmentOptionsNecron);
            setCurrentModel('necron');
          }}
          title="Necron"
          isActive={currentModel === 'necron'}
        />
        {buildAttachmentButtons(
          modelAttachments,
          setModelAttachments,
          unitIndex,
          attachmentMenu
        )}
        <SelectionButton
          onClickEvent={() => {
            setSpray(!spray);
          }}
          title="Spray"
          isActive={spray}
        />
        {squadSize > 1 && (
          <SelectionButton
            onClickEvent={() => {
              setClone(!clone);
            }}
            title="Clone"
            isActive={clone}
          />
        )}
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
        camera={{ fov: 50, position: [0, 150, 140], near: 0.1, zoom: 1 }}
      >
        <CameraController light={light} />
        <group position={[0, 100, 0]}>
          <ambientLight intensity={0.006} />
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
            <spotLight intensity={lighting * 1} penumbra={1} />
          </group>
        </group>

        <Suspense fallback={null}>
          <group
            visible={currentModel === 'necron' ? true : false}
            scale={currentModel === 'necron' ? 1 : 0}
            position={[0, 20, 0]}
          >
            {buildSquad('necron')}
          </group>
          <group
            visible={currentModel === 'termie' ? true : false}
            scale={currentModel === 'termie' ? 1 : 0}
            position={[0, 20, 0]}
          >
            {buildSquad('termie')}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
