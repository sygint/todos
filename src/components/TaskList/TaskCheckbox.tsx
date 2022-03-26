import { ChangeEvent } from "react";

import { TaskText, Label, Checkbox } from "./styles";
import { ReactComponent as ToDoCheckboxSVG } from "../../assets/todo-checkbox.svg";

type TaskCheckboxProps = {
  id: string;
  label: string;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

function TaskCheckbox({
  id,
  label,
  isChecked = false,
  onChange,
}: TaskCheckboxProps) {
  return (
    <Label htmlFor={id} data-content={label}>
      <Checkbox
        type="checkbox"
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.checked)
        }
        defaultChecked={isChecked}
      />
      {/* <ToDoCheckboxSVG /> */}
      <TaskText>{label}</TaskText>
    </Label>
  );
}

export default TaskCheckbox;
