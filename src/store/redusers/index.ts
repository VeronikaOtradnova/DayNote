import { combineReducers } from "redux";
import { dayReducer } from "./dayReducer";
import { calendarReducer } from "./calendarReducer";
import { taskReducer } from "./taskReducer";

export const rootReducer = combineReducers({
  day: dayReducer,
  calendar: calendarReducer,
  task: taskReducer
})

export type TRootState = ReturnType<typeof rootReducer>