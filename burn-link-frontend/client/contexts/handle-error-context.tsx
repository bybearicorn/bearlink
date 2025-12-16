import { ReactNode, createContext, use, useEffect } from "react";

import { useToastContext } from "./toast-context";

export type HandleErrorFn = (errorOrMessage: unknown, cause?: unknown) => void;

const HandleErrorContext = createContext<HandleErrorFn | undefined>(undefined);

interface ErrorProviderProps {
  readonly children: ReactNode;
}

export const HandleErrorProvider = ({ children }: ErrorProviderProps) => {
  const { addToast } = useToastContext();

  const getErrorCauseMessage = (error: Error): string => {
    const cause = error.cause;
    if (!cause) return "";
    if (cause instanceof Error) return ` (${cause.message})`;
    if (typeof cause === "string") return ` (${cause})`;
    return "";
  };

  const handleError: HandleErrorFn = (errorInput, wrapperMessage) => {
    let error: Error;

    if (errorInput instanceof Error) {
      error = errorInput;
    } else {
      const message = typeof errorInput === "string" ? errorInput : "Unknown error";
      error = new Error(wrapperMessage ? `${wrapperMessage}: ${message}` : message);
    }

    console.error("Error caught:", error);

    // If error cause is available, append it
    addToast(`${error.message}${getErrorCauseMessage(error)}`, "error", 0);
  };

  useEffect(() => {
    const handleGlobalError = (
      message: Event | string,
      source?: string,
      line?: number,
      column?: number,
      error?: Error,
    ) => {
      console.error("Global 'onerror' caught:", { message, source, line, column, error });
      const globalError = error || new Error(message.toString());
      addToast(`${globalError.message}${getErrorCauseMessage(globalError)}`, "error", 0);
      return true; // prevent default browser error handling
    };

    const handleGlobalRejection = (event: PromiseRejectionEvent) => {
      console.error("Global unhandled rejection:", event.reason);
      addToast(`${event.reason}`, "error", 0);
      event.preventDefault();
    };

    window.onerror = handleGlobalError;
    window.addEventListener("unhandledrejection", handleGlobalRejection);

    return () => {
      window.onerror = null;
      window.removeEventListener("unhandledrejection", handleGlobalRejection);
    };
  }, []);

  return <HandleErrorContext value={handleError}>{children}</HandleErrorContext>;
};

export const useHandleErrorContext = () => {
  const context = use(HandleErrorContext);
  if (!context) {
    throw new Error("useHandleErrorContext must be used within a HandleErrorProvider");
  }
  return context;
};
