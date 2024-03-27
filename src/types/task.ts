export interface ITask {
  day: number,
  id: string,
  text: string,
  done: boolean,
  created: number
}

export enum taskActionTypes {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  EDIT_TASK = 'EDIT_TASK',
}

export interface IAddTaskAction {
  type: taskActionTypes.ADD_TASK,
  payload: ITask,
}

export interface IRemoveTaskAction {
  type: taskActionTypes.REMOVE_TASK,
  payload: string,
}

export interface IEditTaskAction {
  type: taskActionTypes.EDIT_TASK,
  payload: ITask,
}

export type TTaskAction = IAddTaskAction | IRemoveTaskAction | IEditTaskAction;

export interface ITaskState {
  tasks: ITask[],
}