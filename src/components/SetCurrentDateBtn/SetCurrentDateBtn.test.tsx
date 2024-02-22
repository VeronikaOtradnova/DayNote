import userEvent from "@testing-library/user-event";
import { TRootState } from "../../store/redusers";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import {SetCurrentDateBtn} from './SetCurrentDateBtn';
import { screen } from "@testing-library/react";

const testInitialState: TRootState = {
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: []
  },
  calendar: {
    isCalendarOpen: true,
    calendarDate: +(new Date(2020, 0, 10)),
  }
}

describe('TEST SET-DATE-BTN', () => {
  test('Should render btn', () => {
    renderWithRedux(<SetCurrentDateBtn />, { initialState: testInitialState });

    expect(screen.getByTestId('set-date-btn')).toBeInTheDocument();
  })

  test('Should set current date after click', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<SetCurrentDateBtn />, { initialState: testInitialState });

    const btn = screen.getByTestId('set-date-btn');
    await user.click(btn);

    const state:TRootState = store.getState();
    expect(state.day.currentDay).toBe(state.calendar.calendarDate);
  })
})