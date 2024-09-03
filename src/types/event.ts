export enum eventPriorities {
  EXTRA_HIGH = 'очень высокий',
  HIGH = 'высокий',
  MEDIUM = 'средний',
  LOW = 'низкий',
}

export interface IEvent {
  id: string,
  day: number,
  time: number,
  title: string,
  description: string,
  priority: eventPriorities,
  selected: boolean,
}

export enum eventActionTypes {
  ADD_EVENT = 'ADD_EVENT',
  EDIT_EVENT = 'EDIT_EVENT',
  REMOVE_EVENTS = 'REMOVE_EVENTS'
}

export interface IAddEventAction {
  type: eventActionTypes.ADD_EVENT,
  payload: IEvent,
}
export interface IEditEventAction {
  type: eventActionTypes.EDIT_EVENT,
  payload: IEvent,
}
export interface IRemoveEventsAction {
  type: eventActionTypes.REMOVE_EVENTS,
  payload: string[],
}

export type TEventAction = IAddEventAction | IEditEventAction | IRemoveEventsAction;

export interface IEventState {
  events: IEvent[]
}