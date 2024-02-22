import { IAddDayAction, IDay, IEditDayAction, ISetCurrentDayAction, dayActionTypes } from "../../types/day";

export const addDay = (day: IDay):IAddDayAction => {
  return {
    type: dayActionTypes.ADD_DAY,
    payload: day,
  }
}

export const editDay = (day: IDay):IEditDayAction => {
  return {
    type: dayActionTypes.EDIT_DAY,
    payload: day,
  }
}

export const setCurrentDay = (date: number): ISetCurrentDayAction => {
  return {
    type: dayActionTypes.SET_CURRENT_DAY,
    payload: date,
  }
}