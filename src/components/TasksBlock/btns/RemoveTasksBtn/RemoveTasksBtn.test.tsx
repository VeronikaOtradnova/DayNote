import { act, screen } from "@testing-library/react"
import { TRootState } from "../../../../store/redusers"
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux"
import { colors } from "../../../../types/color"
import { TasksBlock } from "../../TasksBlock"
import userEvent from "@testing-library/user-event"

const zeroSelectedTaskInitialState: TRootState = {
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
      },
      {
        created: +(new Date(2020, 0, 1)),
        done: false,
        id: 'testid1',
        text: 'test task 1',
        day: +(new Date(2020, 0, 1)),
        selected: false,
      }
    ]
  }
}

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
      },
      {
        created: +(new Date(2020, 0, 1)),
        done: false,
        id: 'testid1',
        text: 'test task 1',
        day: +(new Date(2020, 0, 1)),
        selected: false,
      }
    ]
  }
}

const twoSelectedTaskInitialState: TRootState = {
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
      },
      {
        created: +(new Date(2020, 0, 1)),
        done: false,
        id: 'testid1',
        text: 'test task 1',
        day: +(new Date(2020, 0, 1)),
        selected: true,
      }
    ]
  }
}

describe('REMOVE-TASKS-BTN TESTING', () => {
  test('Should render btn when more than zero tasks are selected', () => {
    renderWithRedux(<TasksBlock />, {initialState: oneSelectedTaskInitialState});

    const btn = screen.getByTestId('remove-tasks-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  })

  test('Should not render btn when there are no selected tasks', () => {
    renderWithRedux(<TasksBlock />, {initialState: zeroSelectedTaskInitialState});

    expect(screen.queryByTestId('remove-tasks-btn')).not.toBeInTheDocument();
  })

  test('Should render warning-modal after clicking the btn', async () => {
    renderWithRedux(<TasksBlock />, {initialState: twoSelectedTaskInitialState});

    const user = userEvent.setup();
    const btn = screen.getByTestId('remove-tasks-btn');
    
    await act(async () => {
      await user.click(btn);
    })

    const removeModal = screen.getByTestId('remove-tasks-modal');
    expect(removeModal).toBeInTheDocument();
    const removeBtnInWarningModal = screen.getByTestId('remove-tasks-modal__remove-btn');
    expect(removeBtnInWarningModal).toBeInTheDocument();
  })

  test('Should remove tasks after clicking the btn and confirm in modal', async () => {
    const { store } = renderWithRedux(<TasksBlock />, {initialState: twoSelectedTaskInitialState});

    const user = userEvent.setup();
    const btn = screen.getByTestId('remove-tasks-btn');
    
    await act(async () => {
      await user.click(btn);
    })

    const removeBtnInWarningModal = screen.getByTestId('remove-tasks-modal__remove-btn');

    await act(async () => {
      await user.click(removeBtnInWarningModal);
    })

    const state:TRootState = store.getState();
    expect(state.task.tasks.length).toBe(0);
  })
})