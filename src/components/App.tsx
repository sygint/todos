import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

import { decrypt, encrypt } from "../lib/crypto";
import { downloadBlobAsFile } from "../lib/utils";
import { Container } from "./styles";
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

const password = "password";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const saveTasks = async (tasksData: Task[]) => {
    const tasksJsonString = await JSON.stringify(tasksData);
    const encryptedTasks = await encrypt(tasksJsonString, password);

    set("tasks", encryptedTasks);
    setTasks(tasksData);
  };

  const backupTasks = async () => {
    const tasksJsonString = await JSON.stringify(tasks);
    const encryptedTasks = await encrypt(tasksJsonString, password);

    downloadBlobAsFile(encryptedTasks, "backup.txt");
  };

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

    saveTasks(newTasks);
  };

  const handleEdit = ({ id, key, value }: OnEditOptions) => {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, [key]: value } : t,
    );

    saveTasks(newTasks);
  };

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);

    saveTasks(newTasks);
  };

  useEffect(() => {
    async function init() {
      try {
        const encryptedTasks = await get("tasks");

        if (encryptedTasks) {
          const decryptedTasksJson = await decrypt(encryptedTasks, password);
          const decryptedTasks = await JSON.parse(decryptedTasksJson);
          setTasks(decryptedTasks);
        }

        setIsLoaded(true);
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    init();
  }, []);

  const noTasks = isLoaded ? <NoTasks /> : null;

  return (
    <Container>
      <div style={{ display: "grid" }}>
        <button type="button" onClick={backupTasks}>
          Backup
        </button>
      </div>
      <AddTask onAdd={handleAdd} />
      {tasks.length ? (
        <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        noTasks
      )}
    </Container>
  );
}
