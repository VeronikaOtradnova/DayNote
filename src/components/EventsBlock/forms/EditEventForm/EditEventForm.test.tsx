import { TRootState } from "../../../../store/redusers";
import { renderWithRedux, testInitialState } from "../../../../tests/helpers/renderWithRedux";
import { colors } from "../../../../types/color";
import { generateString } from "../../../../helpers/generateString";
import { eventPriorities } from "../../../../types/event";
import userEvent from "@testing-library/user-event";
import { EditEventForm } from "./EditEventForm";
import { act, screen } from "@testing-library/react";

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
    ]
  }
}

describe('EDIT-EVENT-FORM TESTING', () => {
  test('Should edit event', async () => {
    const user = userEvent.setup();

    const {store} = renderWithRedux(<EditEventForm event={oneSelectedEventInitialState.event.events[0]} hideFn={() => {}} />, {initialState: oneSelectedEventInitialState});

    const titleInput = screen.getByTestId('event-title-input');
    const descriptionInput = screen.getByTestId('event-description-input');
    const submitBtn = screen.getByTestId('edit-event-btn_submit');

    await act(async () => {
      await user.type(titleInput, ' - changed');
      await user.type(descriptionInput, ' - changed');
      await user.click(submitBtn);
    })

    const state:TRootState = store.getState();

    const changedTitle = state.event.events[0].title;
    const changedDescription = state.event.events[0].description;

    expect(changedTitle).toBe('test1 - changed');
    expect(changedDescription).toBe('test1 description - changed');
  })
})