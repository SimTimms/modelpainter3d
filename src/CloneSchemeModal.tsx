interface CloneSchemeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function CloneSchemeModal({
  isOpen,
  onCancel,
  onConfirm,
}: CloneSchemeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: '100%',
          background: '#1c1c1c',
          border: '1px solid #555',
          borderRadius: 8,
          padding: 16,
          color: '#fff',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
          Apply Clone Scheme?
        </div>
        <div style={{ fontSize: 12, color: '#ccc', marginBottom: 16 }}>
          This will replace the scheme on all models with the currently selected
          model scheme.
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              border: '1px solid #666',
              background: '#2a2a2a',
              color: '#fff',
              borderRadius: 4,
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              border: '1px solid #888',
              background: '#3a3a3a',
              color: '#fff',
              borderRadius: 4,
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            Apply to All
          </button>
        </div>
      </div>
    </div>
  );
}
