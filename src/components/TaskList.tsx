import { useState } from "react";

import EditTask from "./EditTask";
import TaskItem from "./TaskItem";

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TaskProps = {
  tasks: Task[];
  onChangeStatus: (id: string, isCompleted: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onChangeStatus,
  onEdit,
  onDelete,
}: TaskProps) {
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
    <ul>
      {tasks.map((task) => {
        const { id, title } = task;
        return idToEdit === id ? (
          <EditTask
            key={id}
            onEdit={(title) => handleEdit(id, title)}
            value={title}
            onCancel={handleCancel}
          />
        ) : (
          <TaskItem
            key={id}
            task={task}
            onChangeStatus={onChangeStatus}
            onShowEdit={handleShowEdit}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
}
