import { ChangeEvent } from "react";
import { Label, Checkbox as SCheckbox } from "../atoms";

type TCheckbox = {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export default function Checkbox({
  id,
  label,
  isChecked = false,
  onChange,
}: TCheckbox) {
  return (
    <>
      <SCheckbox
        type="checkbox"
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
        className="checkbox"
      />
      <Label className="checkbox" htmlFor={id} data-content={label}>
        {" "}
        {label}
      </Label>
    </>
  );
}
