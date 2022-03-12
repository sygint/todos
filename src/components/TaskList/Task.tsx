import { ReactNode } from "react";

import { CheckboxField, Button } from "..";
import { TaskContainer } from "./styles";

type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskProps = {
  task: TaskObject;
  checkbox?: () => ReactNode;
  onChangeStatus: (id: string, isChecked: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function Task({
  task,
  checkbox,
  onChangeStatus,
  onShowEdit,
  onDelete,
}: TaskProps) {
  function handleChange(isChecked: boolean) {
    onChangeStatus(id, isChecked);
  }

  const { id, title, isCompleted } = task;

  return (
    <TaskContainer>
      <CheckboxField id={id} label={title} isChecked={isCompleted} onChange={handleChange} checkbox={checkbox} />
      <Button className="button" onClick={() => onShowEdit(id)}>
        Edit
      </Button>
      <Button className="button is-danger" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </TaskContainer>
  );
}
