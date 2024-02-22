import { getTodayMs } from "../../helpers/getTodayMs";
import { colors } from "../../types/color";
import { IDay, IDayState, dayActionTypes } from "../../types/day";


const initialState: IDayState = {
  currentDay: getTodayMs(),
  days: []
}

export const dayReducer = (state = initialState, action: any): IDayState => {
  switch (action.type) {
    case dayActionTypes.ADD_DAY:
      return { ...state, days: [...state.days, action.payload] };
    case dayActionTypes.EDIT_DAY:
      return { ...state, days: [...state.days.filter(d => d.date !== action.payload.date), action.payload] };
    case dayActionTypes.SET_CURRENT_DAY:
      return { ...state, currentDay: action.payload };
    default:
      return state;
  }
}