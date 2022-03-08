import { ChangeEvent } from "react";
import { Label, Checkbox as SCheckbox } from "../atoms";

type TCheckbox = {
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export default function Checkbox({
  label,
  isChecked = false,
  onChange,
}: TCheckbox) {
  return (
    <>
      <SCheckbox
        type="checkbox"
        id="task-check"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
        className="checkbox"
      />
      <Label className="checkbox" htmlFor="task-check" data-content={label}>
        {" "}
        {label}
      </Label>
    </>
  );
}
