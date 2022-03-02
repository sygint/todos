import { ChangeEvent, MouseEvent } from "react";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
}

type TaskItemProps = {
  task: Task;
  onChangeStatus: (id: string, isChecked: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onChangeStatus, onShowEdit, onDelete }: TaskItemProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeStatus(id, event.target.checked)
  }

  const { id, title, isCompleted } = task;

  return (
    <li>
      <label><input type="checkbox" defaultChecked={isCompleted} onChange={handleChange} />{title}</label>
      {" "}
      <button onClick={() => onShowEdit(id)}>edit</button>
      {" "}
      <button onClick={() => onDelete(id)}>delete</button>
    </li>
  )
}
