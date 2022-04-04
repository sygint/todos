import {
  /* useRef, */
  useState,
  useReducer,
  useEffect,
  ChangeEvent,
} from "react";
import { nanoid } from "nanoid";
import { get, set } from "idb-keyval";

import { decrypt, encrypt } from "../lib/crypto";
import {
  reducer,
  initialState,
  State,
  ActionTypes,
  SortByActionPayload,
  HideActionPayload,
} from "../lib/reducer";
import { downloadBlobAsFile } from "../lib/utils";
import { Container, NoTasks } from "./styles";
import { Button } from "./shared/styles";
import Checkbox from "./shared/Checkbox";
import Dropdown from "./shared/Dropdown";
import AddTask from "./AddTask";
import TaskList from "./TaskList/TaskList";
import { TaskObject as Task } from "./TaskList/Task";

const password = "password";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    tasks,
    settings: { sortBy, hide },
  } = state;

  // const importTaskRef = useRef(null);

  const saveState = async () => {
    const stateJson = await JSON.stringify(state);
    const stateCiphertext = await encrypt(stateJson, password);

    set("state", stateCiphertext);
  };

  const loadState = (payload: State) => {
    dispatch({ type: ActionTypes.LOAD_STATE, payload });
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
        const payload = JSON.parse(content);
        dispatch({ type: ActionTypes.APPEND_TASKS, payload });
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

    const payload = {
      id: nanoid(),
      title,
      isCompleted: false,
    };

    dispatch({ type: ActionTypes.ADD_TASK, payload });
  };

  const handleEdit = (task: Task) => {
    dispatch({ type: ActionTypes.EDIT_TASK, payload: task });
  };

  const handleDelete = (id: string) => {
    dispatch({ type: ActionTypes.DELETE_TASK, payload: id });
  };

  const handleChangeSortByStatus = (isChecked: boolean) => {
    if (isChecked) {
      dispatch({
        type: ActionTypes.SORT_BY,
        payload: SortByActionPayload.Status,
      });
    } else {
      dispatch({
        type: ActionTypes.SORT_BY,
        payload: SortByActionPayload.None,
      });
    }
  };

  const handleHideCompleted = (isChecked: boolean) => {
    if (isChecked) {
      dispatch({
        type: ActionTypes.HIDE,
        payload: HideActionPayload.Completed,
      });
    } else {
      dispatch({
        type: ActionTypes.HIDE,
        payload: HideActionPayload.None,
      });
    }
  };

  // initialize
  useEffect(() => {
    async function init() {
      try {
        const encryptedState = await get("state");

        if (encryptedState) {
          const decryptedStateJson = await decrypt(encryptedState, password);
          const decryptedState = await JSON.parse(decryptedStateJson);
          loadState(decryptedState);
        }

        setIsLoaded(true);
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    init();
  }, []);

  useEffect(() => {
    saveState();
  }, [state]);

  const noTasks = isLoaded ? <NoTasks>No tasks, add some.</NoTasks> : null;

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Dropdown
          menuText="Menu"
          content={
            <>
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
              <Checkbox
                id="sort-by-status"
                label="Sort by status"
                isChecked={sortBy === SortByActionPayload.Status}
                onChange={handleChangeSortByStatus}
              />
              <Checkbox
                id="hide-complete"
                label="Hide complete"
                isChecked={hide === HideActionPayload.Completed}
                onChange={handleHideCompleted}
              />
            </>
          }
        />
      </div>
      <AddTask onAdd={handleAdd} />
      {tasks.length ? (
        <>
          <TaskList
            tasks={
              sortBy === SortByActionPayload.Status ||
              hide === HideActionPayload.Completed
                ? tasks.filter((t: Task) => !t.isCompleted)
                : tasks
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {sortBy === SortByActionPayload.Status &&
          hide !== HideActionPayload.Completed ? (
            <>
              <h2>Completed</h2>
              <TaskList
                tasks={
                  sortBy ? tasks.filter((t: Task) => t.isCompleted) : tasks
                }
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          ) : null}
        </>
      ) : (
        noTasks
      )}
    </Container>
  );
}
