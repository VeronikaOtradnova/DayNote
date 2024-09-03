import { renderHook, screen } from "@testing-library/react";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux"
import { NewTaskForm } from "./NewTaskForm"
import { TRootState } from "../../../../store/redusers";
import userEvent from "@testing-library/user-event";
import { colors } from "../../../../types/color";
import { act } from "react-dom/test-utils";
import { useState } from "react";
import { TasksBlock } from "../../TasksBlock";

const existingDayInitialState: TRootState = {
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

describe('NEW-TASK-FORM TESTING', () => {
  test('Should open form after clicking open-btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<TasksBlock />);

    const openBtn = screen.getByTestId('tasks-block__show-form-btn');
    expect(openBtn).toBeInTheDocument();

    const form = screen.queryByTestId('new-task-form');
    expect(form).not.toBeInTheDocument();

    await act(async () => {
      await user.click(openBtn);
    })
    expect(screen.getByTestId('new-task-form')).toBeInTheDocument();
  })

  test('Should hide open-btn and render close-btn after clicking open-btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<TasksBlock />);

    const openBtn = screen.getByTestId('tasks-block__show-form-btn');

    expect(screen.queryByTestId('tasks-block__hide-form-btn')).not.toBeInTheDocument();

    await act(async () => {
      await user.click(openBtn);
    })

    const closeBtn = screen.getByTestId('tasks-block__hide-form-btn');
    expect(closeBtn).toBeInTheDocument();
    expect(openBtn).not.toBeInTheDocument();

    await act(async () => {
      await user.click(closeBtn);
    })

    expect(closeBtn).not.toBeInTheDocument();
    expect(screen.getByTestId('tasks-block__show-form-btn')).toBeInTheDocument();
  })

  test('Should render input and button', () => {
    const { result } = renderHook(() => useState(false));
    const [isForm, setIsForm] = result.current;

    renderWithRedux(<NewTaskForm hideForm={() => setIsForm(false)} />);

    const input = screen.getByTestId('new-task-input');
    expect(input).toBeInTheDocument();

    const btn = screen.getByTestId('create-task-btn');
    expect(btn).toBeInTheDocument();
  })

  test('Should create new day with new task when currentDay is not in days', async () => {
    const { result } = renderHook(() => useState(false));
    const [isForm, setIsForm] = result.current;

    const user = userEvent.setup();
    const { store } = renderWithRedux(<NewTaskForm hideForm={() => setIsForm(false)} />);

    const input = screen.getByTestId('new-task-input');
    const btn = screen.getByTestId('create-task-btn');

    await act(async () => {
      await user.type(input, 'test-task');
      await user.click(btn);
    })

    const state: TRootState = store.getState();
    const newDayInDays = state.day.days.find(day => day.date === state.day.currentDay)
    expect(!!newDayInDays).toBe(true);
    expect(state.task.tasks[0].text).toBe('test-task');
  })

  test('Should create new task in current day', async () => {
    const { result } = renderHook(() => useState(false));
    const [isForm, setIsForm] = result.current;

    const user = userEvent.setup();
    const { store } = renderWithRedux(
      <NewTaskForm hideForm={() => setIsForm(false)} />, 
      { initialState: existingDayInitialState }
    );

    const input = screen.getByTestId('new-task-input');
    const btn = screen.getByTestId('create-task-btn');

    await act(async () => {
      await user.type(input, 'test-task');
      await user.click(btn);
    })

    const state: TRootState = store.getState();
    const currentDayInDays = state.day.days.find(day => day.date === state.day.currentDay);
    expect(!!state.task.tasks.find(task => task.text === 'test-task')).toBe(true);
  })
})