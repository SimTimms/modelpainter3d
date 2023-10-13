import React from 'react';
import { ModelImport } from './modelParts/Skeleton.jsx';

export function Model(props) {
  const {
    currentPaint,
    arm,
    armRRot,
    paintRef,
    torsoBone,
    neck,
    baseColor,
    torsoTopBone,
    currentModel,
    parts,
    squadSize,
    clone,
    pose,
  } = props;

  const partsObj = [];

  for (let i = 0; i < squadSize; i++) {
    partsObj.push(
      currentModel === 'termie'
        ? {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            cloak:
              parts.attachment[i] === 'cloak'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/terminator_cloak.gltf'
                : null,
            ironCross:
              parts.ironCross[i] === 'ironCross'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/iron-cross.gltf'
                : null,
            helmet:
              parts.head[i] === 'face'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/face_termie.gltf'
                : 'termie_helmet.glb',
            torso: 'termie_torso.glb',
            shoulderR:
              'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_right.gltf',
            shoulderL:
              'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_left.gltf',
            shieldL:
              parts.shield[i] === 'shield' ? 'termie_shield_left.glb' : null,
            shieldR:
              parts.shield[i] === 'shield' ? 'termie_shield_right.glb' : null,
            armR:
              parts.armR[i] === 'sword'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_two.gltf'
                : parts.armR[i] === 'auto'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_auto.gltf'
                : parts.armR[i] === 'flamer'
                ? 'https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_flamer.gltf'
                : 'https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right.gltf',
            armL: 'https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_left.gltf',
            legs: 'termie_leg.glb',
            base: 'base_medium.glb',
          }
        : currentModel === 'necron'
        ? {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
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
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            torso: 'gaunt.glb',
            torsoPos: {
              'gaunt.glb': [0, -37, 0],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'eldar'
        ? {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            torso: 'eldar.glb',
            torsoPos: {
              'eldar.glb': [-2, -6, 1],
            },
            base: 'base_small.glb',
          }
        : currentModel === 'ork'
        ? {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
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
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            torso: 'sister.glb',
            base: 'base_small.glb',
          }
        : currentModel === 'dread'
        ? {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            torso: 'dread.glb',
          }
        : {
            skeleton:
              'https://model-painter.s3.eu-west-2.amazonaws.com/skeleton.gltf',
            torso: 'primaris_torso.glb',
            base: 'base_medium.glb',
          }
    );
  }

  return (
    <ModelImport
      torsoBone={torsoBone}
      neck={neck}
      parts={partsObj}
      arm={arm}
      armRRot={armRRot}
      currentPaint={currentPaint}
      torsoTopBone={torsoTopBone}
      paintRef={paintRef}
      baseColor={baseColor}
      squadSize={squadSize}
      clone={clone}
      pose={pose[currentModel]}
    />
  );
}
