export enum calendarActionTypes {
  OPEN_CALENDAR = 'OPEN_CALENDAR',
  CLOSE_CALENDAR = 'CLOSE_CALENDAR',
  SET_CALENDAR_DATE = 'SET_SELECTED_DATE',
}

export interface IOpenCalendarAction {
  type: calendarActionTypes.OPEN_CALENDAR,
}
export interface ICloseCalendarAction {
  type: calendarActionTypes.CLOSE_CALENDAR,
}
export interface ISetCalendarDateAction {
  type: calendarActionTypes.SET_CALENDAR_DATE,
  payload: number,
}

export type TActionType = IOpenCalendarAction | ICloseCalendarAction | ISetCalendarDateAction;

export interface ICalendarState {
  isCalendarOpen: boolean,
  calendarDate: number,
}
