import { Edit2, Trash2 } from "react-feather";

import TaskCheckbox from "./TaskCheckbox";
import { IconButton } from "../shared/styles";
import { TaskContainer } from "./styles";

type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type Props = {
  task: TaskObject;
  onChangeStatus: (isCompleted: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function Task({
  task,
  onChangeStatus,
  onShowEdit,
  onDelete,
}: Props) {
  const handleChange = (isChecked: boolean) => {
    onChangeStatus(isChecked);
  };

  const { id, title, isCompleted } = task;

  return (
    <TaskContainer>
      <TaskCheckbox
        id={id}
        label={title}
        isChecked={isCompleted}
        onChange={handleChange}
      />
      <IconButton className="edit-button" hide onClick={() => onShowEdit(id)}>
        <Edit2 color="#135156" /> <span className="sr-only">Edit</span>
      </IconButton>
      <IconButton className="delete-button" hide onClick={() => onDelete(id)}>
        <Trash2 color="#135156" /> <span className="sr-only">Delete</span>
      </IconButton>
    </TaskContainer>
  );
}
