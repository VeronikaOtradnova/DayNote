import { createStore } from "redux";
import { IDayState } from "../../types/day";
import { TRootState, rootReducer } from "../../store/redusers";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

interface IInitState {
  day: IDayState
}

const testInitialState: TRootState = {
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [],
  },
  calendar: {
    isCalendarOpen: false,
    calendarDate: +(new Date(2020, 0, 1)),
  }
}

export function renderWithRedux(
  ui: JSX.Element, 
  { initialState, 
    store = createStore(rootReducer, initialState) 
  }: {initialState?: {day: IDayState}; store?: any } = {initialState: testInitialState}, renderFn = render) {

  const obj: any = {
    ...renderFn(<Provider store={store}>{ui}</Provider>),
    store,
  };
  obj.rerenderWithRedux = (el: JSX.Element, nextState: TRootState) => {
    if (nextState) {
      store.replaceReducer(() => nextState);
      store.dispatch({ type: '__TEST_ACTION_REPLACE_STATE__' });
      store.replaceReducer(rootReducer);
    }
    return renderWithRedux(el, { store }, obj.rerender);
  };
  return obj;
}