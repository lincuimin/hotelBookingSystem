import { createContext, useContext, useState, useCallback } from "react";
import styled, { keyframes } from "styled-components";

const ToastContext = createContext();

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ToastItem = styled.div`
  padding: 1.6rem 2.4rem;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  min-width: 30rem;
  animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.3s ease-out;
  
  ${(props) =>
        props.$type === "error" &&
        `
    background-color: var(--color-red-100);
    color: var(--color-red-700);
  `}
  
  ${(props) =>
        props.$type === "success" &&
        `
    background-color: var(--color-green-100);
    color: var(--color-green-700);
  `}
  
  ${(props) =>
        props.$type === "warning" &&
        `
    background-color: var(--color-yellow-100);
    color: var(--color-yellow-700);
  `}
  
  ${(props) =>
        props.$type === "info" &&
        `
    background-color: var(--color-blue-100);
    color: var(--color-blue-700);
  `}
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  margin-left: auto;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 5000) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, isExiting: false }]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }

        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) =>
            prev.map((toast) =>
                toast.id === id ? { ...toast, isExiting: true } : toast
            )
        );
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 300);
    }, []);

    const showError = useCallback(
        (message) => addToast(message, "error"),
        [addToast]
    );

    const showSuccess = useCallback(
        (message) => addToast(message, "success"),
        [addToast]
    );

    const showWarning = useCallback(
        (message) => addToast(message, "warning"),
        [addToast]
    );

    const showInfo = useCallback(
        (message) => addToast(message, "info"),
        [addToast]
    );

    return (
        <ToastContext.Provider
            value={{ addToast, removeToast, showError, showSuccess, showWarning, showInfo }}
        >
            {children}
            <ToastContainer>
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        $type={toast.type}
                        $isExiting={toast.isExiting}
                    >
                        <span>{toast.message}</span>
                        <CloseButton onClick={() => removeToast(toast.id)}>×</CloseButton>
                    </ToastItem>
                ))}
            </ToastContainer>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
