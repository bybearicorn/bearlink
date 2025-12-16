import cn from "classnames";

import { ToastItem } from "@client/components/atoms/toast-item";

import { ToastPosition, useToastContext } from "@client/contexts/toast-context";

interface ToastContainerProps {
  readonly position?: ToastPosition;
}

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-5 right-5",
  "top-left": "top-5 left-5",
  "bottom-right": "bottom-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "top-center": "top-5 left-1/2 transform -translate-x-1/2",
  "bottom-center": "bottom-5 left-1/2 transform -translate-x-1/2",
};

export const ToastContainer = ({ position = "top-right" }: ToastContainerProps) => {
  const { toasts, removeToast } = useToastContext();

  if (!toasts.length) {
    return null;
  }

  const posClass = positionClasses[position];
  const isBottom = position.includes("bottom");
  const isCenter = position.includes("center");

  const containerClasses = cn("fixed", posClass, "z-50", "w-full", "max-w-sm", "space-y-2", "flex", "flex-col", {
    "items-center": isCenter,
    "items-end": !isCenter && (position === "top-right" || position === "bottom-right"),
    "items-start": !isCenter && (position === "top-left" || position === "bottom-left"),
  });

  return (
    <section className={containerClasses} style={{ pointerEvents: "none" }}>
      {(isBottom ? toasts : [...toasts].reverse()).map((toast) => (
        <ToastItem key={toast.id} onDismiss={removeToast} toast={toast} />
      ))}
    </section>
  );
};
