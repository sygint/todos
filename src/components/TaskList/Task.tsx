import { Checkbox, Button } from "..";
import { TaskContainer } from "./styles";

type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskProps = {
  task: TaskObject;
  onChangeStatus: (id: string, isChecked: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function Task({
  task,
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
      <Checkbox id={id} label={title} isChecked={isCompleted} onChange={handleChange} />
      <Button className="button" onClick={() => onShowEdit(id)}>
        Edit
      </Button>
      <Button className="button is-danger" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </TaskContainer>
  );
}
