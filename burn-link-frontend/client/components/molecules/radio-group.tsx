import cn from "classnames";
import { Dispatch, SetStateAction } from "react";

export type Setter<T> = Dispatch<SetStateAction<T>>;

interface RadioButtonProps {
  value: string;
}

interface RadioGroupProps {
  readonly items: RadioButtonProps[];
  readonly itemChecked: string;
  readonly setItemChecked: Setter<string> | ((val: string) => void);
  readonly className?: string;
}

export const RadioGroup = ({ items, itemChecked, setItemChecked, className }: RadioGroupProps) => (
  <fieldset className={cn("ml-3 flex flex-col gap-y-3 md:ml-0 md:flex-row", className)}>
    {items.map((item) => (
      <center className="me-6 flex items-center" key={item.value}>
        <input
          checked={itemChecked === item.value}
          className={cn(
            "ring-primary checked:bg-primary h-4 w-4 rounded-full border-2 border-white p-0.5 ring-1 duration-200 checked:border-gray-300",
          )}
          id={item.value}
          name="inline-radio-group"
          onChange={(e) => setItemChecked(e.target.value)}
          type="radio"
          value={item.value}
        />
        <label className="text-md ms-2 font-medium" htmlFor={item.value}>
          {item.value}
        </label>
      </center>
    ))}
  </fieldset>
);
