import { ChangeEvent } from "react";

import { /* TaskText, */ Label, Checkbox as SCheckbox } from "./styles";

type Props = {
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
}: Props) {
  return (
    <span>
      <SCheckbox
        type="checkbox"
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        checked={isChecked}
      />{" "}
      <Label htmlFor={id} /* data-content={label} */>
        {/* <ToDoCheckboxSVG /> */}
        {/* <TaskText> */}
        {label}
        {/* </TaskText> */}
      </Label>
    </span>
  );
}
