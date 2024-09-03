import { act, screen } from "@testing-library/react";
import { TRootState } from "../../../../store/redusers";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux";
import { colors } from "../../../../types/color";
import { TasksBlock } from "../../TasksBlock";
import userEvent from "@testing-library/user-event";

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

describe('EDIT-TASK-BTN TESTING', () => {
  test('Should render btn when one event is selected', () => {
    renderWithRedux(<TasksBlock />, {initialState: oneSelectedTaskInitialState});

    expect(screen.getByTestId('edit-task-btn')).toBeInTheDocument();
    expect(screen.getByTestId('edit-task-btn')).toMatchSnapshot();
  });

  test('Should not render btn when no selected tasks', () => {
    renderWithRedux(<TasksBlock />, {initialState: zeroSelectedTaskInitialState});
    
    expect(screen.queryByTestId('edit-task-btn')).not.toBeInTheDocument();
  });

  test('Should not render btn when more than one tasks are selected', () => {
    renderWithRedux(<TasksBlock />, {initialState: twoSelectedTaskInitialState});
    
    expect(screen.queryByTestId('edit-task-btn')).not.toBeInTheDocument();
  });

  test('Should render edit-modal after clicking the btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<TasksBlock />, {initialState: oneSelectedTaskInitialState});
    const btn = screen.getByTestId('edit-task-btn');

    await act(async () => {
      await user.click(btn);
    })

    expect(screen.getByTestId('edit-task-modal')).toBeInTheDocument();
  })
})