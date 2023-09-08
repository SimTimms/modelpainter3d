import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { Necron } from './Necron-mini';
import { Sister } from './SisterMini';
import { Gaunt } from './GauntMini';
import 'rc-slider/assets/index.css';
import { paints } from './paints';
import { SliderGroup } from './SliderGroup';
import SelectionButton from './SelectionButton';
import {
  defaultState,
  defaultNecronState,
  defaultSisterState,
  defaultTyranidState,
} from './defaultState';
import { CameraController } from './CameraController';
import { buildAttachmentButtons } from './buildAttachmentButtons';
import {
  attachmentOptions,
  attachmentOptionsNecron,
  attachmentOptionsSister,
  attachmentOptionsTyranid,
} from './defaultState';
import termie from './assets/termie.jpg';
import sister from './assets/sister.jpg';
import necron from './assets/necron.jpg';
import gauntImg from './assets/gaunt.jpg';
import sprayImg from './assets/spray.jpg';
import cloneImg from './assets/clone.jpg';
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
  const [background, setBackground] = React.useState('black');
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
          ) : currentModel === 'sister' ? (
            <Sister
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
          ) : currentModel === 'gaunt' ? (
            <Gaunt
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
          width: 50,
          position: 'fixed',
          padding: 10,
          zIndex: 100,
          right: 0,
        }}
      >
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultTyranidState);
            setAttachmentMenu(attachmentOptionsTyranid);
            setCurrentModel('gaunt');
          }}
          title="Gaunt"
          img={gauntImg}
          isActive={currentModel === 'gaunt'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultState);
            setAttachmentMenu(attachmentOptions);
            setCurrentModel('termie');
          }}
          title="Terminator"
          img={termie}
          isActive={currentModel === 'termie'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultSisterState);
            setAttachmentMenu(attachmentOptionsSister);
            setCurrentModel('sister');
          }}
          title="Sister"
          img={sister}
          isActive={currentModel === 'sister'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultNecronState);
            setAttachmentMenu(attachmentOptionsNecron);
            setCurrentModel('necron');
          }}
          title="Necron"
          img={necron}
          isActive={currentModel === 'necron'}
        />
      </div>
      <div
        style={{
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
          width: `calc(100vw - 200px)`,
          position: 'fixed',
          padding: 10,
          left: 100,
          zIndex: 100,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
          img={sprayImg}
          isActive={spray}
        />

        {squadSize > 1 && (
          <SelectionButton
            onClickEvent={() => {
              setClone(!clone);
            }}
            title="Clone"
            img={cloneImg}
            isActive={clone}
          />
        )}
        <button
          style={{
            background:
              background === 'black'
                ? 'gray'
                : background === 'grey'
                ? 'white'
                : 'black',
            color:
              background === 'black'
                ? 'black'
                : background === 'grey'
                ? 'black'
                : 'white',
            border: 'none',
            width: 50,
            height: 50,
            margin: 3,
            marginTop: 0,
            cursor: 'pointer',
            borderRadius: 5,
          }}
          onClick={() => {
            setBackground(
              background === 'black'
                ? 'white'
                : background === 'white'
                ? 'grey'
                : 'black'
            );
          }}
        >
          BG
        </button>
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
          background:
            background === 'black'
              ? `radial-gradient(50% 50% at 50% 50%, #222 0%, #000 100%)`
              : background === 'grey'
              ? `radial-gradient(50% 50% at 50% 50%, #aaa 0%, #666 100%)`
              : `radial-gradient(50% 50% at 50% 50%, #fff 0%, #aaa 100%)`,
        }}
        camera={{ fov: 50, position: [0, 150, 140], near: 0.1, zoom: 1 }}
      >
        <CameraController light={light} rotate={true} />
        <group position={[0, 100, 0]}>
          <ambientLight intensity={0.006} />
        </group>
        <group ref={light}>
          <group position={[0, 40, -40]}>
            <spotLight
              intensity={lighting * 1}
              castShadow
              penumbra={1}
              shadow-mapSize-height={1024}
              shadow-mapSize-width={1024}
            />
          </group>
          <group position={[0, -40, 80]}>
            <spotLight intensity={lighting * 1.001} penumbra={1} />
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
          <group
            visible={currentModel === 'gaunt' ? true : false}
            scale={currentModel === 'gaunt' ? 1 : 0}
            position={[0, 20, 0]}
          >
            {buildSquad('gaunt')}
          </group>
          <group
            visible={currentModel === 'sister' ? true : false}
            scale={currentModel === 'sister' ? 1 : 0}
            position={[0, 20, 0]}
          >
            {buildSquad('sister')}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
