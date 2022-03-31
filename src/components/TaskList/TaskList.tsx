import { useState } from "react";

import EditTask from "../EditTask";
import Task, { Props as TaskProps, TaskObject } from "./Task";
import { TaskListContainer, TaskListItem } from "./styles";
// import { ReactComponent as ToDoSVGContainer } from "../../assets/todo-container.svg";

type OnEditOptions = {
  id: string;
  key: string;
  value: string | boolean;
};

type Props = Omit<TaskProps, "task" | "onChangeStatus" | "onShowEdit"> & {
  tasks: TaskObject[];
  onEdit: (options: OnEditOptions) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
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
      {/* <ToDoSVGContainer /> */}
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
