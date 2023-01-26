import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Model } from './Marine-mini';
import { Dild } from './Dild';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Euler } from 'three';
import pose1 from './pose1.png';
import pose2 from './pose2.png';
import pose3 from './pose3.png';
import pose4 from './pose4.png';
import pose5 from './pose5.png';
import { TwitterPicker } from 'react-color';

const colors = [
  '#F44336',
  '#FF4081',
  '#9C27B0',
  '#F3E5F5',
  '#311B92',
  '#B388FF',
  '#E8EAF6',
  '#C5CAE9',
  '#3949AB',
  '#536DFE',
  '#64B5F6',
  '#448AFF',
  '#039BE5',
  '#0288D1',
  '#0277BD',
  '#0091EA',
  '#00BCD4',
  '#E0F7FA',
  '#B2EBF2',
  '#84FFFF',
  '#18FFFF',
  '#00E5FF',
  '#26A69A',
  '#009688',
  '#00897B',
  '#00796B',
  '#00695C',
  '#004D40',
  '#A7FFEB',
  '#00E676',
  '#00C853',
  '#8BC34A',
  '#F1F8E9',
  '#558B2F',
  '#33691E',
  '#AFB42B',
  '#9E9D24',
  '#827717',
  '#F4FF81',
  '#EEFF41',
  '#C6FF00',
  '#AEEA00',
  '#FFEB3B',
  '#FFFDE7',
  '#FFF9C4',
  '#FFF59D',
  '#FFF176',
  '#FFEE58',
  '#FFEB3B',
  '#FDD835',
  '#FBC02D',
  '#F9A825',
  '#F57F17',
  '#FFFF8D',
  '#FFFF00',
  '#FFEA00',
  '#FFD600',
  '#FFC107',
  '#FFF8E1',
  '#FFECB3',
  '#FFE082',
  '#FFD54F',
  '#FFCA28',
  '#FFC107',
  '#FFB300',
  '#FFA000',
  '#FF8F00',
  '#FF6F00',
  '#FFE57F',
  '#FFD740',
  '#FFC400',
  '#FFAB00',
  '#FF9800',
  '#FFF3E0',
  '#FFE0B2',
  '#FFCC80',
  '#FFB74D',
  '#FFA726',
  '#FF9800',
  '#FB8C00',
  '#F57C00',
  '#EF6C00',
  '#E65100',
  '#FFD180',
  '#FFAB40',
  '#FF9100',
  '#FF6D00',
  '#FF5722',
  '#FBE9E7',
  '#FFCCBC',
  '#FFAB91',
  '#FF8A65',
  '#FF7043',
  '#FF5722',
  '#F4511E',
  '#E64A19',
  '#D84315',
  '#BF360C',
  '#FF9E80',
  '#FF6E40',
  '#FF3D00',
  '#DD2C00',
  '#795548',
  '#EFEBE9',
  '#D7CCC8',
  '#BCAAA4',
  '#A1887F',
  '#8D6E63',
  '#795548',
  '#6D4C41',
  '#5D4037',
  '#4E342E',
  '#3E2723',
  '#9E9E9E',
  '#FAFAFA',
  '#F5F5F5',
  '#EEEEEE',
  '#E0E0E0',
  '#BDBDBD',
  '#9E9E9E',
  '#757575',
  '#616161',
  '#424242',
  '#212121',
  '#607D8B',
  '#ECEFF1',
  '#CFD8DC',
  '#B0BEC5',
  '#90A4AE',
  '#78909C',
  '#607D8B',
  '#546E7A',
  '#455A64',
  '#37474F',
  '#263238',
  '#000000',
  '#FFFFFF',
];
const fingerSelf = {
  h_R_Pinky1: [0, -0.3, 0],
  h_R_Pinky2: [0, 0, 0],
  h_R_Pinky3: [0.2, 0, 2.8],
  h_R_Pinky4: [0.2, 0, 0],
  h_R_Ring1: [0, -0.1, 0],
  h_R_Ring2: [0, 0, 0],
  h_R_Ring3: [0.2, 0, 2.8],
  h_R_Ring4: [0.2, 0, 0],
  h_R_Middle1: [0, 0, 0],
  h_R_Middle2: [0.8, 0, 0],
  h_R_Middle3: [0, 0.9, 0.8],
  h_R_Middle4: [0, 0, 0],
  h_R_Index1: [0.8, 0, 0],
  h_R_Index2: [0, 0, 0],
  h_R_Index3: [0.2, 0.9, 0.8],
  h_R_Index4: [0, 0, 0],
  h_R_Thumb1: [0, 0, 0],
  h_R_Thumb2: [0, 0, 0],
  h_R_Thumb3: [0, 0, 0],
};

