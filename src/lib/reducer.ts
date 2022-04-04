import { TaskObject as Task } from "../components/TaskList/Task";

// Task Actions
enum TaskActionType {
  ADD_TASK = "ADD_TASK",
  EDIT_TASK = "EDIT_TASK",
  DELETE_TASK = "DELETE_TASK",
  APPEND_TASKS = "APPEND_TASKS",
}

type AddTask = {
  type: TaskActionType.ADD_TASK;
  payload: Task;
};

type EditTask = {
  type: TaskActionType.EDIT_TASK;
  payload: Task;
};

type DeleteTask = {
  type: TaskActionType.DELETE_TASK;
  payload: string;
};

type AppendTasks = {
  type: TaskActionType.APPEND_TASKS;
  payload: Task[];
};

type TaskAction = AddTask | EditTask | DeleteTask | AppendTasks;

// SortBy Actions

export enum SortByActionPayload {
  None = "NONE",
  Status = "STATUS",
}

enum SortByActionType {
  SORT_BY = "SORT_BY",
}

type SortBy = {
  type: SortByActionType;
  payload: SortByActionPayload;
};

type SortByAction = SortBy;

// Hide Actions

export enum HideActionPayload {
  None = "NONE",
  Completed = "COMPLETED",
}

enum HideActionType {
  HIDE = "HIDE",
}

type Hide = {
  type: HideActionType;
  payload: HideActionPayload;
};

type HideAction = Hide;

// Confirm Delete Actions

enum ConfirmDeleteActionType {
  CONFIRM_DELETE = "CONFIRM_DELETE",
}

type ConfirmDelete = {
  type: ConfirmDeleteActionType;
  payload: boolean;
};

// State Actions

enum StateActionType {
  LOAD_STATE = "LOAD_STATE",
}

type StateActionPayload = State;

type LoadState = {
  type: StateActionType.LOAD_STATE;
  payload: StateActionPayload;
};

type StateAction = LoadState;

type Action =
  | TaskAction
  | SortByAction
  | HideAction
  | ConfirmDelete
  | StateAction;

export const ActionTypes = {
  ...StateActionType,
  ...TaskActionType,
  ...SortByActionType,
  ...HideActionType,
  ...ConfirmDeleteActionType,
};

// App state management

export type State = {
  tasks: Task[];
  settings: {
    sortBy: SortByActionPayload;
    hide: HideActionPayload;
    confirmDelete: boolean;
  };
};

export const initialState: State = {
  tasks: [],
  settings: {
    sortBy: SortByActionPayload.None,
    hide: HideActionPayload.None,
    confirmDelete: false,
  },
};

export const reducer = (state: State, action: Action) => {
  const { type, payload } = action;

  switch (type) {
    // Task Actions

    case ActionTypes.ADD_TASK:
      return { ...state, tasks: [payload, ...state.tasks] };

    case ActionTypes.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((t: Task) =>
          t.id === payload.id ? { ...t, ...payload } : t,
        ),
      };

    case ActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((t: Task) => t.id !== payload),
      };

    case ActionTypes.APPEND_TASKS:
      return { ...state, tasks: [...payload, ...state.tasks] };

    // SortBy Actions
    case ActionTypes.SORT_BY:
      return { ...state, settings: { ...state.settings, sortBy: payload } };

    // Hide Actions
    case ActionTypes.HIDE:
      return { ...state, settings: { ...state.settings, hide: payload } };

    // ConfirmDelete Actions
    case ActionTypes.CONFIRM_DELETE:
      return {
        ...state,
        settings: { ...state.settings, confirmDelete: payload },
      };

    // State Actions
    case ActionTypes.LOAD_STATE:
      return payload;

    default:
      // console.error("unsupported type:", type);
      throw new Error();
  }
};
