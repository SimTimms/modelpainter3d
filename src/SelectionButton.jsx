export default function SelectionButton(props) {
  const { onClickEvent, title, isActive, img } = props;
  return (
    <button
      style={{
        background: 'none',
        color: '#fff',
        opacity: isActive ? 1 : 0.5,
        border: 'none',
        userSelect: 'none',
        width: 160,
        cursor: 'pointer',
        textAlign: 'left',
      }}
      onClick={() => onClickEvent()}
    >
   {title && title}
    </button>
  );
}
