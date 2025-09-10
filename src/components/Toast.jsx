import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export const Toast = ({ message, isVisible, onClose, type = 'success' }) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    
    if (isVisible) {
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  if (!show) return null;

  return (
    <div className="toast-overlay">
      <div className={`toast ${type} ${show ? 'show' : ''}`}>
        <div className="toast-content">
          <div className="toast-icon">
            <CheckCircle size={24} />
          </div>
          <div className="toast-message">
            <h4>¡Producto agregado!</h4>
            <p>{message}</p>
          </div>
          <button 
            className="toast-close"
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="toast-progress"></div>
      </div>

      <style jsx>{`
        .toast-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 2rem;
        }

        .toast {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border: 1px solid #e5e7eb;
          max-width: 400px;
          width: 90%;
          pointer-events: auto;
          transform: translateY(-100px);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .toast.show {
          transform: translateY(0);
          opacity: 1;
        }

        .toast.success {
          border-left: 4px solid #22c55e;
        }

        .toast-content {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          gap: 1rem;
        }

        .toast-icon {
          color: #22c55e;
          flex-shrink: 0;
        }

        .toast-message {
          flex: 1;
        }

        .toast-message h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--dark-gray);
        }

        .toast-message p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--text-gray);
          line-height: 1.4;
        }

        .toast-close {
          background: none;
          border: none;
          color: var(--text-gray);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .toast-close:hover {
          background: var(--light-gray);
          color: var(--dark-gray);
        }

        .toast-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #22c55e, #16a34a);
          width: 100%;
          transform-origin: left;
          animation: progress 3s linear forwards;
        }

        @keyframes progress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }

        @media (max-width: 480px) {
          .toast-overlay {
            padding: 1rem;
          }

          .toast {
            width: 100%;
            max-width: none;
          }

          .toast-content {
            padding: 1rem;
          }

          .toast-message h4 {
            font-size: 0.9rem;
          }

          .toast-message p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};
