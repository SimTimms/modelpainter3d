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
        fontSize: 10,
        padding: '4px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onClick={() => onClickEvent()}
    >
      <span>{title && title}</span>
      <span
        style={{
          width: 12,
          height: 12,
          border: '1px solid #888',
          borderRadius: 2,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 9,
          color: '#fff',
          background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
        }}
      >
        {isActive ? '✓' : ''}
      </span>
    </button>
  );
}
