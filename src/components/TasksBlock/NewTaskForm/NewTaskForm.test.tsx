import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../../tests/helpers/renderWithRedux"
import { NewTaskForm } from "./NewTaskForm"
import { TRootState } from "../../../store/redusers";
import userEvent from "@testing-library/user-event";
import { colors } from "../../../types/color";
import { act } from "react-dom/test-utils";

const newDayInitialState: TRootState = {
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: []
  },
  calendar: {
    isCalendarOpen: false,
    calendarDate: +(new Date(2020, 0, 1)),
  }
}

const existingDayInitialState: TRootState = {
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
      tasks: [{
        created: +(new Date(2020, 0, 1)),
        done: false,
        id: 'testid0',
        text: 'test task 0'
      }]
    }]
  },
  calendar: {
    isCalendarOpen: false,
    calendarDate: +(new Date(2020, 0, 1)),
  }
}

describe('NEW-TASK-FORM TESTING', () => {
  test('Should render input and button', () => {
    renderWithRedux(<NewTaskForm />);

    const input = screen.getByTestId('new-task-input');
    expect(input).toBeInTheDocument();

    const btn = screen.getByTestId('create-task-btn');
    expect(btn).toBeInTheDocument();
  })

  test('Should create new day with new task when currentDay is not in days', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<NewTaskForm />, { initialState: newDayInitialState });

    const input = screen.getByTestId('new-task-input');
    const btn = screen.getByTestId('create-task-btn');

    await act(async () => {
      await user.type(input, 'test-task');
      await user.click(btn);
    })

    const state: TRootState = store.getState();
    const newDayInDays = state.day.days.find(day => day.date === state.day.currentDay)
    expect(!!newDayInDays).toBe(true);
    expect(newDayInDays?.tasks[0].text).toBe('test-task');
  })

  test('Should create new task in current day', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<NewTaskForm />, { initialState: existingDayInitialState });

    const input = screen.getByTestId('new-task-input');
    const btn = screen.getByTestId('create-task-btn');

    await act(async () => {
      await user.type(input, 'test-task');
      await user.click(btn);
    })

    const state: TRootState = store.getState();
    const currentDayInDays = state.day.days.find(day => day.date === state.day.currentDay);
    expect(!!currentDayInDays?.tasks.find(task => task.text === 'test-task')).toBe(true);
  })
})