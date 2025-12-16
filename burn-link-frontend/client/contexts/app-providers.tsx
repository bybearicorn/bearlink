import { ReactNode } from "react";

import { ToastContainer } from "@client/components/molecules/toast-container";

import { ErrorBoundary } from "@client/components/wrappers/error-boundary";
import { HandleErrorProvider } from "./handle-error-context";
import { ToastProvider } from "./toast-context";

interface AppProvidersProps {
  readonly children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => (
  <ToastProvider defaultDuration={4000}>
    <HandleErrorProvider>
      <ErrorBoundary fallback="Something went wrong..">
        {children}
        <ToastContainer position="top-center" />
      </ErrorBoundary>
    </HandleErrorProvider>
  </ToastProvider>
);
