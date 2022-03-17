import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

import { Container } from "./shared/atoms";
import AddTask from "./AddTask";
import TaskList from "./TaskList/TaskList";
import NoTasks from "./TaskList/NoTasks";

type OnEditOptions = {
  id: string;
  key: string;
  value: string | boolean;
};

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (title: string) => {
    if (!title) {
      /* eslint-disable no-alert */
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
  };

  const handleEdit = ({ id, key, value }: OnEditOptions) => {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, [key]: value } : t,
    );

    set("todos", newTasks);
    setTasks(newTasks);
  };

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);

    set("todos", newTasks);
    setTasks(newTasks);
  };

  useEffect(() => {
    async function init() {
      try {
        const fetchedTasks = await get("todos");

        if (fetchedTasks) {
          setTasks(fetchedTasks);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    init();
  }, []);

  return (
    <Container>
      <AddTask onAdd={handleAdd} />
      {tasks.length ? (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <NoTasks />
      )}
    </Container>
  );
}
