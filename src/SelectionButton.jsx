export default function SelectionButton(props) {
  const { onClickEvent, title, isActive, unitIndex } = props;
  return (
    <button
      style={{
        background: 'none',
        color: '#fff',
        opacity: isActive ? 1 : 0.5,
        border: 'none',
        userSelect: 'none',
      }}
      onClick={() => onClickEvent()}
    >
      {title}
    </button>
  );
}
