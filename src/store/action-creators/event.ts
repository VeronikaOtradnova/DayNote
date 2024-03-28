import { IAddEventAction, IEditEventAction, IEvent, IRemoveEventAction, eventActionTypes } from "../../types/event";

export const addEvent = (event: IEvent):IAddEventAction => ({
  type: eventActionTypes.ADD_EVENT,
  payload: event
})

export const editEvent = (event: IEvent):IEditEventAction => ({
  type: eventActionTypes.EDIT_EVENT,
  payload: event
})

export const removeEvent = (id: string):IRemoveEventAction => ({
  type: eventActionTypes.REMOVE_EVENT,
  payload: id
})