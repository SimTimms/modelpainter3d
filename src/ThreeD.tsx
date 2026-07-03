import React, { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useProgress } from '@react-three/drei';
import { Model } from './Marine-mini';
import 'rc-slider/assets/index.css';
import { paints } from './paints';
import { SliderGroup } from './SliderGroup';
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
import { Vector3 } from 'three';

function ModelLoadingOverlay() {
  const { active, progress, item, loaded, total } = useProgress();
  const [bootLoadStarted, setBootLoadStarted] = React.useState(false);
  const [bootLoadFinished, setBootLoadFinished] = React.useState(false);
  const clampedProgress = Math.max(0, Math.min(100, Math.round(progress)));

  React.useEffect(() => {
    if (active) {
      setBootLoadStarted(true);
      return;
    }
    if (bootLoadStarted && !active) {
      setBootLoadFinished(true);
    }
  }, [active, bootLoadStarted]);

  if (bootLoadFinished) return null;
  const showProgress = active && total > 0;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(5, 5, 8, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 'min(420px, calc(100vw - 40px))',
          border: '1px solid #555',
          borderRadius: 8,
          padding: '16px 14px',
          background: 'rgba(20,20,24,0.85)',
          color: '#fff',
          fontSize: 12,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ marginBottom: 8, letterSpacing: 0.3 }}>
          {showProgress ? 'Loading models...' : 'Please wait...'}
        </div>
        {showProgress ? (
          <>
            <div
              style={{
                height: 8,
                width: '100%',
                background: '#2a2a2a',
                borderRadius: 999,
                overflow: 'hidden',
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${clampedProgress}%`,
                  background: '#87a7ff',
                  transition: 'width 120ms linear',
                }}
              />
            </div>
            <div style={{ color: '#b8b8b8', marginBottom: 4 }}>
              {loaded}/{total} assets
            </div>
            <div
              style={{
                color: '#8f8f8f',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {item || 'Preparing assets...'} ({clampedProgress}%)
            </div>
          </>
        ) : (
          <div
            style={{
              color: '#8f8f8f',
            }}
          >
            Preparing the workspace...
          </div>
        )}
      </div>
    </div>
  );
}

export default function ThreeD({ isVisible }) {
  const initialIsMobile =
    typeof window !== 'undefined' ? window.innerWidth <= 900 : false;
  const [currentPaint, setCurrentPaint] = React.useState(paints[0]);
  const [baseColor, setBaseColor] = React.useState(paints[3]);
  const [paintName, setPaintName] = React.useState<string | undefined>(undefined);
  const [clone, setClone] = React.useState(false);
  const [modelAttachments, setModelAttachments] =
    React.useState(defaultTyranidState);
  const [unitIndex, setUnitIndex] = React.useState(0);
  const [backgroundColor, setBackgroundColor] = React.useState(paints[0]);
  const [lighting, setLighting] = React.useState(0.5);
  const [showEdges, setShowEdges] = React.useState(true);
  const [isScreenshotMode, setIsScreenshotMode] = React.useState(false);
  const [squadSize, setSquadSize] = React.useState(1);
  const [loadedSquadSize, setLoadedSquadSize] = React.useState(1);
  const [squadSizeDraft, setSquadSizeDraft] = React.useState(1);
  const [isSquadSizePending, startSquadSizeTransition] = React.useTransition();
  const [isModelPending, startModelTransition] = React.useTransition();
  const [isAttachmentPending, startAttachmentTransition] = React.useTransition();
  const [isCloneModalOpen, setIsCloneModalOpen] = React.useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = React.useState(false);
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

  const [currentModel, setCurrentModel] = React.useState('guardsmanLow');
  const [attachmentMenu, setAttachmentMenu] = React.useState(
    attachmentOptionsTyranid
  );
  const [isMobileMode, setIsMobileMode] = React.useState(initialIsMobile);
  const [collapsedPanels, setCollapsedPanels] = React.useState({
    model: initialIsMobile,
    scene: true,
    paintTool: true,
    palette: initialIsMobile,
  });
  const togglePanel = React.useCallback(
    (panel: 'model' | 'scene' | 'paintTool' | 'palette') => {
      setCollapsedPanels((prev) => ({ ...prev, [panel]: !prev[panel] }));
    },
    []
  );
  const modelSwitchPerfRef = useRef<{ modelKey: string; start: number } | null>(
    null
  );
  const partSwapPerfRef = useRef<{ start: number; unitIndex: number } | null>(null);
  const currentPaintRef = useRef(currentPaint);
  const preloadedUrlsRef = useRef<Set<string>>(new Set());
  const modelLabels = React.useMemo(
    () => ({
      guardsman: 'Guard',
      guardsmanLow: 'Guardsman Low',
      eldar: 'Aeldari',
      dread: 'Dreadnought',
      ork: 'Ork',
      primaris: 'Space Marine',
      gaunt: 'Gaunt',
      sister: 'Battle Sister',
      necron: 'Necron',
    }),
    []
  );
  const modelKeys = React.useMemo(() => Object.keys(modelLabels), [modelLabels]);
  const modelAssetMap = React.useMemo(
    () => ({
      termie: [
        'skeleton.gltf',
        'base_medium.glb',
      ],
      necron: [
        'skeleton.gltf',
        'base_medium.glb',
        'necron_torso.glb',
        'necron_flayer.glb',
      ],
      gaunt: ['skeleton.gltf', 'base_small.glb', 'gaunt.glb'],
      eldar: [
        'skeleton.gltf',
        'base_small.glb',
        'eldar.glb',
        'eldar_arm_both_gun.glb',
      ],
      guardsman: ['skeleton.gltf', 'base_small.glb', 'guardsman.glb'],
      guardsmanLow: ['skeleton.gltf', 'base_small.glb', 'guardsman-low.glb'],
      ork: ['skeleton.gltf', 'base_small.glb', 'ork.glb', 'ork_arm.glb'],
      sister: ['skeleton.gltf', 'base_small.glb', 'sister.glb'],
      tau: ['skeleton.gltf', 'base_small.glb', 'tau.glb', 'tau_arm.glb'],
      dread: ['skeleton.gltf', 'dread.glb'],
      primaris: [
        'skeleton.gltf',
        'base_medium.glb',
        'primaris_torso.glb',
        'primaris_backpack.glb',
        'primaris_helmet.glb',
        'primaris_boltgun.glb',
      ],
    }),
    []
  );
  const handleModelSelect = React.useCallback((modelKey: string) => {
    modelSwitchPerfRef.current = { modelKey, start: performance.now() };
    console.info(`[perf] model switch start -> ${modelKey}`);
    startModelTransition(() => {
      if (modelKey === 'primaris') {
        setModelAttachments(defaultPrimarisState);
        setAttachmentMenu(attachmentOptionsPrimaris);
        setCurrentModel('primaris');
      } else if (modelKey === 'termie') {
        setModelAttachments(defaultState as any);
        setAttachmentMenu(attachmentOptions as any);
        setCurrentModel('termie');
      } else if (modelKey === 'sister') {
        setModelAttachments(defaultSisterState as any);
        setAttachmentMenu(attachmentOptionsSister);
        setCurrentModel('sister');
      } else if (modelKey === 'necron') {
        setModelAttachments(defaultNecronState as any);
        setAttachmentMenu(attachmentOptionsNecron);
        setCurrentModel('necron');
      } else if (modelKey === 'eldar') {
        setModelAttachments(defaultTyranidState as any);
        setAttachmentMenu(attachmentOptionsEldar);
        setCurrentModel('eldar');
      } else {
        setModelAttachments(defaultTyranidState as any);
        setAttachmentMenu(attachmentOptionsTyranid);
        setCurrentModel(modelKey);
      }
    });
    setIsModelDropdownOpen(false);
  }, [startModelTransition]);
  React.useEffect(() => {
    if (!isModelPending && modelSwitchPerfRef.current) {
      const { modelKey, start } = modelSwitchPerfRef.current;
      const elapsed = performance.now() - start;
      console.info(
        `[perf] model switch complete -> ${modelKey} (${elapsed.toFixed(1)}ms)`
      );
      modelSwitchPerfRef.current = null;
    }
  }, [isModelPending, currentModel]);
  React.useEffect(() => {
    currentPaintRef.current = currentPaint;
  }, [currentPaint]);

  const setModelAttachmentsWithPerf = React.useCallback(
    (nextAttachments: any) => {
      partSwapPerfRef.current = { start: performance.now(), unitIndex };
      console.info(`[perf] part swap start -> unit ${unitIndex + 1}`);
      startAttachmentTransition(() => {
        setModelAttachments(nextAttachments);
      });
    },
    [unitIndex, startAttachmentTransition]
  );
  const handleCloneToggle = React.useCallback(() => {
    setIsCloneModalOpen(true);
  }, []);
  const handleConfirmClone = React.useCallback(() => {
    setClone((prev) => !prev);
    setIsCloneModalOpen(false);
  }, []);
  const returnToBrushOnSceneClick = React.useCallback(() => {
    if (isScreenshotMode) {
      return;
    }
    if (paintMode !== 'brush') {
      setPaintMode('brush');
    }
  }, [paintMode, isScreenshotMode]);

  React.useEffect(() => {
    const debounceTimer = window.setTimeout(() => {
      startSquadSizeTransition(() => {
        setSquadSize(squadSizeDraft);
      });
    }, 150);

    return () => window.clearTimeout(debounceTimer);
  }, [squadSizeDraft, startSquadSizeTransition]);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileMode(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  React.useEffect(() => {
    const currentModelUrls = modelAssetMap[currentModel] || [];
    currentModelUrls.forEach((url) => {
      if (!preloadedUrlsRef.current.has(url)) {
        useGLTF.preload(url);
        preloadedUrlsRef.current.add(url);
      }
    });
  }, [currentModel, modelAssetMap]);
  React.useEffect(() => {
    if (!isAttachmentPending && partSwapPerfRef.current) {
      const { start, unitIndex: swapUnitIndex } = partSwapPerfRef.current;
      const elapsed = performance.now() - start;
      console.info(
        `[perf] part swap complete -> unit ${swapUnitIndex + 1} (${elapsed.toFixed(1)}ms)`
      );
      partSwapPerfRef.current = null;
    }
  }, [isAttachmentPending, modelAttachments]);
  const attachmentButtons = React.useMemo(
    () =>
      buildAttachmentButtons(
        modelAttachments,
        setModelAttachmentsWithPerf,
        unitIndex,
        attachmentMenu
      ),
    [attachmentMenu, modelAttachments, setModelAttachmentsWithPerf, unitIndex]
  );

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
  const paintToolControls = (
    <div style={{ display: 'flex', gap: 6, flexWrap: isMobileMode ? 'wrap' : 'nowrap' }}>
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
            border: 'none',
            background: '#222',
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
  );

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
      <ModelLoadingOverlay />
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 2100,
        }}
      >
        <button
          type="button"
          onClick={() => setIsScreenshotMode((prev) => !prev)}
          style={{
            border: '1px solid #555',
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            borderRadius: 4,
            padding: '6px 10px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          {isScreenshotMode ? 'Screen Mode' : 'Paint Mode'}
        </button>
      </div>
      {!isScreenshotMode && (
        <>
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
            margin: '0 10px 10px',
            padding: 8,
            border: '1px solid #333',
            borderRadius: 6,
            background: 'rgba(0,0,0,0.35)',
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {isMobileMode && (
            <button
              type="button"
              onClick={() => togglePanel('palette')}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: 11,
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                marginBottom: collapsedPanels.palette ? 0 : 6,
              }}
            >
              {collapsedPanels.palette ? '▶' : '▼'} Paints
            </button>
          )}
          {(!isMobileMode || !collapsedPanels.palette) && (
            <>
              <div
                style={{
                  color: 'grey',
                  fontSize: 10,
                  marginBottom: 3,
                }}
              >
                {paintName}
              </div>

              <div
                style={{
                  color: 'white',
                  fontSize: 10,
                  marginBottom: 6,
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
              {isMobileMode && (
                <div style={{ borderTop: '1px solid #444', paddingTop: 8, marginTop: 8 }}>
                  <div style={{ fontSize: 10, color: '#aaa', marginBottom: 6 }}>Paint Tool</div>
                  {paintToolControls}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div
        style={{
          position: 'fixed',
          top: 10,
          left: 10,
          right: isMobileMode ? 10 : 'auto',
          zIndex: 110,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'stretch',
          maxHeight: isMobileMode ? 'calc(100vh - 220px)' : 'none',
          overflowY: isMobileMode ? 'auto' : 'visible',
        }}
      >
        <div
          style={{
            padding: 8,
            border: '1px solid #333',
            borderRadius: 6,
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {isMobileMode ? (
            <button
              type="button"
              onClick={() => togglePanel('model')}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: 11,
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {collapsedPanels.model ? '▶' : '▼'} Model
            </button>
          ) : (
            <div style={{ fontSize: 10, color: '#aaa' }}>Model</div>
          )}
          {(!isMobileMode || !collapsedPanels.model) && (
            <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <button
              type="button"
              onClick={() => setIsModelDropdownOpen((prev) => !prev)}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: 10,
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                userSelect: 'none',
              }}
            >
              {isModelDropdownOpen ? '▼' : '▶'} {modelLabels[currentModel]}
            </button>
            {isModelDropdownOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {modelKeys.map((modelKey) => (
                  <button
                    key={modelKey}
                    type="button"
                    onClick={() => handleModelSelect(modelKey)}
                    style={{
                      border:
                        currentModel === modelKey ? '1px solid #fff' : '1px solid #555',
                      background: currentModel === modelKey ? '#333' : '#222',
                      color: '#fff',
                      borderRadius: 4,
                      padding: '6px 8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: 10,
                      userSelect: 'none',
                    }}
                  >
                    {modelLabels[modelKey]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ borderTop: '1px solid #444', paddingTop: 8 }}>
            <SliderGroup
              title="Squad Size"
              min={1}
              max={5}
              value={squadSizeDraft}
              change={setSquadSizeDraft as any}
              i={1}
              squadIndex={0}
              width={150}
              roundHandle={true}
              titleFontSize={10}
              titleColor="#aaa"
            />
          </div>
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
            <div style={{ fontSize: 10, color: '#aaa' }}>Selected Unit</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={`loadout_unit_picker_${i}`}
                  type="button"
                  onClick={() => {
                    if (i < squadSizeDraft) {
                      setUnitIndex(i);
                    }
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: unitIndex === i ? '1px solid #fff' : '1px solid #555',
                    background: unitIndex === i ? '#3f3f3f' : '#222',
                    color: '#fff',
                    fontSize: 10,
                    cursor: i < squadSizeDraft ? 'pointer' : 'default',
                    padding: 0,
                    opacity: i < squadSizeDraft ? 1 : 0.4,
                    userSelect: 'none',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          {attachmentButtons.length > 0 && (
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
                  userSelect: 'none',
                }}
              >
                {isLoadoutExpanded ? '▼' : '▶'} Loadout - Unit {unitIndex + 1}
              </button>
              {isLoadoutExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {attachmentButtons}
                </div>
              )}
            </div>
          )}
            </>
          )}
        </div>
        <div
          style={{
            padding: 8,
            border: '1px solid #333',
            borderRadius: 6,
            background: 'rgba(0,0,0,0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            boxSizing: 'border-box',
            userSelect: 'none',
          }}
        >
          {isMobileMode ? (
            <button
              type="button"
              onClick={() => togglePanel('scene')}
              style={{
                background: 'none',
                border: 'none',
                color: '#aaa',
                fontSize: 11,
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {collapsedPanels.scene ? '▶' : '▼'} Scene
            </button>
          ) : (
            <div style={{ fontSize: 10, color: '#aaa' }}>Scene</div>
          )}
          {(!isMobileMode || !collapsedPanels.scene) && (
            <>
              <SliderGroup
                title="Lighting"
                min={0.1}
                max={1}
                value={lighting}
                change={setLighting as any}
                i={0.1}
                squadIndex={0}
                width={150}
                roundHandle={true}
                titleFontSize={10}
                titleColor="#aaa"
              />
              <div style={{ borderTop: '1px solid #444', paddingTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setShowEdges((prev) => !prev)}
                  style={{
                    border: '1px solid #555',
                    background: '#222',
                    color: '#fff',
                    borderRadius: 4,
                    padding: '6px 8px',
                    fontSize: 10,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span>Edging</span>
                  <span>{showEdges ? 'On' : 'Off'}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {!isMobileMode && (
      <div
        style={{
          width: `calc(100vw - 200px)`,
          position: 'fixed',
          padding: 10,
          left: 100,
          bottom: 'auto',
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
            margin: isMobileMode ? 0 : 3,
          }}
        >
          <div style={{ fontSize: 10, color: '#aaa' }}>Paint Tool</div>
          {paintToolControls}
        </div>
      </div>
      )}
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
      {isModelPending && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
            background: 'rgba(0,0,0,0.75)',
            color: '#fff',
            border: '1px solid #666',
            borderRadius: 6,
            padding: '6px 10px',
            fontSize: 12,
            letterSpacing: 0.2,
            pointerEvents: 'none',
          }}
        >
          Switching model...
        </div>
      )}
        </>
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
              intensity={lighting}
              castShadow
              penumbra={1}
              shadow-mapSize-height={2048}
              shadow-mapSize-width={2048}
            />
          </group>

          <group position={[40, 130, 40]}>
            <spotLight intensity={lighting * 0.5} />
          </group>
        </group>
        <Suspense
          fallback={buildSquadPlaceholders(
            0,
            Math.max(loadedSquadSize, squadSizeDraft)
          )}
        >
          <group position={[0, 0, 0]}>
            <Model
              currentModel={currentModel}
              currentPaintRef={currentPaintRef}
              parts={modelAttachments}
              paintRef={paintRef}
              squadIndex={unitIndex}
              baseColor={baseColor}
              clone={clone}
              squadSize={loadedSquadSize}
              visibleSquadSize={squadSizeDraft}
              showEdges={showEdges}
              isPaintingEnabled={!isScreenshotMode}
              showSelectionRing={!isScreenshotMode}
            />
            {squadSizeDraft > loadedSquadSize &&
              buildSquadPlaceholders(loadedSquadSize, squadSizeDraft)}
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
