import userEvent from "@testing-library/user-event";
import { TRootState } from "../../../../store/redusers";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux";
import { colors } from "../../../../types/color";
import { EditTaskForm } from "./EditTaskForm";
import { act, screen } from "@testing-library/react";

const oneSelectedTaskInitialState: TRootState = {
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
        selected: true,
      }
    ]
  }
}

describe('EDIT-TASK-FORM TESTING', () => {
  test('Should edit task', async () => {
    const user = userEvent.setup();

    const {store} = renderWithRedux(
      <EditTaskForm hideFn={() => {}} task={oneSelectedTaskInitialState.task.tasks[0]} />, 
      {initialState: oneSelectedTaskInitialState}
    )

    const input = screen.getByTestId('edit-task-input');
    const submitBtn = screen.getByTestId('create-task-btn');

    await act(async () => {
      await user.type(input, ' - edited');
      await user.click(submitBtn);
    })

    const state:TRootState = store.getState();
    expect(state.task.tasks[0].text).toBe('test task 0 - edited');
  })
})