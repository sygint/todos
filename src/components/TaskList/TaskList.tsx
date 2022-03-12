import { useState } from "react";

import { EditTask, Task } from "../";
import { TaskListContainer, TaskListItem } from "./styles";


export type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskListProps = {
  tasks: TaskObject[];
  onChangeStatus: (id: string, isCompleted: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onChangeStatus,
  onEdit,
  onDelete,
}: TaskListProps) {
  const [idToEdit, setIdToEdit] = useState<string>("");

  function handleShowEdit(id: string) {
    setIdToEdit(id);
  }

  function handleEdit(id: string, title: string) {
    onEdit(id, title);
    setIdToEdit("");
  }

  function handleCancel() {
    setIdToEdit("");
  }

  return (
    <TaskListContainer>
      {tasks.map((task: TaskObject) => {
        const { id, title } = task;

        return (
          <TaskListItem key={id}>
            {idToEdit === id ? (
              <EditTask
                key={id}
                onEdit={(title) => handleEdit(id, title)}
                value={title}
                onCancel={handleCancel}
              />
            ) : (
              <Task
                key={id}
                task={task}
                onChangeStatus={onChangeStatus}
                onShowEdit={handleShowEdit}
                onDelete={onDelete}
              />
            )}
          </TaskListItem>
        );
      })}
    </TaskListContainer>
  );
}
