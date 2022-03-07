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
    <Label>
      <SCheckbox
        type="checkbox"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
      />
      {label}
    </Label>
  );
}