const handFingeringOne = {
  b_R_Hand: [0, -0.3, 0.5],
  b_R_Shoulder: [0, 0, -0.1],
};
const handFingeringTwo = {
  b_R_Hand: [0.2, -0.3, 0.6],
  b_R_Shoulder: [0, 0.2, -0.1],
};

const handFingeringThree = {
  b_R_Hand: [0.7, -0.3, 0.5],
  b_R_Shoulder: [-2, 0.4, -0.15],
};
const handFingeringFour = {
  b_R_Hand: [0.7, -0.3, 0.6],
  b_R_Shoulder: [-2.2, 0.4, -0.15],
};

const titBounceOne = {
  pb_R_SMS01_Breast_01: [0.8, -2, 0.4],
  pb_L_SMS01_Breast_01: [0.8, -1, 0.4],
};
const titBounceTwo = {
  pb_R_SMS01_Breast_01: [0.6, -2, 0.4],
  pb_L_SMS01_Breast_01: [0.7, -1, 0.4],
};

const titBounceThree = {
  pb_R_SMS01_Breast_01: [-0.2, -2, 0.4],
  pb_L_SMS01_Breast_01: [-0.1, -1, 0.4],
};
const titBounceFour = {
  pb_R_SMS01_Breast_01: [-0.4, -2, 0.4],
  pb_L_SMS01_Breast_01: [-0.3, -1, 0.4],
};

