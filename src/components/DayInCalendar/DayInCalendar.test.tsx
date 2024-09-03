import { screen } from "@testing-library/react";
import { TRootState } from "../../store/redusers";
import { renderWithRedux, testInitialState } from "../../tests/helpers/renderWithRedux";
import { DayInCalendar } from "./DayInCalendar";
import userEvent from "@testing-library/user-event";
import { getTodayMs } from "../../helpers/getTodayMs";
import { getDayMs } from "../../helpers/getDayMs";
import { act } from "react-dom/test-utils";

const initialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 10)),
    days: []
  },
  calendar: {
    isCalendarOpen: true,
    calendarDate: +(new Date(2020, 0, 10)),
  },
}

describe('TEST DAY IN CALENDAR', () => {
  test('Should render not selected day', () => {
    renderWithRedux(<DayInCalendar date={new Date(2020, 0, 1)} />, { initialState: initialState });

    const dayElem = screen.getByTestId('day-in-calendar');
    expect(dayElem).toBeInTheDocument();
    expect(dayElem).toHaveTextContent('1');
    expect(dayElem).toMatchSnapshot();
  })

  test('Should set calendarDate after click', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<DayInCalendar date={new Date(2020, 0, 1)} />, { initialState: testInitialState });

    const dayElem = screen.getByTestId('day-in-calendar');
    await user.click(dayElem);
    expect(dayElem).toMatchSnapshot();

    const state:TRootState = store.getState();
    expect(state.calendar.calendarDate).toBe(+new Date(2020, 0, 1));
  })

  test('Should not set calendarDate after click on future-day', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<DayInCalendar date={new Date(getTodayMs() + getDayMs())} />, { initialState: testInitialState });
    const stateBeforeClick:TRootState = store.getState();

    expect(screen.queryByTestId('day-in-calendar')).not.toBeInTheDocument();
    const dayElem = screen.getByTestId('day-in-calendar_future');
    expect(dayElem).toBeInTheDocument();

    await act(async () => {
      await user.click(dayElem);
    })

    const state:TRootState = store.getState();
    expect(state.calendar.calendarDate).toBe(stateBeforeClick.calendar.calendarDate);
  })
})