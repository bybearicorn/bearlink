import cn from "classnames";
import { ChangeEventHandler } from "react";

interface TextAreaProps {
  readonly id: string;
  readonly label?: string;
  readonly className?: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly variant?: "default" | "custom";
  readonly error?: string;
  readonly required?: boolean;
  readonly readOnly?: boolean;
  readonly rows?: number;
  readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = ({
  id,
  label,
  className,
  variant = "default",
  error,
  placeholder,
  readOnly,
  required,
  rows,
  value,
  onChange,
}: TextAreaProps) => (
  <fieldset className="w-full">
    {/* Optional label and required star */}
    {label || required ? (
      <span className="flex gap-x-1">
        {label ? (
          <label className="text-[#4D5B7B]" htmlFor={id}>
            {label}
          </label>
        ) : null}
        {required ? <span className="text-[#FF4B6C]">*</span> : null}
      </span>
    ) : null}
    <textarea
      className={cn(
        "outline-none disabled:cursor-not-allowed disabled:bg-gray-200",
        {
          "focus:border-primary focus:ring-primary rounded-sm border bg-white p-3 text-base focus:ring-1":
            variant === "default",
          "border-[#D2D2D2]": !error,
          "border-[#F00] ring-1 ring-[#F00]": error,
        },
        className,
      )}
      id={id}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      required={required}
      rows={rows}
      value={value}
    />
  </fieldset>
);
