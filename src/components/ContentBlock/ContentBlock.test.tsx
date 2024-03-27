import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { ContentBlock } from "./ContentBlock";
import { TRootState } from "../../store/redusers";
import { colors } from "../../types/color";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const stateWithCurrentColor: TRootState = {
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.green,
    }],
  },
  calendar: {
    isCalendarOpen: false,
    calendarDate: +(new Date(2020, 0, 1)),
  },
  task: {
    tasks: []
  }
}

describe('TEST CONTENT-BLOCK', () => {
  test('Open-editor-btn shouls open and close set-color-list', async () => {
    const user = userEvent.setup();
    renderWithRedux(<ContentBlock />, {initialState: stateWithCurrentColor});
    
    const btn = screen.getByTestId('open-editor-btn')

    await act(async () => {
      await user.click(btn);
    })
    expect(screen.getByTestId('set-color-list')).toBeInTheDocument();

    await act(async () => {
      await user.click(btn);
    })
    expect(screen.getByTestId('open-editor-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('set-color-list')).not.toBeInTheDocument();
  })
})