import { IAddEventAction, IEditEventAction, IEvent, IRemoveEventsAction, eventActionTypes } from "../../types/event";

export const addEvent = (event: IEvent):IAddEventAction => ({
  type: eventActionTypes.ADD_EVENT,
  payload: event
})

export const editEvent = (event: IEvent):IEditEventAction => ({
  type: eventActionTypes.EDIT_EVENT,
  payload: event
})

export const removeEvents = (ids: string[]):IRemoveEventsAction => ({
  type: eventActionTypes.REMOVE_EVENTS,
  payload: ids
})