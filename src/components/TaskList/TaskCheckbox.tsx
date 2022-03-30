import { ChangeEvent } from "react";

import { /* TaskText, */ Label, Checkbox } from "./styles";
// import { ReactComponent as ToDoCheckboxSVG } from "../../assets/todo-checkbox.svg";

type TaskCheckboxProps = {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export default function TaskCheckbox({
  id,
  label,
  isChecked = false,
  onChange,
}: TaskCheckboxProps) {
  return (
    <>
      <Checkbox
        type="checkbox"
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
      />
      <Label htmlFor={id} data-content={label}>
        {/* <ToDoCheckboxSVG /> */}
        {/* <TaskText> */}
        {label}
        {/* </TaskText> */}
      </Label>
    </>
  );
}
