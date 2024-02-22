import { combineReducers } from "redux";
import { dayReducer } from "./dayReducer";
import { calendarReducer } from "./calendarReducer";

export const rootReducer = combineReducers({
  day: dayReducer,
  calendar: calendarReducer
})

export type TRootState = ReturnType<typeof rootReducer>