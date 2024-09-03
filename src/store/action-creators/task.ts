import { IAddTaskAction, IEditTaskAction, IRemoveTasksAction, ITask, taskActionTypes } from "../../types/task"

export const addTask = (task: ITask):IAddTaskAction => {
  return {
    type: taskActionTypes.ADD_TASK,
    payload: task,
  }
}

export const editTask = (task: ITask):IEditTaskAction => {
  return {
    type: taskActionTypes.EDIT_TASK,
    payload: task,
  }
}

export const removeTasks = (ids: string[]):IRemoveTasksAction => {
  return {
    type: taskActionTypes.REMOVE_TASKS,
    payload: ids,
  }
}