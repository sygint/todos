import { useState } from "react";

import EditTask from "../EditTask";
import Task, { Props as TaskProps, TaskObject } from "./Task";
import { TaskListContainer } from "./styles";
// import { ReactComponent as ToDoSVGContainer } from "../../assets/todo-container.svg";

type Props = Omit<TaskProps, "task" | "onChangeStatus" | "onShowEdit"> & {
  tasks: TaskObject[];
  onEdit: (task: TaskObject) => void;
};

export default function TaskList({ tasks, onEdit, onDelete }: Props) {
  const [idToEdit, setIdToEdit] = useState<string>("");

  const handleShowEdit = (id: string) => {
    setIdToEdit(id);
  };

  const handleEdit = (task: TaskObject) => {
    onEdit(task);
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

          const renderEditTask = () => (
            <EditTask
              key={id}
              onEdit={(newTitle) => handleEdit({ ...task, title: newTitle })}
              value={title}
              onCancel={handleCancel}
            />
          );

          const renderTask = () => (
            <Task
              key={id}
              task={task}
              onChangeStatus={(isCompleted) =>
                handleEdit({ ...task, isCompleted })
              }
              onShowEdit={handleShowEdit}
              onDelete={onDelete}
            />
          );

          return idToEdit === id ? renderEditTask() : renderTask();
        })}
      </TaskListContainer>
    </>
  );
}
