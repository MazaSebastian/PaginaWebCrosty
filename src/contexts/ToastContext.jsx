import { createContext, useContext, useState } from 'react';
import { Toast } from '../components/Toast';
import { ConfirmModal } from '../components/ConfirmModal';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    isVisible: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    type: 'warning',
    onConfirm: null,
    onCancel: null
  });

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    const newToast = { id, message, type, isVisible: true };
    
    setToasts(prev => [...prev, newToast]);
    
    return id;
  };

  const hideToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message) => showToast(message, 'success');
  const showError = (message) => showToast(message, 'error');
  const showInfo = (message) => showToast(message, 'info');

  const showConfirm = ({ 
    title, 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar',
    type = 'warning'
  }) => {
    return new Promise((resolve) => {
      setConfirmModal({
        isVisible: true,
        title,
        message,
        confirmText,
        cancelText,
        type,
        onConfirm: () => {
          setConfirmModal(prev => ({ ...prev, isVisible: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmModal(prev => ({ ...prev, isVisible: false }));
          resolve(false);
        }
      });
    });
  };

  const handleConfirmModalConfirm = () => {
    if (confirmModal.onConfirm) {
      confirmModal.onConfirm();
    }
  };

  const handleConfirmModalCancel = () => {
    if (confirmModal.onCancel) {
      confirmModal.onCancel();
    }
  };

  return (
    <ToastContext.Provider value={{ 
      showToast, 
      showSuccess, 
      showError, 
      showInfo, 
      showConfirm 
    }}>
      {children}
      
      {/* Render all toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => hideToast(toast.id)}
        />
      ))}

      {/* Render confirm modal */}
      <ConfirmModal
        isVisible={confirmModal.isVisible}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        cancelText={confirmModal.cancelText}
        type={confirmModal.type}
        onConfirm={handleConfirmModalConfirm}
        onCancel={handleConfirmModalCancel}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de ToastProvider');
  }
  return context;
};
