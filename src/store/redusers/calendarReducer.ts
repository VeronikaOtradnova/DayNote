import { getTodayMs } from "../../helpers/getTodayMs";
import { ICalendarState, calendarActionTypes } from "../../types/calendar";

const initialState: ICalendarState = {
  isCalendarOpen: false,
  calendarDate: getTodayMs(),
}

export const calendarReducer = (state = initialState, action: any): ICalendarState => {
  switch (action.type) {
    case calendarActionTypes.OPEN_CALENDAR:
      return { ...state, isCalendarOpen: true };
    case calendarActionTypes.CLOSE_CALENDAR:
      return { ...state, isCalendarOpen: false };
    case calendarActionTypes.SET_CALENDAR_DATE:
      return { ...state, calendarDate: action.payload };
    default:
      return state;
  }
}