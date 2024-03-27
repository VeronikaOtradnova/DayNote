import userEvent from "@testing-library/user-event"
import { TRootState } from "../../../store/redusers"
import { renderWithRedux } from "../../../tests/helpers/renderWithRedux"
import { colors } from "../../../types/color"
import { TaskItem } from "../TasksList/TaskItem"
import { screen } from "@testing-library/react"

const initialState: TRootState = {
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

describe('REMOVE-TASK-BTN TESTING', () => {
  test('should render btn', () => {
    renderWithRedux(<TaskItem task={initialState.day.days[0].tasks[0]} />);
    const btn = screen.getByTestId('remove-task-item');
    expect(btn).toBeInTheDocument();
  })

  test('should remove task after click', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<TaskItem task={initialState.day.days[0].tasks[0]} />, {initialState: initialState});

    const btn = screen.getByTestId('remove-task-item');
    await user.click(btn);

    const state:TRootState = store.getState();
    const currentDayInDays = state.day.days.find(day => day.date === state.day.currentDay);
    expect(currentDayInDays?.tasks.length).toBe(0);
  })
})