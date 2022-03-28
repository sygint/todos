import { useState } from "react";

import EditTask from "../EditTask";
import Task from "./Task";
import { TaskListContainer, TaskListItem } from "./styles";

import { ReactComponent as ToDoSVGContainer } from "../../assets/todo-container.svg";

export type TaskObject = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type OnEditOptions = {
  id: string;
  key: string;
  value: string | boolean;
};

type TaskListProps = {
  tasks: TaskObject[];
  onEdit: (options: OnEditOptions) => void;
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: TaskListProps) {
  const [idToEdit, setIdToEdit] = useState<string>("");

  const handleShowEdit = (id: string) => {
    setIdToEdit(id);
  };

  const handleEdit = ({ id, key, value }: OnEditOptions) => {
    onEdit({ id, key, value });
    setIdToEdit("");
  };

  const handleCancel = () => {
    setIdToEdit("");
  };

  return (
    <>
      <ToDoSVGContainer />
      <TaskListContainer>
        {tasks.map((task: TaskObject) => {
          const { id, title } = task;

          return (
            <TaskListItem key={id}>
              {idToEdit === id ? (
                <EditTask
                  key={id}
                  onEdit={(newTitle) =>
                    handleEdit({
                      id,
                      key: "title",
                      value: newTitle,
                    })
                  }
                  value={title}
                  onCancel={handleCancel}
                />
              ) : (
                <Task
                  key={id}
                  task={task}
                  onChangeStatus={(isCompleted) =>
                    handleEdit({
                      id,
                      key: "isCompleted",
                      value: isCompleted,
                    })
                  }
                  onShowEdit={handleShowEdit}
                  onDelete={onDelete}
                />
              )}
            </TaskListItem>
          );
        })}
      </TaskListContainer>
    </>
  );
}