const startPos = {
  b_C_Spine1: [0, 0, 0],
  b_C_Spine2: [0, 0, 0],
  b_R_Shoulder: [0, 0, 0],
  b_R_Arm1: [0, 0, 0],
  b_R_Arm2: [0, 0, 0],
  b_R_Hand: [0, 0, 0],
  b_L_Shoulder: [0, 0, 0],
  b_L_Arm1: [0, 0, 0],
  b_L_Arm2: [0, 0, 0],
  b_L_Hand: [0, 0, 0],
  b_R_Leg1: [0, 0, 0],
  b_R_Leg2: [0, 0, 0],
  b_L_Leg2: [0, 0, 0],
  b_L_Leg1: [0, 0, 0],
  b_L_Foot: [0, 0, 0],
  b_R_Foot: [0, 0, 0],
  b_C_Chest: [0, 0, 0],
  b_C_Neck: [0, 0, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [0, 0, 1.6],
  pb_R_SMS01_Breast_01: [0.8, -2, 0.4],
  pb_L_SMS01_Breast_01: [0.8, -1, 0.4],
};

const kneelPos = {
  b_C_Spine1: [1, 0, 0],
  b_C_Spine2: [0, 0, 0],
  b_R_Shoulder: [-1.4, 0, 0],
  b_R_Arm1: [0, 0, 1],
  b_R_Arm2: [1, 0.4, 0],
  b_R_Hand: [0, 0, -1],
  b_L_Shoulder: [-1.4, 0, 0],
  b_L_Arm1: [0, 0, -1],
  b_L_Arm2: [1, -0.4, 0],
  b_L_Hand: [0, 0, 1],
  b_R_Leg1: [-0.6, 0, -1],
  b_R_Leg2: [2.1, 0, -0.2],
  b_L_Leg1: [0, 0, 1],
  b_L_Leg2: [1.6, 0, 0],
  b_L_Foot: [1, 0, 0],
  b_R_Foot: [1, 0, 0],
  b_C_Chest: [0.4, 0, 0],
  b_C_Neck: [0, 0, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [-1.8, 1, 2.2],
  pb_R_SMS01_Breast_01: [0, -2, 0.2],
  pb_L_SMS01_Breast_01: [0, -1, 0.2],
};

const stressPos = {
  b_C_Spine1: [1.4, 0, 0],
  b_C_Spine2: [0.3, 0, 0],
  b_R_Shoulder: [-1.4, 0, 0],
  b_R_Arm1: [-1.8, 0, 1],
  b_R_Arm2: [1, 0.4, 0],
  b_R_Hand: [0, 0, 0],
  b_L_Shoulder: [-1.4, 0, 0],
  b_L_Arm1: [-1.8, 0, -1],
  b_L_Arm2: [1, -0.4, 0],
  b_L_Hand: [0, 0, 0],
  b_R_Leg1: [-0.2, -0.4, -1.5],
  b_R_Leg2: [0.4, 0, -0.2],
  b_L_Leg1: [0, 0, 1.5],
  b_L_Leg2: [0.4, 0, 0],
  b_L_Foot: [1, 0, 0],
  b_R_Foot: [1, 0, 0],
  b_C_Chest: [0.4, 0, 0],
  b_C_Neck: [-0.2, 1, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [-1.8, 1, 2.2],
  pb_R_SMS01_Breast_01: [0, -2.3, 0],
  pb_L_SMS01_Breast_01: [0, -0.7, 0],
};

const standPos = {
  b_C_Spine1: [0, 0, 0],
  b_C_Spine2: [0, 0, 0],
  b_R_Shoulder: [0, 0, 0],
  b_R_Arm1: [0, 0, 0],
  b_R_Arm2: [0, 0, 0],
  b_R_Hand: [0, 0, 0],
  b_L_Shoulder: [0, 0, 0],
  b_L_Arm1: [0, 0, 0],
  b_L_Arm2: [0, 0, 0],
  b_L_Hand: [0, 0, 0],
  b_R_Leg1: [0, 0, 0],
  b_R_Leg2: [0, 0, 0],
  b_L_Leg2: [0, 0, 0],
  b_L_Leg1: [0, 0, 0],
  b_L_Foot: [0, 0, 0],
  b_R_Foot: [0, 0, 0],
  b_C_Chest: [0, 0, 0],
  b_C_Neck: [0, 0, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [0, 0, 1.6],
  pb_R_SMS01_Breast_01: [0.8, -2, 0.4],
  pb_L_SMS01_Breast_01: [0.8, -1, 0.4],
  ...fingerSelf,
};

const standPos2 = {
  b_C_Spine1: [0, 0, 0],
  b_C_Spine2: [0, 0, 0],
  b_R_Shoulder: [0, 0, 0],
  b_R_Arm1: [0, 0, 1.3],
  b_R_Arm2: [1.1, 1.3, 0],
  b_R_Hand: [0, 0.2, 1],
  b_L_Hand: [0, 0.2, 1],
  b_L_Shoulder: [0, 0, 0],
  b_L_Arm1: [0, 0, -1.4],
  b_L_Arm2: [0, 0, 0],
  b_R_Leg1: [0, 0, 0],
  b_R_Leg2: [0, 0, 0],
  b_L_Leg2: [0, 0, 0],
  b_L_Leg1: [0, 0, 0],
  b_L_Foot: [0, 0, 0],
  b_R_Foot: [0, 0, 0],
  b_C_Chest: [0, 0, 0],
  b_C_Neck: [0, 0, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [0, 0, 1.6],
  pb_R_SMS01_Breast_01: [0.8, -2, 0.4],
  pb_L_SMS01_Breast_01: [0.8, -1, 0.4],
  ...fingerSelf,
};
const standPos3 = {
  b_C_Spine1: [1, 0, 0],
  b_C_Spine2: [0, 0, 0],
  b_R_Shoulder: [-1.4, 0, 0],
  b_R_Arm1: [1.5, -1, 1.2],
  b_R_Arm2: [1, 2.6, 1],
  b_R_Hand: [0, 0, -1],
  b_L_Shoulder: [-1.4, 0, 0],
  b_L_Arm1: [0, 0, -1],
  b_L_Arm2: [1, -0.4, 0],
  b_L_Hand: [0, 0, 1],
  b_R_Leg1: [-0.6, 0, -0.3],
  b_R_Leg2: [2.1, 0, -0.2],
  b_L_Leg2: [1.6, 0, 0],
  b_L_Leg1: [0, 0, 0.3],
  b_L_Foot: [1, 0, 0],
  b_R_Foot: [1, 0, 0],
  b_C_Chest: [0.4, 0, 0],
  b_C_Neck: [-1.6, 0, 0],
  b_C_Head: [0, 0, 0],
  pb_L_SMS01_BHair_1: [-1.2, 0.8, 3.2],
  pb_R_SMS01_Breast_01: [0.4, -2, 0.4],
  pb_L_SMS01_Breast_01: [0, -1, 0.4],
  ...fingerSelf,
};

const CameraController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 0.1;
    controls.maxDistance = 100;
    controls.zoomSpeed = 0.5;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default function ThreeD({}) {
  const canvas = useRef(null);
  const bones = ['pb_R_YA201_Breast_01', 'pb_R_YA201_Breast_01', 'b_R_Leg1'];
  const [boneConfig, setBoneConfig] = React.useState({
    pb_R_YA201_Breast_01: { rotation: [0.15, 0, 0], scale: 1 },
    pb_L_YA201_Breast_01: { rotation: [0.15, 0, 0], scale: 1 },
    b_R_Leg1: { rotation: [0.15, 0, 0], scale: 1 },
  });
  const [activeBone, setActiveBone] = React.useState(bones[0]);
  const [skin, setSkin] = React.useState('#fff');
  const [showSkin, setShowSkin] = React.useState(false);
  const [showHair, setShowHair] = React.useState(false);
  const [showSuit, setShowSuit] = React.useState(false);
  const [hair, setHair] = React.useState('#fff');
  const [suit, setSuit] = React.useState('#fff');
  const [tits, setTits] = React.useState(1);
  const [ass, setAss] = React.useState(1);
  const [toFrom, setToFrom] = React.useState({
    ...standPos,
  });
  const [posMap, setPosMap] = React.useState({
    ...standPos,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const keys = Object.keys(standPos).map((key) => key);

      const newPos = { ...posMap };
      let diffs = false;
      for (let i = 0; i < keys.length; i++) {
        const rotFrom = newPos[keys[i]];
        const rotTo = toFrom[keys[i]];
        const isEuler = rotFrom.isEuler;

        let diffX = 0;
        let diffY = 0;
        let diffZ = 0;

        let rotFromPar = [];
        if (isEuler) {
          rotFromPar = [rotFrom.x, rotFrom.y, rotFrom.z];
          diffX = rotFromPar[0] - rotTo[0];
          diffY = rotFromPar[1] - rotTo[1];
          diffZ = rotFromPar[2] - rotTo[2];

          if (diffX.toFixed(2) > 0) {
            newPos[keys[i]]._x -= 0.01;
            diffs = true;
          }
          if (diffX.toFixed(2) < 0) {
            newPos[keys[i]]._x += 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) > 0) {
            newPos[keys[i]]._y -= 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) < 0) {
            newPos[keys[i]]._y += 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) > 0) {
            newPos[keys[i]]._z -= 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) < 0) {
            newPos[keys[i]]._z += 0.01;
            diffs = true;
          }

          const newEuler = new Euler(
            newPos[keys[i]]._x,
            newPos[keys[i]]._y,
            newPos[keys[i]]._z
          );
          newPos[keys[i]] = newEuler;
        } else {
          rotFromPar = [rotFrom[0], rotFrom[1], rotFrom[2]];
          diffX = rotFromPar[0] - rotTo[0];
          diffY = rotFromPar[1] - rotTo[1];
          diffZ = rotFromPar[2] - rotTo[2];

          if (diffX.toFixed(2) > 0) {
            newPos[keys[i]][0] -= 0.01;
            diffs = true;
          }
          if (diffX.toFixed(2) < 0) {
            newPos[keys[i]][0] += 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) > 0) {
            newPos[keys[i]][1] -= 0.01;
            diffs = true;
          }
          if (diffY.toFixed(2) < 0) {
            newPos[keys[i]][1] += 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) > 0) {
            newPos[keys[i]][2] -= 0.01;
            diffs = true;
          }
          if (diffZ.toFixed(2) < 0) {
            newPos[keys[i]][2] += 0.01;
            diffs = true;
          }

          const newEuler = new Euler(
            newPos[keys[i]][0],
            newPos[keys[i]][1],
            newPos[keys[i]][2]
          );
          newPos[keys[i]] = newEuler;
        }

        setPosMap(newPos);
      }

      if (diffs === false && toFrom.b_R_Hand === handFingeringOne.b_R_Hand) {
        setToFrom({
          ...toFrom,
          ...handFingeringTwo,
          ...titBounceOne,
          ...fingerSelf,
        });
      } else if (
        diffs === false &&
        toFrom.b_R_Hand === handFingeringTwo.b_R_Hand
      ) {
        setToFrom({
          ...toFrom,
          ...handFingeringOne,
          ...titBounceTwo,
          ...fingerSelf,
        });
      }

      if (diffs === false && toFrom.b_R_Hand === handFingeringThree.b_R_Hand) {
        setToFrom({
          ...toFrom,
          ...fingerSelf,
          ...handFingeringFour,
          ...titBounceThree,
        });
      } else if (
        diffs === false &&
        toFrom.b_R_Hand === handFingeringFour.b_R_Hand
      ) {
        setToFrom({
          ...toFrom,
          ...fingerSelf,
          ...handFingeringThree,
          ...titBounceFour,
        });
      }
    }, 10);
    return () => clearInterval(interval);
  }, [toFrom]);
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        margin: 'auto',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={pose1}
          onClick={() =>
            setToFrom({
              ...standPos,
            })
          }
          style={{ v: 64, opacity: 0.5 }}
        />
        <img
          src={pose3}
          onClick={() =>
            setToFrom({
              ...standPos2,
              ...handFingeringTwo,
              ...fingerSelf,
            })
          }
          style={{ height: 64, opacity: 0.5 }}
        />
        <img
          src={pose2}
          onClick={() =>
            setToFrom({
              ...standPos3,
              ...fingerSelf,
              ...handFingeringThree,
              ...titBounceThree,
            })
          }
          style={{ height: 64, opacity: 0.5 }}
        />
        <img
          src={pose4}
          onClick={() => setToFrom(kneelPos)}
          style={{ v: 64, opacity: 0.5 }}
        />
        <img
          src={pose5}
          onClick={() => setToFrom(stressPos)}
          style={{ v: 64, opacity: 0.5 }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => setShowSkin(showSkin ? false : true)}>
          Skin Color
        </button>
        {showSkin && (
          <TwitterPicker
            color={skin}
            onChange={(color, e) => setSkin(color.hex)}
            triangle="hide"
            colors={[
              '#fff4e6',
              '#ffedd5',
              '#ffdeb4',
              '#ffdbac',
              '#f1c27d',
              '#e0ac69',
              '#c68642',
              '#8d5524',
              '#7e4c20',
              '#70441c',
              '#623b19',
              '#543315',
              '#462a12',
              '#38220e',
              '#2a190a',
              '#1c1107',
            ]}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => setShowHair(showHair ? false : true)}>
          Hair Color
        </button>
        {showHair && (
          <TwitterPicker
            color={hair}
            onChange={(color, e) => setHair(color.hex)}
            triangle="hide"
            colors={colors}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => setShowSuit(showSuit ? false : true)}>
          Clothes Color
        </button>
        {showSuit && (
          <TwitterPicker
            color={suit}
            onChange={(color, e) => setSuit(color.hex)}
            triangle="hide"
            colors={colors}
          />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          width: '50%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Tits:
        <input value={tits} onChange={(e) => setTits(e.target.value)} />
      </div>
      <div
        style={{
          display: 'flex',
          width: '50%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Ass: <input value={ass} onChange={(e) => setAss(e.target.value)} />
      </div>
      <div
        style={{
          display: 'flex',
          width: '50%',
          margin: 'auto',
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        Dildo:
        <Slider
          min={0.15}
          max={6.4}
          value={boneConfig['b_R_Leg1'].rotation[0]}
          step={0.01}
          onChange={(value) =>
            setBoneConfig({
              ...boneConfig,
              ['b_R_Leg1']: {
                ...boneConfig['b_R_Leg1'],
                rotation: [value, 0, 0],
              },
            })
          }
          style={{ margin: 10, width: 200, boxSizing: 'border-box' }}
        />
      </div>

      <Canvas
        ref={canvas}
        style={{
          width: '100vw',
          height: '100vh',
        }}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 50, position: [0, 1, 3], near: 0.001, zoom: 2 }}
      >
        <CameraController />
        <group position={[0, 20, 5.5]}>
          <ambientLight intensity={0.2} />
        </group>
        <group position={[2, 10, 5]}>
          <spotLight
            castShadow={true}
            intensity={2}
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-focus={1}
          />
          <spotLight
            castShadow={true}
            intensity={1}
            color="blue"
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
            shadow-camera-near={0.5}
            shadow-camera-far={500}
            shadow-focus={1}
          />
        </group>

        <Suspense fallback={null}>
          <group>
            <Model
              boneConfig={boneConfig}
              kneelPos={posMap}
              skin={skin}
              hair={hair}
              tits={tits}
              ass={ass}
              suit={suit}
            />
            <Dild boneConfig={boneConfig} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
