import { screen } from "@testing-library/react";
import { generateString } from "../../../../helpers/generateString";
import { TRootState } from "../../../../store/redusers";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux";
import { colors } from "../../../../types/color";
import { eventPriorities } from "../../../../types/event";
import { EventsBlock } from "../../EventsBlock";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const oneSelectedEventInitialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
  event: {
    events: [
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test1 description',
        id: generateString(),
        priority: eventPriorities.LOW,
        selected: true,
        time: 12 * 3600000 + 0 * 60000,
        title: 'test1'
      },
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test2 description',
        id: generateString(),
        priority: eventPriorities.MEDIUM,
        selected: false,
        time: 14 * 3600000 + 30 * 60000,
        title: 'test2'
      }
    ]
  }
}

const twoSelectedEventsInitialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
  event: {
    events: [
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test1 description',
        id: generateString(),
        priority: eventPriorities.LOW,
        selected: true,
        time: 12 * 3600000 + 0 * 60000,
        title: 'test1'
      },
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test2 description',
        id: generateString(),
        priority: eventPriorities.MEDIUM,
        selected: true,
        time: 14 * 3600000 + 30 * 60000,
        title: 'test2'
      }
    ]
  }
}

const zeroSelectedEventsInitialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
  event: {
    events: [
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test1 description',
        id: generateString(),
        priority: eventPriorities.LOW,
        selected: false,
        time: 12 * 3600000 + 0 * 60000,
        title: 'test1'
      },
      {
        day: +(new Date(2020, 0, 1)),
        description: 'test2 description',
        id: generateString(),
        priority: eventPriorities.MEDIUM,
        selected: false,
        time: 14 * 3600000 + 30 * 60000,
        title: 'test2'
      }
    ]
  }
}

describe('REMOVE-EVENTS-BTN TESTING', () => {
  test('Should render btn when more than zero events are selected', () => {
    renderWithRedux(<EventsBlock />, {initialState: oneSelectedEventInitialState});

    const btn = screen.getByTestId('remove-events-btn');
    expect(btn).toBeInTheDocument();
    expect(btn).toMatchSnapshot();
  })

  test('Should not render btn when there are no selected events', () => {
    renderWithRedux(<EventsBlock />, {initialState: zeroSelectedEventsInitialState});

    expect(screen.queryByTestId('remove-events-btn')).not.toBeInTheDocument();
  })

  test('Should render warning-modal after clicking the btn', async () => {
    renderWithRedux(<EventsBlock />, {initialState: twoSelectedEventsInitialState});

    const user = userEvent.setup();
    const btn = screen.getByTestId('remove-events-btn');
    
    await act(async () => {
      await user.click(btn);
    })

    const removeModal = screen.getByTestId('remove-events-modal');
    expect(removeModal).toBeInTheDocument();
    const removeBtnInWarningModal = screen.getByTestId('remove-events-modal__remove-btn');
    expect(removeBtnInWarningModal).toBeInTheDocument();
  })

  test('Should remove events after clicking the btn and confirm in modal', async () => {
    const { store } = renderWithRedux(<EventsBlock />, {initialState: twoSelectedEventsInitialState});

    const user = userEvent.setup();
    const btn = screen.getByTestId('remove-events-btn');
    
    await act(async () => {
      await user.click(btn);
    })

    const removeBtnInWarningModal = screen.getByTestId('remove-events-modal__remove-btn');

    await act(async () => {
      await user.click(removeBtnInWarningModal);
    })

    const state:TRootState = store.getState();
    expect(state.event.events.length).toBe(0);
  })
})