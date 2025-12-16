import cn from "classnames";
import { ComponentProps, MouseEventHandler } from "react";

interface ButtonProps {
  readonly title: string;
  readonly type?: ComponentProps<"button">["type"];
  readonly variant?: "primary" | "secondary" | "custom";
  readonly isLoading?: boolean;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  variant = "primary",
  title,
  type = "button",
  isLoading = false,
  disabled = false,
  className,
  onClick,
}: ButtonProps) => (
  <button
    className={cn(
      "disabled:bg-secondary disabled:text-text-color/55 cursor-pointer rounded-sm px-5 py-2 transition duration-300 disabled:cursor-not-allowed disabled:border disabled:border-gray-300",
      {
        "bg-primary hover:bg-primary-dark border-primary border-2 text-white transition duration-300":
          variant === "primary",
        "border-primary text-primary-dark border-2 hover:bg-[#f0eee6]": variant === "secondary",
      },
      className,
    )}
    disabled={disabled}
    onClick={onClick}
    type={type}>
    <span className="font-lucida font-semibold tracking-[-0.32px]">{isLoading ? "Loading ..." : title}</span>
  </button>
);
