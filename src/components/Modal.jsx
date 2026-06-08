function Modal({
  isOpen,
  title,
  message,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>{title}</h2>

        {message && (
          <p>{message}</p>
        )}

        {children}

        <div className="modal-actions">
          <button
            className="primary-button"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}

export default Modal;