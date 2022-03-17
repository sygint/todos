import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

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

    const newTasks = [
      {
        id: nanoid(),
        title,
        isCompleted: false,
      },
      ...tasks,
    ];

    set("todos", newTasks);
    setTasks(newTasks);
  }

  function handleChangeStatus(id: string, isCompleted: boolean) {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted } : t
    );

    set("todos", newTasks);
    setTasks(newTasks);
  }

  function handleEdit(id: string, title: string) {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, title } : t));

    set("todos", newTasks);
    setTasks(newTasks);
  }

  function handleDelete(id: string) {
    const newTasks = tasks.filter((t) => t.id !== id);

    set("todos", newTasks);
    setTasks(newTasks);
  }

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const tasks = await get("todos");

        if (tasks) {
          setTasks(tasks);
        }
      } catch (e) {
        console.error(e);
      }
    }
    init();
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
