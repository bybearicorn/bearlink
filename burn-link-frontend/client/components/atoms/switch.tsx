import cn from "classnames";
import { ChangeEventHandler } from "react";

interface SwitchProps {
  readonly title?: string;
  readonly className?: string;
  readonly isChecked: boolean;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Switch = ({ title, className, isChecked, onChange }: SwitchProps) => (
  <label className={cn("inline-flex cursor-pointer items-center", className)}>
    <input checked={isChecked} className="peer hidden" onChange={onChange} type="checkbox" />
    <span
      className={cn(
        "peer relative h-6 w-11 rounded-full after:absolute after:start-[2px] after:top-[2px] after:h-5",
        "after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all",
        "peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full",
        {
          "bg-gray-400": !isChecked,
          "bg-primary-dark": isChecked,
        },
      )}
    />
    {title ? <span className="ms-3 text-sm font-bold text-black uppercase">{title}</span> : null}
  </label>
);
