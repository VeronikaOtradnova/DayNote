import { IEventState, eventActionTypes } from "../../types/event"

const initialState: IEventState = {
  events: []
}

export const eventReducer = (state: IEventState = initialState, action: any): IEventState => {
  switch (action.type) {
    case eventActionTypes.ADD_EVENT:
      return {...state, events: [...state.events, action.payload]};
    case eventActionTypes.EDIT_EVENT: 
      return {...state, events: [...state.events.filter(event => event.id !== action.payload.id), action.payload]};
    case eventActionTypes.REMOVE_EVENTS:
      return {...state, events: state.events.filter(event => !action.payload.includes(event.id))};
    default:
      return state;
  }
}