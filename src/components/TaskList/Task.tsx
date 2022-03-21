import { Edit, Trash2 } from "react-feather";

import TaskCheckbox from "./TaskCheckbox";
import { IconButton, SROnly } from "../shared/styles";
import { TaskContainer } from "./styles";

type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskProps = {
  task: TaskObject;
  onChangeStatus: (isCompleted: boolean) => void;
  onShowEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function Task({ task, onChangeStatus, onShowEdit, onDelete }: TaskProps) {
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
      <IconButton onClick={() => onShowEdit(id)}>
        <Edit color="#135156" /> <SROnly>Edit</SROnly>
      </IconButton>
      <IconButton onClick={() => onDelete(id)}>
        <Trash2 color="#135156" /> <SROnly>Delete</SROnly>
      </IconButton>
    </TaskContainer>
  );
}

export default Task;
