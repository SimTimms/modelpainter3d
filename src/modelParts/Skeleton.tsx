import { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { useGLTF, Clone } from '@react-three/drei';
import { ModelObject } from './ModelObject.jsx';
import {PaintType} from '../paints';

interface ModelImportProps {
  currentPaintRef: React.MutableRefObject<PaintType>;
  paintRef: any;
  show: boolean;
  squadIndex: number;
  baseColor: PaintType;
  clone: boolean;
  parts: any;
  squadSize: number;
  visibleSquadSize: number;
  showEdges: boolean;
  isPaintingEnabled: boolean;
  showSelectionRing: boolean;
}
function ModelImportComponent(props: ModelImportProps ) {
  const {
    currentPaintRef,
    paintRef,
    show,
    squadIndex,
    baseColor,
    clone,
    parts,
    squadSize,
    visibleSquadSize,
    showEdges,
    isPaintingEnabled,
    showSelectionRing,
  } = props;

  const [newNodeArr, setNewNodeArr] = useState(null);
  const { nodes } = useGLTF(parts[0].skeleton) as any;
  const activeVisibleSquadSize =
    typeof visibleSquadSize === 'number' ? visibleSquadSize : squadSize;

  function modelFactory(url) {
    return (
      <Suspense fallback={null}>
        <ModelObject
          currentPaintRef={currentPaintRef}
          paintRef={paintRef}
          show={show}
          squadIndex={squadIndex}
          url={url}
          baseColor={baseColor}
          clone={clone}
          showEdges={showEdges}
          isPaintingEnabled={isPaintingEnabled}
        />
      </Suspense>
    );
  }

  useEffect(() => {
    setNewNodeArr({
      armature: nodes.Armature.clone(),
      core: nodes.Core.clone(),
      upperArmL: nodes.UpperArmL.clone(),
      upperArmR: nodes.UpperArmR.clone(),
      bone008: nodes.Bone008.clone(),
      spine: nodes.Bone001.clone(),
    });
  }, [nodes]);

  const modelGroups = useMemo(() => {
    if (!newNodeArr) return null;

    const groups = [];
    for (let i = 0; i < squadSize; i++) {
      const positionX =
        i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
      const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 80 : -40;

      const torsoArr = Array.isArray(parts[i].torso)
        ? parts[i].torso[i]
        : parts[i].torso;
      groups.push(
          <group
            position={[positionX, 0, positionZ]}
            key={`model_${i}_`}
            visible={i < activeVisibleSquadSize}
          >
            <group >
              <group position={[1, -37, 0]} rotation={[0, 1.4 * Math.PI, 0]}>
                {parts[i].base && modelFactory(parts[i].base)}
              </group>

              <Clone
                object={newNodeArr.armature}
                rotation={[0, 0, 0]}
              >
                <Clone object={newNodeArr.core}>
                  <Clone
                    rotation={[
                      0,
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
                      position={
                        parts[i].armLPos && parts[i].armLPos[parts[i].armL]
                          ? parts[i].armLPos[parts[i].armL]
                          : [3, -3.2, -1]
                      }
                      rotation={[0, -0.5 * Math.PI, 0]}
                    >
                      {parts[i].armL && modelFactory(parts[i].armL)}
                    </group>
                  </Clone>
                  <Clone
                    rotation={[0, 0, 0]}
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
                    rotation={[0, 0, 0]}
                    position={
                      parts[i].helmetPos && parts[i].helmetPos[parts[i].helmet]
                        ? parts[i].helmetPos[parts[i].helmet]
                        : [0, -3.6, 0]
                    }
                  >
                    {parts[i].helmet && modelFactory(parts[i].helmet)}
                  </Clone>

                  <group
                    rotation={[0, 1 * Math.PI, 0]}
                    position={[0, -9, -9.0]}
                  >
                    {parts[i].cloak && modelFactory(parts[i].cloak)}
                  </group>
                  <group
                    rotation={[0, 0, 0]}
                    position={
                      parts[i].ironCrossPos &&
                      parts[i].ironCrossPos[parts[i].ironCross]
                        ? parts[i].ironCrossPos[parts[i].ironCross]
                        : [0, 7, -6.0]
                    }
                  >
                    {parts[i].ironCross && modelFactory(parts[i].ironCross)}
                  </group>
                  <group
                    position={
                      parts[i].torsoPos && parts[i].torsoPos[torsoArr]
                        ? parts[i].torsoPos[torsoArr]
                        : [0, -9.8, -4.0]
                    }
                  >
                    {torsoArr && modelFactory(torsoArr)}
                  </group>
                  <group
                    position={
                      parts[i].backpackPos &&
                      parts[i].backpackPos[parts[i].backpack]
                        ? parts[i].backpackPos[parts[i].backpack]
                        : [-0.8, -11, -3]
                    }
                  >
                    {parts[i].backpack && modelFactory(parts[i].backpack)}
                  </group>
                  <Clone  
                    rotation={[0, 0, 0]}
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
    }

    return groups;
  }, [
    squadSize,
    activeVisibleSquadSize,
    newNodeArr,
    baseColor,
    clone,
    showEdges,
    parts,
  ]);

  const selectionRing = useMemo(() => {
    if (!showSelectionRing || squadIndex >= activeVisibleSquadSize) return null;

    const positionX =
      squadIndex === 0
        ? 0
        : squadIndex === 1
        ? 40
        : squadIndex === 2
        ? -40
        : squadIndex === 3
        ? -80
        : 80;
    const positionZ = squadIndex === 0 ? 0 : squadIndex > 0 && squadIndex < 3 ? 80 : -40;

    return (
      <group position={[positionX, 0, positionZ]} key={`selection_ring_${squadIndex}`}>
        <mesh position={[0, -46, 0]} rotation={[-0.5 * Math.PI, 0, 0]}>
          <ringGeometry args={[20, 30, 30]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} toneMapped={false} />
        </mesh>
      </group>
    );
  }, [squadIndex, activeVisibleSquadSize, showSelectionRing]);

  if (!nodes) return null;
  return (
    <>
      {modelGroups}
      {selectionRing}
    </>
  );
}

export const ModelImport = memo(ModelImportComponent);
