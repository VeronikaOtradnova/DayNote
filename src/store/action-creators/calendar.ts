import { ICloseCalendarAction, IOpenCalendarAction, ISetCalendarDateAction, calendarActionTypes } from "../../types/calendar"

export const openCalendar = ():IOpenCalendarAction => {
  return {
    type: calendarActionTypes.OPEN_CALENDAR,
  }
}

export const closeCalendar = ():ICloseCalendarAction => {
  return {
    type: calendarActionTypes.CLOSE_CALENDAR,
  }
}

export const setCalendarDate = (dateInMs: number):ISetCalendarDateAction => {
  return {
    type: calendarActionTypes.SET_CALENDAR_DATE,
    payload: dateInMs,
  }
}