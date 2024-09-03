import { ITaskState, taskActionTypes } from "../../types/task";

const initialState:ITaskState = {
  tasks: []
}

export const taskReducer = (state = initialState, action: any): ITaskState => {
  switch (action.type) {
    case taskActionTypes.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case taskActionTypes.EDIT_TASK:
      return { ...state, tasks: [...state.tasks.filter(task => task.id !== action.payload.id), action.payload] };
    case taskActionTypes.REMOVE_TASKS:
      return { ...state, tasks: state.tasks.filter(task => !action.payload.includes(task.id))};
    default:
      return state;
  }
}