import { IAddTaskAction, IEditTaskAction, IRemoveTaskAction, ITask, taskActionTypes } from "../../types/task"

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

export const removeTask = (id: string):IRemoveTaskAction => {
  return {
    type: taskActionTypes.REMOVE_TASK,
    payload: id,
  }
}