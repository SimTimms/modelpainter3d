import {
  handFingeringOne,
  handFingeringTwo,
  handFingeringThree,
  handFingeringFour,
  titBounceOne,
  fingerSelf,
  titBounceTwo,
  titBounceThree,
  titBounceFour,
} from './poseData';
export function animation(diffs, toFrom, setToFrom) {
  if (diffs === false && toFrom.b_R_Hand === handFingeringOne.b_R_Hand) {
    setToFrom({
      ...toFrom,
      ...handFingeringTwo,
      ...titBounceOne,
      ...fingerSelf,
    });
  } else if (diffs === false && toFrom.b_R_Hand === handFingeringTwo.b_R_Hand) {
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
}
