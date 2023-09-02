/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/skeleton.gltf
*/

import React from 'react';
import { ModelImport } from './modelParts/Skeleton.jsx';
import { ModelObject } from './modelParts/ModelObject.jsx';

export function Model(props) {
  const {
    currentPaint,
    armR,
    arm,
    armRRot,
    attachment,
    head,
    ironCross,
    paintRef,
    show,
    squadIndex,
    baseColor,
    clone,
    shield,
  } = props;

  function modelFactory(url) {
    return (
      <ModelObject
        currentPaint={currentPaint}
        paintRef={paintRef}
        show={show ? 1 : 0}
        squadIndex={squadIndex}
        url={url}
        baseColor={baseColor}
        clone={clone}
      />
    );
  }

  return (
    <group>
      <ModelImport
        torsoBone={props.torsoBone}
        neck={props.neck}
        cloak={
          attachment === 'cloak'
            ? modelFactory(
                'https://model-painter.s3.eu-west-2.amazonaws.com/terminator_cloak.gltf'
              )
            : null
        }
        ironCross={
          ironCross === 'ironCross'
            ? modelFactory(
                'https://model-painter.s3.eu-west-2.amazonaws.com/iron-cross.gltf'
              )
            : null
        }
        helmet={
          head === 'face'
            ? modelFactory(
                'https://model-painter.s3.eu-west-2.amazonaws.com/face_termie.gltf'
              )
            : modelFactory('termie_helmet.glb')
        }
        torso={modelFactory('termie_torso.glb')}
        shoulderR={modelFactory(
          'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_right.gltf'
        )}
        shoulderL={modelFactory(
          'https://model-painter.s3.eu-west-2.amazonaws.com/shoulder_termie_left.gltf'
        )}
        shieldL={shield === 'shield' && modelFactory('termie_shield_left.glb')}
        shieldR={shield === 'shield' && modelFactory('termie_shield_right.glb')}
        armR={
          armR === 'sword' ? (
            <ModelObject
              currentPaint={currentPaint}
              paintRef={paintRef}
              show={show ? 1 : 0}
              squadIndex={squadIndex}
              url="https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_two.gltf"
              baseColor={baseColor}
              clone={clone}
            />
          ) : armR === 'auto' ? (
            <ModelObject
              currentPaint={currentPaint}
              paintRef={paintRef}
              show={show ? 1 : 0}
              squadIndex={squadIndex}
              url="https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_auto.gltf"
              baseColor={baseColor}
              clone={clone}
            />
          ) : armR === 'flamer' ? (
            <ModelObject
              currentPaint={currentPaint}
              paintRef={paintRef}
              show={show ? 1 : 0}
              squadIndex={squadIndex}
              url="https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right_flamer.gltf"
              baseColor={baseColor}
              clone={clone}
            />
          ) : (
            <ModelObject
              currentPaint={currentPaint}
              paintRef={paintRef}
              show={show ? 1 : 0}
              squadIndex={squadIndex}
              url="https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_right.gltf"
              baseColor={baseColor}
              clone={clone}
            />
          )
        }
        armL={
          <ModelObject
            currentPaint={currentPaint}
            paintRef={paintRef}
            show={show ? 1 : 0}
            squadIndex={squadIndex}
            url="https://model-painter.s3.eu-west-2.amazonaws.com/arm_termie_left.gltf"
            baseColor={baseColor}
            clone={clone}
          />
        }
        arm={arm}
        armRRot={armRRot}
        legs={
          <ModelObject
            currentPaint={currentPaint}
            paintRef={paintRef}
            show={show ? 1 : 0}
            squadIndex={squadIndex}
            url="termie_leg.glb"
            baseColor={baseColor}
            clone={clone}
          />
        }
        base={
          <ModelObject
            currentPaint={currentPaint}
            paintRef={paintRef}
            show={show ? 1 : 0}
            squadIndex={squadIndex}
            url="https://model-painter.s3.eu-west-2.amazonaws.com/base_termie_left.gltf"
            baseColor={baseColor}
            clone={clone}
          />
        }
        currentPaint={props.currentPaint}
        torsoTopBone={props.torsoTopBone}
        paintRef={paintRef}
        baseColor={baseColor}
      />
    </group>
  );
}
