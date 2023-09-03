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
        width: 60,
        height: 60,
        cursor: 'pointer',
      }}
      onClick={() => onClickEvent()}
    >
      {img && <img src={img} style={{ width: '100%' }} />}
    </button>
  );
}
