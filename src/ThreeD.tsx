import React, { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Model } from './Marine-mini';
import 'rc-slider/assets/index.css';
import { paints, PaintType } from './paints';
import { SliderGroup } from './SliderGroup';
import SelectionButton from './SelectionButton';
import {
  defaultState,
  defaultNecronState,
  defaultSisterState,
  defaultTyranidState,
  defaultPrimarisState,
} from './defaultState';
import { CameraController } from './CameraController';
import { buildAttachmentButtons } from './buildAttachmentButtons';
import { CloneSchemeModal } from './CloneSchemeModal';
import {
  attachmentOptions,
  attachmentOptionsNecron,
  attachmentOptionsSister,
  attachmentOptionsTyranid,
  attachmentOptionsEldar,
  attachmentOptionsPrimaris,
} from './defaultState';
import termie from './assets/termie.jpg';
import sister from './assets/sister.jpg';
import primaris from './assets/primaris.jpg';
import necron from './assets/necron.jpg';
import gauntImg from './assets/gaunt.jpg';
import orkImg from './assets/ork.jpg';
import dreadImg from './assets/dread.jpg';
import eldar from './assets/eldar.jpg';
import guardsman from './assets/guardsman.jpg';
import { Vector3 } from 'three';

export default function ThreeD({ isVisible }) {
  const [currentPaint, setCurrentPaint] = React.useState(paints[0]);
  const [baseColor, setBaseColor] = React.useState(paints[3]);
  const [paintName, setPaintName] = React.useState<string | undefined>(undefined);
  const [clone, setClone] = React.useState(false);
  const [modelAttachments, setModelAttachments] =
    React.useState(defaultPrimarisState);
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [backgroundColor, setBackgroundColor] = React.useState(paints[0]);
  const [squadSize, setSquadSize] = React.useState(1);
  const [loadedSquadSize, setLoadedSquadSize] = React.useState(1);
  const [squadSizeDraft, setSquadSizeDraft] = React.useState(1);
  const [isSquadSizePending, startSquadSizeTransition] = React.useTransition();
  const [isCloneModalOpen, setIsCloneModalOpen] = React.useState(false);
  const [isLoadoutExpanded, setIsLoadoutExpanded] = React.useState(true);
  const [paintMode, setPaintMode] = React.useState<'base' | 'brush' | 'background'>(
    'base'
  );
  const activePaint =
    paintMode === 'base'
      ? baseColor
      : paintMode === 'background'
      ? backgroundColor
      : currentPaint;

  const [currentModel, setCurrentModel] = React.useState('primaris');
  const [attachmentMenu, setAttachmentMenu] = React.useState(
    attachmentOptionsPrimaris
  );
  const handleCloneToggle = React.useCallback(() => {
    if (clone) {
      setClone(false);
      return;
    }
    setIsCloneModalOpen(true);
  }, [clone]);
  const handleConfirmClone = React.useCallback(() => {
    setClone(true);
    setIsCloneModalOpen(false);
  }, []);
  const returnToBrushOnSceneClick = React.useCallback(() => {
    if (paintMode !== 'brush') {
      setPaintMode('brush');
    }
  }, [paintMode]);

  React.useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      startSquadSizeTransition(() => {
        setSquadSize(squadSizeDraft);
      });
    }, 150);

    return () => window.clearTimeout(debounceTimer);
  }, [squadSizeDraft, startSquadSizeTransition]);

  React.useEffect(() => {
    if (squadSize > loadedSquadSize) {
      startSquadSizeTransition(() => {
        setLoadedSquadSize(squadSize);
      });
    }
  }, [squadSize, loadedSquadSize, startSquadSizeTransition]);

  React.useEffect(() => {
    if (unitIndex >= squadSizeDraft) {
      setUnitIndex(Math.max(0, squadSizeDraft - 1));
    }
  }, [unitIndex, squadSizeDraft]);

  const pose = {
    termie: [
      { armRRot: 0, arm: 0.5, neck: 0.1, torsoBone: -0.1, torsoTopBone: 0.2 },
      { armRRot: 0.2, arm: -0.3, neck: 0.2, torsoBone: 0.1, torsoTopBone: 0.3 },
      {
        armRRot: 0.5,
        arm: 0.3,
        neck: -0.3,
        torsoBone: 0.2,
        torsoTopBone: -0.3,
      },
      { armRRot: -0.3, arm: 0.1, neck: 0, torsoBone: 0.1, torsoTopBone: -0.3 },
      { armRRot: -0.1, arm: 0.5, neck: -0.3, torsoBone: 0, torsoTopBone: 0 },
    ],
    necron: [
      { armRRot: 0, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 0.2, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 0.15, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: -0.3, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: -0.1, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
    ],
    ork: [
      { armRRot: 0, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 1, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 0.7, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 1, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
      { armRRot: 1, arm: 0, neck: 0, torsoBone: 0, torsoTopBone: 0 },
    ],
  };
  const light = useRef();
  const paintRef = useRef({});
  const buildSquadPlaceholders = (startIndex: number, endIndex: number) => {
    const placeholders = [];
    for (let i = startIndex; i < endIndex; i++) {
      const positionX =
        i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
      const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 80 : -40;

      placeholders.push(
        <group position={[positionX, 20, positionZ]} key={`placeholder_${i}`}>
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[9, 16, 16]} />
            <meshStandardMaterial
              color={baseColor.color}
              metalness={0.05}
              roughness={0.9}
              transparent
              opacity={0.9}
            />
          </mesh>
        </group>
      );
    }
    return placeholders;
  };

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
        <div
          style={{
            color: 'grey',
            fontSize: 10,
            marginLeft: 3,
            marginBottom: 3,
          }}
        >
          {paintName}
        </div>

        <div
          style={{
            color: 'white',
            fontSize: 10,
            marginLeft: 3,
            marginBottom: 3,
          }}
        >
          {paintMode === 'base'
            ? 'Base Coat'
            : paintMode === 'background'
            ? 'Background'
            : 'Brush'}
          : {activePaint.name} -{' '}
          {activePaint.company}
          {activePaint.link && (
            <a
              style={{ color: 'grey', marginLeft: 5 }}
              href={activePaint.link}
              target="_blank"
              rel="noreferrer"
            >
              BUY
            </a>
          )}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {paints.map((paint, index) => (
            <div
              key={`${index}-${paint.color}`}
              style={{
                background: paint.color,
                width: 20,
                height: 20,
                borderRadius: '50%',
                margin: 1,
                cursor: 'pointer',
                boxShadow: paint.metal
                  ? 'inset -3px -3px 5px rgba(0,0,0,0.2), inset 3px 3px 2px rgba(255,255,255,0.4)'
                  : '',
                textAlign: 'center',
                fontSize: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(0,0,0,0.3)',
              }}
              onMouseOver={() => setPaintName(paint.name)}
              onClick={() => {
                if (paintMode === 'base') {
                  setBaseColor(paint);
                } else if (paintMode === 'background') {
                  setBackgroundColor(paint);
                } else if (paintMode === 'brush') {
                  setCurrentPaint(paint);
                }
              }}
            >
              {paint.name.substring(0, 1)}
            </div>
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
            setModelAttachments(defaultTyranidState as any);
            setAttachmentMenu(attachmentOptionsTyranid);
            setCurrentModel('guardsman');
          }}
          title="Guardsman"
          img={guardsman}
          isActive={currentModel === 'guardsman'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultTyranidState as any);
            setAttachmentMenu(attachmentOptionsEldar);
            setCurrentModel('eldar');
          }}
          title="Eldar"
          img={eldar}
          isActive={currentModel === 'eldar'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultTyranidState as any);
            setAttachmentMenu(attachmentOptionsTyranid);
            setCurrentModel('dread');
          }}
          title="Dread"
          img={dreadImg}
          isActive={currentModel === 'dread'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultTyranidState as any);
            setAttachmentMenu(attachmentOptionsTyranid);
            setCurrentModel('ork');
          }}
          title="Ork"
          img={orkImg}
          isActive={currentModel === 'ork'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultPrimarisState);
            setAttachmentMenu(attachmentOptionsPrimaris);
            setCurrentModel('primaris');
          }}
          title="Primaris"
          img={primaris}
          isActive={currentModel === 'primaris'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultTyranidState as any);
            setAttachmentMenu(attachmentOptionsTyranid);
            setCurrentModel('gaunt');
          }}
          title="Gaunt"
          img={gauntImg}
          isActive={currentModel === 'gaunt'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultState as any);
            setAttachmentMenu(attachmentOptions as any);
            setCurrentModel('termie');
          }}
          title="Terminator"
          img={termie}
          isActive={currentModel === 'termie'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultSisterState as any);
            setAttachmentMenu(attachmentOptionsSister);
            setCurrentModel('sister');
          }}
          title="Sister"
          img={sister}
          isActive={currentModel === 'sister'}
        />
        <SelectionButton
          onClickEvent={() => {
            setModelAttachments(defaultNecronState as any);
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
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 110,
          padding: 8,
          border: '1px solid #333',
          borderRadius: 6,
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          width: 300,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 10, color: '#aaa' }}>Squad</div>
        <SliderGroup
          title="Squad Size"
          min={1}
          max={5}
          value={squadSizeDraft}
          change={setSquadSizeDraft as any}
          i={1}
          squadIndex={0}
        />
        {buildAttachmentButtons(
          modelAttachments,
          setModelAttachments,
          unitIndex,
          attachmentMenu
        ).length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              paddingTop: 8,
              borderTop: '1px solid #444',
              maxWidth: '100%',
            }}
          >
            <button
              type="button"
              onClick={() => setIsLoadoutExpanded((prev) => !prev)}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: 10,
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {isLoadoutExpanded ? '▼' : '▶'} Loadout - Unit {unitIndex + 1}
            </button>
            {isLoadoutExpanded && (
              <>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Array.from({ length: squadSizeDraft }, (_, i) => (
                    <button
                      key={`loadout_unit_picker_${i}`}
                      type="button"
                      onClick={() => setUnitIndex(i)}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        border: unitIndex === i ? '1px solid #fff' : '1px solid #555',
                        background: unitIndex === i ? '#3f3f3f' : '#222',
                        color: '#fff',
                        fontSize: 10,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {buildAttachmentButtons(
                    modelAttachments,
                    setModelAttachments,
                    unitIndex,
                    attachmentMenu
                  )}
                </div>
              </>
            )}
          </div>
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: 6,
            border: '1px solid #333',
            borderRadius: 6,
            background: 'rgba(0,0,0,0.35)',
            margin: 3,
          }}
        >
          <div style={{ fontSize: 10, color: '#aaa' }}>Paint Tool</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              onClick={() => setPaintMode('base')}
              style={{
                border: paintMode === 'base' ? '1px solid #fff' : '1px solid #555',
                background: paintMode === 'base' ? '#333' : '#222',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 4,
                padding: '6px 8px',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: baseColor.color,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
              Base Coat
            </button>
            <button
              type="button"
              onClick={() => setPaintMode('brush')}
              style={{
                border: paintMode === 'brush' ? '1px solid #fff' : '1px solid #555',
                background: paintMode === 'brush' ? '#333' : '#222',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 4,
                padding: '6px 8px',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: currentPaint.color,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
              Brush
            </button>
            <button
              type="button"
              onClick={() => setPaintMode('background')}
              style={{
                border: paintMode === 'background' ? '1px solid #fff' : '1px solid #555',
                background: paintMode === 'background' ? '#333' : '#222',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: 4,
                padding: '6px 8px',
                fontSize: 11,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: backgroundColor.color,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              />
              Background
            </button>
            {squadSizeDraft > 1 && (
              <button
                type="button"
                onClick={handleCloneToggle}
                style={{
                  border: clone ? '1px solid #fff' : '1px solid #555',
                  background: clone ? '#333' : '#222',
                  color: '#fff',
                  cursor: 'pointer',
                  borderRadius: 4,
                  padding: '6px 8px',
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Clone
              </button>
            )}
          </div>
        </div>
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
      <CloneSchemeModal
        isOpen={isCloneModalOpen}
        onCancel={() => setIsCloneModalOpen(false)}
        onConfirm={handleConfirmClone}
      />
      {(squadSizeDraft > loadedSquadSize ||
        (isSquadSizePending && squadSizeDraft !== squadSize)) && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2000,
            background: 'rgba(0,0,0,0.8)',
            color: '#fff',
            border: '1px solid #666',
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: 12,
            letterSpacing: 0.2,
            pointerEvents: 'none',
          }}
        >
          Loading squad...
        </div>
      )}
      <Canvas
        shadows={true}
        onPointerDown={returnToBrushOnSceneClick}
        style={{
          width: '100vw',
          height: 'calc(100vh - 80px)',
          background: backgroundColor.color,
        }}
        camera={{ fov: 50, position: [0, 150, 140] as unknown as Vector3, near: 0.1, zoom: 1 }}
      >
        <CameraController light={light} rotate={true} />
        <group position={[0, 100, 0]}>
          <ambientLight intensity={0.006} />
        </group>
        <group ref={light}>
          <group position={[0, 40, -40]}>
            <spotLight
              intensity={0.5}
              castShadow
              penumbra={1}
              shadow-mapSize-height={2048}
              shadow-mapSize-width={2048}
            />
          </group>

          <group position={[40, 130, 40]}>
            <spotLight intensity={0.25} />
          </group>
        </group>
        <Suspense
          fallback={buildSquadPlaceholders(
            0,
            Math.max(loadedSquadSize, squadSizeDraft)
          )}
        >
          <group position={[0, 20, 0]}>
            <Model
              currentModel={currentModel}
              currentPaint={currentPaint}
              parts={modelAttachments}
              paintRef={paintRef}
              squadIndex={unitIndex}
              baseColor={baseColor}
              clone={clone}
              squadSize={loadedSquadSize}
              visibleSquadSize={squadSizeDraft}
            />
            {squadSizeDraft > loadedSquadSize &&
              buildSquadPlaceholders(loadedSquadSize, squadSizeDraft)}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
