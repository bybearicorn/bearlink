import { ErrorInfo, ReactNode, useEffect } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { useHandleErrorContext } from "@client/contexts/handle-error-context";

interface ErrorBoundaryProps {
  readonly fallback: ReactNode;
  readonly children: ReactNode;
}

export const ErrorBoundary = ({ children, fallback }: ErrorBoundaryProps) => {
  const handleError = useHandleErrorContext();

  const onError = (error: Error, info: ErrorInfo) => {
    console.error("ErrorBoundary - error catched", error, info);
    handleError(error);
  };

  useEffect(() => {
    window.onerror = (message, source, line, col, error) => {
      if (!error) {
        error = new Error(message as string);
      }
      console.error(`Message: ${message}, Source: ${source}, Line: ${line}, Column: ${col}, Error: ${error}`);
      handleError("Unexpected error catched", error);
    };
    window.onunhandledrejection = (error) => {
      handleError("Unhandled error catched", error.reason);
    };
  }, []);

  return (
    <ReactErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ReactErrorBoundary>
  );
};
