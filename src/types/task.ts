export interface ITask {
  day: number,
  id: string,
  text: string,
  done: boolean,
  created: number,
  selected: boolean,
}

export enum taskActionTypes {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASKS = 'REMOVE_TASK',
  EDIT_TASK = 'EDIT_TASK',
}

export interface IAddTaskAction {
  type: taskActionTypes.ADD_TASK,
  payload: ITask,
}

export interface IRemoveTasksAction {
  type: taskActionTypes.REMOVE_TASKS,
  payload: string[],
}

export interface IEditTaskAction {
  type: taskActionTypes.EDIT_TASK,
  payload: ITask,
}

export type TTaskAction = IAddTaskAction | IRemoveTasksAction | IEditTaskAction;

export interface ITaskState {
  tasks: ITask[],
}