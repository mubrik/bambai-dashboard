import {useContext, createContext} from 'react';

/* types */

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type: ToastType;
  message: string;
  show?: boolean;
  onClose?: () => void;
  onAction?: React.ReactNode;
  showClose?: boolean;
  timeout?: number;
  variant?: 'standard' | 'filled' | 'outlined';
  anchor?: {vertical: 'top' | 'bottom'; horizontal: 'left' | 'right'};
}

export interface ToastContextProps {
  toastState: ToastProps;
  toast: (props: ToastProps) => void;
}

/* constants */
export const initialToastState = {
  onClose: () => null,
  onAction: undefined,
  message: '',
  show: false,
  showClose: true,
  timeout: 5000,
  type: 'success' as ToastType,
  variant: 'standard',
  anchor: {vertical: 'bottom', horizontal: 'left'},
} as ToastProps;

export const ToastContext = createContext<ToastContextProps>({
  toastState: initialToastState,
  toast: () => null,
});

export default function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
