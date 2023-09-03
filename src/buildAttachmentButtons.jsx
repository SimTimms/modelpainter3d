import SelectionButton from './SelectionButton';

export function buildAttachmentButtons(
  modelAttachments,
  setModelAttachments,
  unitIndex,
  attachmentOptions
) {
  const attachmentArr = attachmentOptions;
  const buttonArr = [];

  for (let i = 0; i < attachmentArr.length; i++) {
    const thisAttach = attachmentArr[i];
    const isArray = Array.isArray(thisAttach.value);
    buttonArr.push(
      <SelectionButton
        onClickEvent={() => {
          const modelAttachmentsCopy = { ...modelAttachments };
          if (isArray) {
            modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] =
              modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] ===
              thisAttach.value[0]
                ? thisAttach.value[1]
                : thisAttach.value[0];
          } else {
            modelAttachmentsCopy[thisAttach.name][`${unitIndex}`] =
              thisAttach.value;
          }
          setModelAttachments(modelAttachmentsCopy);
        }}
        title={thisAttach.title}
        img={Array.isArray(thisAttach.img) ? thisAttach.img[0] : thisAttach.img}
        isActive={
          isArray
            ? thisAttach.value[0] ===
              modelAttachments[thisAttach.name][`${unitIndex}`]
              ? true
              : false
            : modelAttachments[thisAttach.name] &&
              modelAttachments[thisAttach.name][`${unitIndex}`] ===
                thisAttach.value
        }
      />
    );
  }
  return buttonArr;
}
