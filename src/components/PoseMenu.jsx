import React from 'react';
import { PoseButton } from './PoseButton';
import pose1 from '../pose1.png';
import pose2 from '../pose2.png';
import pose3 from '../pose3.png';
import pose4 from '../pose4.png';
import pose5 from '../pose5.png';
import { colors, skinTone } from '../colors';
import { ColorPicker } from './ColorPicker';

import {
  standPos,
  standPos2,
  standPos3,
  kneelPos,
  stressPos,
  handFingeringTwo,
  fingerSelf,
  handFingeringThree,
  titBounceThree,
  sidePos,
  titBounceFive,
  handFingeringFive,
  backPos,
} from '../poseData';

export const PoseMenu = ({
  setToFrom,
  skin,
  setSkin,
  hair,
  setHair,
  suit,
  setSuit,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        margin: 'auto',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PoseButton
        pose={pose1}
        onClickEvent={() =>
          setToFrom({
            ...standPos,
          })
        }
      />
      <PoseButton
        pose={pose3}
        onClickEvent={() =>
          setToFrom({
            ...standPos2,
            ...handFingeringTwo,
            ...fingerSelf,
          })
        }
      />
      <PoseButton
        pose={pose2}
        onClickEvent={() =>
          setToFrom({
            ...standPos3,
            ...fingerSelf,
            ...handFingeringThree,
            ...titBounceThree,
          })
        }
      />
      <PoseButton
        pose={pose2}
        onClickEvent={() =>
          setToFrom({
            ...sidePos,
            ...fingerSelf,
            ...handFingeringFive,
            ...titBounceFive,
          })
        }
      />
      <PoseButton
        pose={pose2}
        onClickEvent={() =>
          setToFrom({
            ...backPos,
            ...fingerSelf,
            ...handFingeringFive,
            ...titBounceFive,
          })
        }
      />
      <PoseButton pose={pose4} onClickEvent={() => setToFrom(kneelPos)} />
      <PoseButton pose={pose5} onClickEvent={() => setToFrom(stressPos)} />
      <ColorPicker
        skin={skin}
        setSkin={setSkin}
        title="Skin"
        colors={skinTone}
      />
      <ColorPicker
        skin={hair}
        setSkin={setHair}
        title="Hair"
        colors={[...skinTone, ...colors]}
      />
      <ColorPicker
        skin={suit}
        setSkin={setSuit}
        title="Cloth"
        colors={[...skinTone, ...colors]}
      />
    </div>
  );
};
