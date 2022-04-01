import { /* useRef, */ useEffect, useState, ChangeEvent } from "react";
import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

import { decrypt, encrypt } from "../lib/crypto";
import { downloadBlobAsFile } from "../lib/utils";
import { Container, NoTasks } from "./styles";
import { Button } from "./shared/styles";
import Checkbox from "./shared/Checkbox";
import AddTask from "./AddTask";
import TaskList from "./TaskList/TaskList";

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

enum SortBy {
  None,
  Status,
}

const password = "password";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);

  // const importTaskRef = useRef(null);

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

  const exportTasks = async () => {
    const tasksJsonString = await JSON.stringify(tasks, null, 2);

    downloadBlobAsFile(tasksJsonString, "export.txt");
  };

  const importTasks = () => {
    // TODO: swap to using ref as that's more internal
    const file = document.getElementById("input-file");

    if (file) {
      file.click();
    }
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.currentTarget.files || [])[0];
    const fileReader = new FileReader();

    const handleFileRead = () => {
      const content = fileReader.result as string;

      if (content) {
        const newTasks = JSON.parse(content);
        saveTasks([...newTasks, ...tasks]);
      }
    };

    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
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

  const handleChangeSortByStatus = (isChecked: boolean) => {
    if (isChecked) {
      setSortBy(SortBy.Status);
    } else {
      setSortBy(SortBy.None);
    }
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

  const noTasks = isLoaded ? <NoTasks>No tasks, add some.</NoTasks> : null;

  return (
    <Container>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
        }}
      >
        <Button onClick={backupTasks}>Backup</Button>
        <Button onClick={exportTasks}>Export</Button>
        <Button onClick={importTasks}>Import</Button>
        <input
          type="file"
          // ref={importTaskRef}
          id="input-file"
          onChange={handleImport}
          style={{ display: "none" }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
        }}
      >
        <Checkbox
          id="sort-by-status"
          label="Sort by status"
          isChecked={sortBy === SortBy.Status}
          onChange={handleChangeSortByStatus}
        />
      </div>
      <AddTask onAdd={handleAdd} />
      {tasks.length ? (
        <>
          <TaskList
            tasks={sortBy ? tasks.filter((t) => !t.isCompleted) : tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {sortBy && (
            <>
              <h2>Completed</h2>
              <TaskList
                tasks={sortBy ? tasks.filter((t) => t.isCompleted) : tasks}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
        </>
      ) : (
        noTasks
      )}
    </Container>
  );
}
