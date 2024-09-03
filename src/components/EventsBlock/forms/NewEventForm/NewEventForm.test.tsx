import userEvent from "@testing-library/user-event"
import { TRootState } from "../../../../store/redusers"
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux"
import { colors } from "../../../../types/color"
import { EventsBlock } from "../../EventsBlock"
import { act, screen } from "@testing-library/react"
import { NewEventForm } from "./NewEventForm"

const eventsInitialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
}

describe('NEW-EVENT-FORM TESTING', () => {
  test('Should render form after clicking open-btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<EventsBlock />, {initialState: eventsInitialState});

    const openBtn = screen.getByTestId('events-block__show-form-btn');

    await act(async () => {
      await user.click(openBtn);
    })

    const form = screen.getByTestId('new-event-form');
    expect(form).toBeInTheDocument();
  })

  test('Should hide open-btn after clicking open-btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<EventsBlock />, {initialState: eventsInitialState});

    const openBtn = screen.getByTestId('events-block__show-form-btn');

    await act(async () => {
      await user.click(openBtn);
    })

    expect(openBtn).not.toBeInTheDocument();
  })

  test('Should render close-btn after clicking open-btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<EventsBlock />, {initialState: eventsInitialState});

    const openBtn = screen.getByTestId('events-block__show-form-btn');

    await act(async () => {
      await user.click(openBtn);
    })

    const closeBtn = screen.getByTestId('events-block__hide-form-btn');
    expect(closeBtn).toBeInTheDocument();
  })

  test('Should render else form-elements when event-title-input is not empty', async () => {
    const user = userEvent.setup();

    renderWithRedux(<NewEventForm hideForm={() => {}} />, {initialState: eventsInitialState});

    const titleInput = screen.getByTestId('event-title-input');
    const descriptionInput = screen.queryByTestId('event-description-input');
    const timeInput = screen.queryByTestId('event-time-input');
    const prioritySelect = screen.queryByTestId('priority-select');
    const createBtn = screen.queryByTestId('create-event-btn');

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).not.toBeInTheDocument();
    expect(timeInput).not.toBeInTheDocument();
    expect(prioritySelect).not.toBeInTheDocument();
    expect(createBtn).not.toBeInTheDocument();

    await act(async () => {
      await user.type(titleInput, 'test1');
    })

    expect(screen.getByTestId('event-description-input')).toBeInTheDocument();
    expect(screen.getByTestId('event-time-input')).toBeInTheDocument();
    expect(screen.getByTestId('priority-select')).toBeInTheDocument();
    expect(screen.getByTestId('create-event-btn')).toBeInTheDocument();
  })

  test('Should create new event', async () => {
    const user = userEvent.setup();

    const {store} = renderWithRedux(<NewEventForm hideForm={() => {}} />, {initialState: eventsInitialState});

    const titleInput = screen.getByTestId('event-title-input');

    await act(async () => {
      await user.type(titleInput, 'test1');
    })

    const descriptionInput = screen.getByTestId('event-description-input');
    const createBtn = screen.getByTestId('create-event-btn');

    await act(async () => {
      await user.type(descriptionInput, 'test111');
      await user.click(createBtn);
    })

    const state:TRootState = store.getState();
    expect(state.event.events.length).toBe(1);
  })
})