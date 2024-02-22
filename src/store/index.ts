import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./redusers";
import { thunk } from "redux-thunk";

const stateFromStorage = localStorage.getItem('reduxState')
export const persistedState = stateFromStorage ? JSON.parse(stateFromStorage): {}

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;

store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})