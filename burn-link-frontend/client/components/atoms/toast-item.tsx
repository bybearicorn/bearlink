import cn from "classnames";
import { useEffect, useState } from "react";

import { ToastMessage, ToastType } from "@client/contexts/toast-context";

interface ToastItemProps {
  readonly toast: ToastMessage;
  readonly onDismiss: (id: string) => void;
}

const TOAST_STYLES: Record<ToastType, string> = {
  success: "bg-[#cedcc2] border-[#cedcc2] text-black",
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  info: "bg-white border-gray-200 text-black",
};

const FADE_DURATION = 300;

export const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
  const [isEnteringAnimation, setIsEnteringAnimation] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  function dismissWithFade() {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => onDismiss(toast.id), FADE_DURATION);
  }

  useEffect(() => {
    // Small delay for animation to show
    const timer = setTimeout(() => setIsEnteringAnimation(false), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If toast duration is 0, toast will never fade out automatically
    if (!toast.duration || isFadingOut) return;

    const timer = setTimeout(() => dismissWithFade(), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, isFadingOut]);

  const animationClasses = cn("transition-all duration-300 ease-in-out", {
    "opacity-0 -translate-y-4": isEnteringAnimation,
    "opacity-100 translate-y-0": !isEnteringAnimation && !isFadingOut,
    "opacity-0 -translate-y-2": isFadingOut,
  });

  return (
    <aside
      className={cn(
        "pointer-events-auto relative flex w-full max-w-sm items-center space-x-3 rounded-md border p-4 shadow-lg",
        TOAST_STYLES[toast.type],
        animationClasses,
      )}>
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        className="-m-1 flex-shrink-0 rounded-md p-1 opacity-70 hover:opacity-100"
        disabled={isFadingOut}
        onClick={dismissWithFade}
        type="button">
        <span aria-hidden="true" className="cursor-pointer text-lg leading-none font-semibold">
          ×
        </span>
      </button>
    </aside>
  );
};
