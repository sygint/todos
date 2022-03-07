import { Checkbox, Button } from "../";

type TTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskItemProps = {
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
}: TaskItemProps) {
  function handleChange(isChecked: boolean) {
    onChangeStatus(id, isChecked);
  }

  const { id, title, isCompleted } = task;

  return (
    <>
      <Checkbox label={title} isChecked={isCompleted} onChange={handleChange} />
      <Button onClick={() => onShowEdit(id)}>Edit</Button>
      <Button onClick={() => onDelete(id)}>Delete</Button>
    </>
  );
}
