import { Checkbox, Button } from "..";
import { STask } from "./styles";

type TTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TTTask = {
  task: TTask;
  onChangeStatus: (id: string, isChecked: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function Task({
  task,
  onChangeStatus,
  onShowEdit,
  onDelete,
}: TTTask) {
  function handleChange(isChecked: boolean) {
    onChangeStatus(id, isChecked);
  }

  const { id, title, isCompleted } = task;

  return (
    <STask>
      <Checkbox label={title} isChecked={isCompleted} onChange={handleChange} />
      <Button className="button" onClick={() => onShowEdit(id)}>
        Edit
      </Button>
      <Button className="button is-danger" onClick={() => onDelete(id)}>
        Delete
      </Button>
    </STask>
  );
}
