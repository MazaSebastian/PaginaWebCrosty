import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({ 
  isVisible, 
  title, 
  message, 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar',
  onConfirm, 
  onCancel,
  type = 'warning'
}) => {
  if (!isVisible) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <div className="confirm-overlay" onClick={handleOverlayClick}>
      <div className="confirm-modal">
        <div className="confirm-header">
          <div className={`confirm-icon ${type}`}>
            <AlertTriangle size={24} />
          </div>
          <button 
            className="confirm-close"
            onClick={handleCancel}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="confirm-content">
          <h3 className="confirm-title">{title}</h3>
          <p className="confirm-message">{message}</p>
        </div>

        <div className="confirm-actions">
          <button 
            className="btn btn-outline confirm-cancel"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`btn confirm-confirm ${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>

      <style jsx>{`
        .confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 1rem;
        }

        .confirm-modal {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          max-width: 400px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .confirm-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.5rem 0 1.5rem;
        }

        .confirm-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .confirm-icon.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .confirm-icon.danger {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .confirm-icon.success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .confirm-close {
          background: none;
          border: none;
          color: var(--text-gray);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .confirm-close:hover {
          background: var(--light-gray);
          color: var(--dark-gray);
        }

        .confirm-content {
          padding: 1rem 1.5rem;
        }

        .confirm-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--dark-gray);
        }

        .confirm-message {
          margin: 0;
          color: var(--text-gray);
          line-height: 1.5;
        }

        .confirm-actions {
          display: flex;
          gap: 1rem;
          padding: 0 1.5rem 1.5rem 1.5rem;
        }

        .confirm-cancel {
          flex: 1;
          justify-content: center;
        }

        .confirm-confirm {
          flex: 1;
          justify-content: center;
        }

        .confirm-confirm.warning {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          border: none;
        }

        .confirm-confirm.danger {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
        }

        .confirm-confirm.success {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
        }

        .confirm-confirm:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 480px) {
          .confirm-overlay {
            padding: 0.5rem;
          }

          .confirm-actions {
            flex-direction: column;
          }

          .confirm-cancel,
          .confirm-confirm {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
