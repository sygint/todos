import { useState } from "react";

import { EditTask, Task } from "../";

export type TTask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TTaskList = {
  tasks: TTask[];
  onChangeStatus: (id: string, isCompleted: boolean) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({
  tasks,
  onChangeStatus,
  onEdit,
  onDelete,
}: TTaskList) {
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
      {tasks.map((task: TTask) => {
        const { id, title } = task;

        return idToEdit === id ? (
          <EditTask
            key={id}
            onEdit={(title) => handleEdit(id, title)}
            value={title}
            onCancel={handleCancel}
          />
        ) : (
          <li key={id}>
            <Task
              key={id}
              task={task}
              onChangeStatus={onChangeStatus}
              onShowEdit={handleShowEdit}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}
