import { TColor } from "./color";

export interface IDay {
  date: number,
  color: TColor,
}

export enum dayActionTypes {
  ADD_DAY = 'ADD_DAY',
  EDIT_DAY = 'EDIT_DAY',
  SET_CURRENT_DAY = 'SET_CURRENT_DAY'
}

export interface IAddDayAction {
  type: dayActionTypes.ADD_DAY,
  payload: IDay,
}
export interface IEditDayAction {
  type: dayActionTypes.EDIT_DAY,
  payload: IDay,
}
export interface ISetCurrentDayAction {
  type: dayActionTypes.SET_CURRENT_DAY,
  payload: number,
}

export type TDayAction = IAddDayAction | IEditDayAction | ISetCurrentDayAction;

export interface IDayState {
  currentDay: number,
  days: IDay[],
}