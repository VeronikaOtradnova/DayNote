import userEvent from "@testing-library/user-event";
import { TRootState } from "../../../../store/redusers";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux";
import { colors } from "../../../../types/color";
import { TaskItem } from "../../TaskItem/TaskItem";
import { act, screen } from "@testing-library/react";

const initState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
  task: {
    tasks: [
      {
        created: +(new Date(2020, 0, 1)),
        done: false,
        id: 'testid0',
        text: 'test task 0',
        day: +(new Date(2020, 0, 1)),
        selected: false,
      }
    ]
  }
}

describe('DONE-TASK-CHECKBOX TESTING', () => {
  test('Should mark task as done and an not-done', async () => {
    const user = userEvent.setup();

    const {store} = renderWithRedux(<TaskItem task={initState.task.tasks[0]} />, {initialState: initState});

    const checkbox = screen.getByTestId('done-task-checkbox');

    expect(checkbox).toBeInTheDocument();

    await act(async () => {
      await user.click(checkbox);
    })

    const doneState:TRootState = store.getState();
    expect(doneState.task.tasks[0].done).toBe(true);

    await act(async () => {
      await user.click(checkbox);
    })

    const notDoneState:TRootState = store.getState();
    expect(notDoneState.task.tasks[0].done).toBe(false);
  })
})