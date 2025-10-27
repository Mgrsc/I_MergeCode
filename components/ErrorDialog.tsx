interface ErrorDialogProps {
  error: {
    error: string;
    code?: string;
    details?: string;
  } | null;
  onClose: () => void;
}

export default function ErrorDialog({ error, onClose }: ErrorDialogProps) {
  if (!error) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Error</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p>{error.error}</p>
          {error.code && (
            <div className="error-code">
              Code: {error.code}
            </div>
          )}
          {error.details && (
            <details style={{ marginTop: '12px' }}>
              <summary style={{ cursor: 'pointer', color: '#888' }}>Details</summary>
              <div className="error-code" style={{ marginTop: '8px' }}>
                {error.details}
              </div>
            </details>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
