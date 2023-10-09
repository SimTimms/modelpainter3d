import { Model } from './Marine-mini';
import { Necron } from './Necron-mini';
import { Sister } from './SisterMini';
import { Gaunt } from './GauntMini';
import { Primaris } from './PrimarisMini';
export function BuildSquad(props) {
  const {
    squadSize,
    currentModel,
    neck,
    torsoBone,
    torsoTopBone,
    paintRef,
    currentPaint,
    armRRot,
    arm,
    modelAttachments,
    baseColor,
    clone,
  } = props;
  const squadArr = [];
  for (let i = 0; i < squadSize; i++) {
    const positionX =
      i === 0 ? 0 : i === 1 ? 40 : i === 2 ? -40 : i === 3 ? -80 : 80;
    const positionZ = i === 0 ? 0 : i > 0 && i < 3 ? 80 : -40;
    squadArr.push(
      <group
        position={[positionX, 0, positionZ]}
        key={`model_${i}_${currentModel}`}
      >
        <Necron
          neck={neck}
          torsoBone={torsoBone}
          torsoTopBone={torsoTopBone}
          paintRef={paintRef}
          currentPaint={currentPaint}
          armRRot={armRRot}
          armR={modelAttachments.armR[`${i}`]}
          show={currentModel === 'necron'}
          squadIndex={i}
          baseColor={baseColor}
          clone={clone}
        />
        <Sister
          neck={neck}
          torsoBone={torsoBone}
          torsoTopBone={torsoTopBone}
          paintRef={paintRef}
          currentPaint={currentPaint}
          armRRot={armRRot}
          armR={modelAttachments.armR[`${i}`]}
          show={currentModel === 'sister'}
          squadIndex={i}
          baseColor={baseColor}
          clone={clone}
        />
        <Gaunt
          neck={neck}
          torsoBone={torsoBone}
          torsoTopBone={torsoTopBone}
          paintRef={paintRef}
          currentPaint={currentPaint}
          armRRot={armRRot}
          armR={modelAttachments.armR[`${i}`]}
          show={currentModel === 'gaunt'}
          squadIndex={i}
          baseColor={baseColor}
          clone={clone}
        />
        <Primaris
          neck={neck}
          torsoBone={torsoBone}
          torsoTopBone={torsoTopBone}
          paintRef={paintRef}
          currentPaint={currentPaint}
          armRRot={armRRot}
          armR={modelAttachments.armR[`${i}`]}
          squadIndex={i}
          baseColor={baseColor}
          clone={clone}
          show={currentModel === 'primaris'}
        />
        <Model
          neck={neck}
          torsoBone={torsoBone}
          torsoTopBone={torsoTopBone}
          currentPaint={currentPaint}
          armRRot={armRRot}
          arm={arm}
          armR={modelAttachments.armR[`${i}`]}
          attachment={modelAttachments.attachment[`${i}`]}
          head={modelAttachments.head[`${i}`]}
          ironCross={modelAttachments.ironCross[`${i}`]}
          shield={modelAttachments.shield[`${i}`]}
          paintRef={paintRef}
          show={currentModel === 'termie'}
          squadIndex={i}
          baseColor={baseColor}
          clone={clone}
        />
      </group>
    );
  }
  return squadArr;
}
