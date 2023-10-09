import React, { useEffect, useState } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { ModelObject } from './ModelObject.jsx';

export function ModelImport(props) {
  const {
    currentPaint,
    paintRef,
    show,
    squadIndex,
    baseColor,
    clone,
    parts,
    squadSize,
    pose,
  } = props;
  const [newNodeArr, setNewNodeArr] = useState(null);
  const [squad, setSquad] = useState(null);
  const { nodes } = useGLTF(parts[0].skeleton);

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

  useEffect(() => {
    setNewNodeArr({
      armature: nodes.Armature.clone(),
      core: nodes.Core.clone(),
      upperArmL: nodes.UpperArmL.clone(),
      upperArmR: nodes.UpperArmR.clone(),
      bone008: nodes.Bone008.clone(),
      spine: nodes.Spine.clone(),
    });
  }, [nodes]);

  useEffect(() => {
    let squadArr = [];

    if (newNodeArr) {
      for (let i = 0; i < squadSize; i++) {
        const positionX =
          i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
        const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 80 : -40;
        squadArr.push(
          <group position={[positionX, 0, positionZ]} key={`model_${i}_`}>
            <group {...props} position={props.position}>
              <group position={[1, -37, 0]} rotation={[0, 1.4 * Math.PI, 0]}>
                {parts[i].base && modelFactory(parts[i].base)}
              </group>

              <Clone
                object={newNodeArr.armature}
                rotation={[0, props.pose ? props.pose[i].torsoTopBone : 0, 0]}
              >
                <Clone object={newNodeArr.core}>
                  <Clone
                    rotation={[
                      props.pose ? props.pose[i].arm : 0,
                      0.5 * Math.PI,
                      0,
                    ]}
                    position={[10, 1, -4]}
                    object={newNodeArr.upperArmL}
                  >
                    <group
                      rotation={[0 * Math.PI, 0 * Math.PI, -0.48]}
                      position={[1, 0, -2.3]}
                    >
                      {parts[i].shoulderL && modelFactory(parts[i].shoulderL)}
                      {parts[i].shieldL && modelFactory(parts[i].shieldL)}
                    </group>
                    <group
                      position={[0, -3.2, -2]}
                      rotation={[0, -0.5 * Math.PI, 0]}
                    >
                      {parts[i].armL && modelFactory(parts[i].armL)}
                    </group>
                  </Clone>
                  <Clone
                    rotation={[props.pose ? props.pose[i].armRRot : 0, 0, 0]}
                    position={[-11.4, -1, -4]}
                    object={newNodeArr.upperArmR}
                  >
                    <group
                      rotation={[0 * Math.PI, -0.5 * Math.PI, 0]}
                      position={[0, 0, 0]}
                    >
                      {parts[i].shoulderR && modelFactory(parts[i].shoulderR)}
                      {parts[i].shieldR && modelFactory(parts[i].shieldR)}
                    </group>
                    <group
                      position={
                        parts[i].armRPos && parts[i].armRPos[parts[i].armR]
                          ? parts[i].armRPos[parts[i].armR]
                          : [3, -3.2, -1]
                      }
                      rotation={[0 * Math.PI, 0 * Math.PI, 0 * Math.PI]}
                    >
                      {parts[i].armR && modelFactory(parts[i].armR)}
                    </group>
                  </Clone>
                  <Clone
                    object={newNodeArr.bone008}
                    rotation={[0, props.pose ? props.pose[i].neck : 0, 0]}
                    position={[0, -3.6, 0]}
                  >
                    {parts[i].helmet && modelFactory(parts[i].helmet)}
                  </Clone>

                  <group
                    rotation={[0, 1 * Math.PI, 0]}
                    position={[0, -9, -9.0]}
                  >
                    {parts[i].cloak && modelFactory(parts[i].cloak)}
                  </group>
                  <group rotation={[0, 0, 0]} position={[0, 7, -6.0]}>
                    {parts[i].ironCross && modelFactory(parts[i].ironCross)}
                  </group>
                  <group
                    position={
                      parts[i].torsoPos && parts[i].torsoPos[parts[i].torso]
                        ? parts[i].torsoPos[parts[i].torso]
                        : [0, -9.8, -4.0]
                    }
                  >
                    {parts[i].torso && modelFactory(parts[i].torso)}
                  </group>
                  <Clone
                    rotation={[0, props.pose ? props.pose[i].torsoBone : 0, 0]}
                    object={newNodeArr.spine}
                  >
                    <group scale={1.1} position={[-0.2, -6.5, 0.4]}>
                      {parts[i].legs && modelFactory(parts[i].legs)}
                    </group>
                  </Clone>
                </Clone>
              </Clone>
            </group>
          </group>
        );
        setSquad(squadArr);
      }
    }
  }, [squadSize, newNodeArr, currentPaint, clone, parts, paintRef, squadIndex]);

  if (!nodes) return null;
  return squad;
}
