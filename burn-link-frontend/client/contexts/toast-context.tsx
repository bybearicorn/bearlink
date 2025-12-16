import { ReactNode, createContext, use, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type AddToastFn = (message: string, type: ToastType, duration?: number) => void;

interface ToastContextProps {
  addToast: AddToastFn;
  removeToast: (id: string) => void;
  toasts: ToastMessage[];
}

interface ToastProviderProps {
  readonly children: ReactNode;
  readonly defaultDuration?: number;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children, defaultDuration = 5000 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType, duration?: number) => {
    const newToast = { id: crypto.randomUUID(), message, type, duration: duration ?? defaultDuration };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== toastId));
  };

  return (
    <ToastContext
      value={{
        addToast,
        removeToast,
        toasts,
      }}>
      {children}
    </ToastContext>
  );
};

export const useToastContext = (): ToastContextProps => {
  const context = use(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
