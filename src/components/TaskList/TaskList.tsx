import { useState } from "react";

import { EditTask, Task } from "../";
import { TaskListContainer, TaskListItem } from "./styles";

import { ReactComponent as ToDoContainer } from "../../assets/todo-container.svg";
import { ReactComponent as ToDoCheckbox } from "../../assets/todo-checkbox.svg";

export type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type onEditOptions = {
  id: string;
  key: string;
  value: string | boolean;
};

type TaskListProps = {
  tasks: TaskObject[];
  onEdit: (options: onEditOptions) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const [idToEdit, setIdToEdit] = useState<string>("");

  function handleShowEdit(id: string) {
    setIdToEdit(id);
  }

  function handleEdit({ id, key, value }: onEditOptions) {
    onEdit({ id, key, value });
    setIdToEdit("");
  }

  function handleCancel() {
    setIdToEdit("");
  }

  return (
    <TaskListContainer>
      <ToDoContainer />
      {tasks.map((task: TaskObject) => {
        const { id, title } = task;

        return (
          <TaskListItem key={id}>
            {idToEdit === id ? (
              <EditTask
                key={id}
                onEdit={(title) =>
                  handleEdit({ id, key: "title", value: title })
                }
                value={title}
                onCancel={handleCancel}
              />
            ) : (
              <Task
                key={id}
                task={task}
                onChangeStatus={(isCompleted) =>
                  handleEdit({ id, key: "isCompleted", value: isCompleted })
                }
                onShowEdit={handleShowEdit}
                onDelete={onDelete}
                checkbox={() => <ToDoCheckbox />}
              />
            )}
          </TaskListItem>
        );
      })}
    </TaskListContainer>
  );
}
