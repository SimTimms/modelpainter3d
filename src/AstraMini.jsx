/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.3 public/skeleton.gltf
*/

import React from 'react';
import { ModelImport } from './modelParts/SkeletonAstra.jsx';
import { ModelObject } from './modelParts/ModelObject.jsx';
export function Astra(props) {
  const {
    currentPaint,
    armRRot,
    paintRef,
    show,
    squadIndex,
    baseColor,
    clone,
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
    <group scale={0.5}>
      <ModelImport
        torso={modelFactory('astra.glb')}
        armRRot={armRRot}
        currentPaint={props.currentPaint}
        torsoTopBone={props.torsoTopBone}
        paintRef={paintRef}
        baseColor={baseColor}
      />
    </group>
  );
}

var divs2 = document.getElementsByTagName('span');
for (var i = 0; i < divs2.length; i++) {
  if (divs2[i].innerHTML === 'ENDSCOREHERE') {
    const thisElement = divs2[i];
    thisElement.id = 'scoreId2';
    thisElement.innerHTML = this['newScore'];
  }
}
