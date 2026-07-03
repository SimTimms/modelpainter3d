import { memo, useMemo } from 'react';
import { ModelImport } from './modelParts/Skeleton.js';
import type { PaintType } from './paints';

interface ModelProps {
  currentPaintRef: React.MutableRefObject<PaintType>;
  paintRef: any;
  baseColor: PaintType;
  currentModel: string;
  parts: any;
  squadSize: number;
  visibleSquadSize: number;
  clone: boolean;
  squadIndex: number;
  showEdges: boolean;
  showPaintLabels: boolean;
  hoveredPaintLabelKey: string | null;
  setHoveredPaintLabelKey: React.Dispatch<React.SetStateAction<string | null>>;
  paintSyncTick: number;
  isSurfacePaintEnabled: boolean;
  surfaceAngleThreshold: number;
  surfaceBrushRadius: number;
  onPaintApplied: (payload: {
    paintKey: string;
    unitNumber: number;
    previousPaint: PaintType | string | null;
    nextPaint: PaintType | string;
  }) => void;
  isPaintingEnabled: boolean;
  showSelectionRing: boolean;
}
function ModelComponent(props: ModelProps) {
  const {
    currentPaintRef,
    paintRef,
    baseColor,
    currentModel,
    parts,
    squadSize,
    visibleSquadSize,
    clone,
    squadIndex,
    showEdges,
    showPaintLabels,
    hoveredPaintLabelKey,
    setHoveredPaintLabelKey,
    paintSyncTick,
    isSurfacePaintEnabled,
    surfaceAngleThreshold,
    surfaceBrushRadius,
    onPaintApplied,
    isPaintingEnabled,
    showSelectionRing,
  } = props;

  const partsObj = useMemo(() => {
    const builtParts = [];

    for (let i = 0; i < squadSize; i++) {
      builtParts.push(
      currentModel === 'necron'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'necron_torso.glb',
            armR:
              parts.armR[i] === 'reaper'
                ? 'necron_reaper.glb'
                : 'necron_flayer.glb',
            armRPos: {
              'necron_reaper.glb': [13, -10, 14],
              'necron_flayer.glb': [11.2, -10, 3],
            },
            base: 'base_medium.glb',
          }
        : currentModel === 'gaunt'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'gaunt.glb',
            torsoPos: {
              'gaunt.glb': [0, -37, 0],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'eldar'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'eldar.glb',
            torsoPos: {
              'eldar.glb': [-2, -6, 1],
            },
            base: 'base_small.glb',
            armR: 'eldar_arm_both_gun.glb',
            armRPos: {
              'eldar_arm_r.glb': [9, -5, 5],
              'eldar_arm_both_gun.glb': [9, -5, 5],
            },
            armL:'',
            armLPos: {
              'eldar_arm_l_axe.glb': [-5, -7.6, -12],
            },
          }
        : currentModel === 'guardsman'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'guardsman.glb',
            torsoPos: {
              'guardsman.glb': [-2, -8, 1],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'guardsmanLow'
        ? {
            skeleton: 'skeleton.gltf',
            torso: 'guardsman-low.glb',
            torsoPos: {
              'guardsman-low.glb': [-2, -8, 1],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'ork'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'ork.glb',
            armR: 'ork_arm.glb',
            torsoPos: {
              'ork.glb': [0, 0, 0],
            },
            armRPos: {
              'ork_arm.glb': [11, 2, 2],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'sister'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'sister.glb',
            base: 'base_small.glb',
          }
        : currentModel === 'tau'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'tau.glb',
            armR: 'tau_arm.glb',
            base: 'base_small.glb',
            torsoPos: {
              'tau.glb': [0, -29, 0],
            },
            armRPos: {
              'tau_arm.glb': [5, -10, 2],
            },
          }
        : currentModel === 'dread'
        ? {
            skeleton:
              'skeleton.gltf',
            torso: 'dread.glb',
            torsoPos: {
              'dread.glb': [0, 1, 0],
            },
          }
        : {
            skeleton:
              'skeleton.gltf',
            torso: 'primaris_torso.glb',
            backpack:
              parts.backpack[i] === 'backpack'
                ? 'primaris_backpack.glb'
                : 'primaris_techmarine_backpack.glb',
            backpackPos: {
              'primaris_techmarine_backpack.glb': [-1, -14, -4],
            },
            helmet: 'primaris_helmet.glb',
            armR:
              parts.armR[i] === 'boltgun'
                ? 'primaris_boltgun.glb'
                : 'primaris_flamer.glb',
            armRPos: {
              'primaris_boltgun.glb': [11, -8.6, 0],
              'primaris_flamer.glb': [11.2, -11.6, 0],
            },
            helmetPos: {
              'primaris_helmet.glb': [0, -9.6, -3.3],
            },
            base: 'base_medium.glb',
            ironCross:
              parts.ironCross[i] === 'lense'
                ? 'primaris_lense.glb'
                : parts.ironCross[i] === 'helmetSkull'
                ? 'primaris_helmet_skull.glb'
                : '',
            ironCrossPos: {
              'primaris_lense.glb': [0, -13.6, -3.3],
              'primaris_helmet_skull.glb': [0, -12.6, -3.3],
            },
          }
      );
    }

    return builtParts;
  }, [currentModel, parts, squadSize]);

  return (
    <ModelImport
      currentPaintRef={currentPaintRef}
      paintRef={paintRef}
      baseColor={baseColor}
      squadSize={squadSize}
      visibleSquadSize={visibleSquadSize}
      clone={clone}
      parts={partsObj}
      show={true}
      squadIndex={squadIndex}
      showEdges={showEdges}
      showPaintLabels={showPaintLabels}
      hoveredPaintLabelKey={hoveredPaintLabelKey}
      setHoveredPaintLabelKey={setHoveredPaintLabelKey}
      paintSyncTick={paintSyncTick}
      isSurfacePaintEnabled={isSurfacePaintEnabled}
      surfaceAngleThreshold={surfaceAngleThreshold}
      surfaceBrushRadius={surfaceBrushRadius}
      onPaintApplied={onPaintApplied}
      isPaintingEnabled={isPaintingEnabled}
      showSelectionRing={showSelectionRing}
    />
  );
}

export const Model = memo(ModelComponent);
