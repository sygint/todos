/* eslint-disable no-alert */

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

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [passphrase, setPassphrase] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    tasks,
    settings: { sortBy, hide, confirmDelete },
  } = state;

  // const importTaskRef = useRef(null);

  const getPassphrase = async () => {
    let passphraseText = "";

    try {
      const passphraseFromIdb = await get("passphrase");

      if (!passphraseFromIdb) {
        passphraseText =
          window.prompt(
            "Enter passphrase:\n\nempty passphrase defaults to 'password'\nif new, this will set a password for you",
          ) || "password";

        if (window.confirm("Store this passphrase?")) {
          set("passphrase", passphraseText);
        }
      } else {
        passphraseText = passphraseFromIdb;
      }
    } catch (e) {
      /* eslint-disable no-console */
      console.error(e);
    }

    return passphraseText;
  };

  const saveState = async () => {
    const stateJson = await JSON.stringify(state);
    const stateCiphertext = await encrypt(stateJson, passphrase);

    set("state", stateCiphertext);
  };

  const loadState = async (encryptedState: string) => {
    const decryptedStateJson = await decrypt(encryptedState, passphrase);
    const decryptedState = await JSON.parse(decryptedStateJson);

    dispatch({ type: ActionTypes.LOAD_STATE, payload: decryptedState });
  };

  const backupTasks = async () => {
    const tasksJsonString = await JSON.stringify(tasks);
    const encryptedTasks = await encrypt(tasksJsonString, passphrase);

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
      alert("Enter a task to add");
      return;
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
    if (confirmDelete && !window.confirm("Are you sure?")) {
      return;
    }

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

  const handleChangeConfirmDelete = (isChecked: boolean) => {
    dispatch({
      type: ActionTypes.CONFIRM_DELETE,
      payload: isChecked,
    });
  };

  // get passphrase
  useEffect(() => {
    async function init() {
      try {
        if (!passphrase) {
          const passphraseFromIdb = await getPassphrase();

          setPassphrase(passphraseFromIdb);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    init();
  }, []);

  // get state
  useEffect(() => {
    async function load() {
      try {
        const encryptedState = await get("state");

        if (!isLoaded) {
          if (encryptedState && passphrase) {
            loadState(encryptedState);
          }
          setIsLoaded(true);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
      }
    }
    load();
  }, [passphrase]);

  // save changed state
  useEffect(() => {
    if (isLoaded) {
      saveState();
    }
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
              <Checkbox
                id="confirmDelete"
                label="Confirm delete"
                isChecked={confirmDelete}
                onChange={handleChangeConfirmDelete}
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
