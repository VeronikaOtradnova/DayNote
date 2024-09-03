import { screen } from "@testing-library/react"
import { generateString } from "../../../../helpers/generateString"
import { TRootState } from "../../../../store/redusers"
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux"
import { colors } from "../../../../types/color"
import { eventPriorities } from "../../../../types/event"
import { EventsBlock } from "../../EventsBlock"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

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

describe('EDIT-EVENT-BTN-TESTING', () => {
  test('Should render btn when one event is selected', () => {
    renderWithRedux(<EventsBlock />, {initialState: oneSelectedEventInitialState});

    expect(screen.getByTestId('edit-event-btn')).toBeInTheDocument();
    expect(screen.getByTestId('edit-event-btn')).toMatchSnapshot();
  });

  test('Should not render btn when no selected events', () => {
    renderWithRedux(<EventsBlock />, {initialState: zeroSelectedEventsInitialState});
    
    expect(screen.queryByTestId('edit-event-btn')).not.toBeInTheDocument();
  });

  test('Should not render btn when more than one events are selected', () => {
    renderWithRedux(<EventsBlock />, {initialState: twoSelectedEventsInitialState});
    
    expect(screen.queryByTestId('edit-event-btn')).not.toBeInTheDocument();
  });

  test('Should render edit-modal after clicking the btn', async () => {
    const user = userEvent.setup();

    renderWithRedux(<EventsBlock />, {initialState: oneSelectedEventInitialState});
    const btn = screen.getByTestId('edit-event-btn');

    await act(async () => {
      await user.click(btn);
    })

    expect(screen.getByTestId('edit-event-modal')).toBeInTheDocument();
  })
})