import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Container, AddTask, TaskList, NoTasks } from "../";

const getIds = ({ id }: { id: string }) => id;

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export default function App() {
  function handleAdd(title: string) {
    if (!title) {
      alert("Enter a task to add");
    }

    const task = {
      id: nanoid(),
      title,
      isCompleted: false,
    };
    const newTasks = [task, ...tasks];
    const taskIds = newTasks.map(getIds);

    localStorage.setItem("tasks", JSON.stringify(taskIds));
    newTasks.forEach(({ id, title, isCompleted }) =>
      localStorage.setItem(id, JSON.stringify({ title, isCompleted }))
    );

    setTasks(newTasks);
  }

  function handleChangeStatus(id: string, isCompleted: boolean) {
    const { title } = tasks.find((t) => t.id === id) as Task;

    localStorage.setItem(id, JSON.stringify({ title, isCompleted }));
  }

  function handleEdit(id: string, title: string) {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, title } : t));
    const task = newTasks.find((t) => t.id === id);

    setTasks(newTasks);

    localStorage.setItem(id, JSON.stringify(task));
  }

  function handleDelete(id: string) {
    const newTasks = tasks.filter((t) => t.id !== id);
    const newTaskIds = newTasks.map(getIds);

    setTasks(newTasks);

    localStorage.setItem("tasks", JSON.stringify(newTaskIds));
    localStorage.removeItem(id);
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const taskIdsJson = localStorage.getItem("tasks") as string;

      if (taskIdsJson) {
        const taskIds = JSON.parse(taskIdsJson);
        const tasks = taskIds.map((id: string) => {
          const taskJson = localStorage.getItem(id) as string;
          const task = JSON.parse(taskJson);
          return { id, ...task };
        });

        setTasks(tasks);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <Container>
      <AddTask onAdd={handleAdd} />
      {tasks.length ? (
        <TaskList
          tasks={tasks}
          onChangeStatus={handleChangeStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <NoTasks />
      )}
    </Container>
  );
}
