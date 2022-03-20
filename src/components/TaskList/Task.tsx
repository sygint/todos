import { ReactNode } from "react";

import CheckboxField from "../shared/CheckboxField";
import { Button } from "../shared/styles";
import { TaskContainer } from "./styles";

type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskProps = {
  task: TaskObject;
  checkbox?: () => ReactNode;
  onChangeStatus: (isCompleted: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function Task({
  task,
  checkbox,
  onChangeStatus,
  onShowEdit,
  onDelete,
}: TaskProps) {
  const handleChange = (isChecked: boolean) => {
    onChangeStatus(isChecked);
  };

  const { id, title, isCompleted } = task;

  return (
    <TaskContainer>
      <CheckboxField
        id={id}
        label={title}
        isChecked={isCompleted}
        onChange={handleChange}
        checkbox={checkbox}
      />
      <Button className="button" onClick={() => onShowEdit(id)}>
        Edit
      </Button>
      <Button className="button is-danger" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </TaskContainer>
  );
}

Task.defaultProps = {
  checkbox: null,
};

export default Task;
