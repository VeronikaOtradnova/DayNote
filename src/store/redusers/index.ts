import { combineReducers } from "redux";
import { dayReducer } from "./dayReducer";
import { calendarReducer } from "./calendarReducer";
import { taskReducer } from "./taskReducer";
import { eventReducer } from "./eventReducer";

export const rootReducer = combineReducers({
  day: dayReducer,
  calendar: calendarReducer,
  task: taskReducer,
  event: eventReducer,
})

export type TRootState = ReturnType<typeof rootReducer>