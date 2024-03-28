export enum eventPriorities {
  EXTRA_HIGH = 'EXTRA_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export interface IEvent {
  day: number,
  time: number,
  id: string,
  title: string,
  description: string,
  priority: eventPriorities,
}

export enum eventActionTypes {
  ADD_EVENT = 'ADD_EVENT',
  EDIT_EVENT = 'EDIT_EVENT',
  REMOVE_EVENT = 'REMOVE_EVENT'
}

export interface IAddEventAction {
  type: eventActionTypes.ADD_EVENT,
  payload: IEvent,
}
export interface IEditEventAction {
  type: eventActionTypes.EDIT_EVENT,
  payload: IEvent,
}
export interface IRemoveEventAction {
  type: eventActionTypes.REMOVE_EVENT,
  payload: string,
}

export type TEventAction = IAddEventAction | IEditEventAction | IRemoveEventAction;

export interface IEventState {
  events: IEvent[]
}