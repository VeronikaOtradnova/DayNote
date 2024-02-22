import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { ContentBlock } from "./ContentBlock";
import { TRootState } from "../../store/redusers";
import { colors } from "../../types/color";
import userEvent from "@testing-library/user-event";

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
  }
}

describe('TEST CONTENT-BLOCK', () => {
  test('Should render set-color-list when currentDay has no color', () => {
    renderWithRedux(<ContentBlock />);
    expect(screen.getByTestId('set-color-list')).toBeInTheDocument();
    expect(screen.queryByTestId('current-color')).not.toBeInTheDocument();
  })

  test('Should render current-color-text when currentDay has a color', () => {
    renderWithRedux(<ContentBlock />, {initialState: stateWithCurrentColor});
    expect(screen.getByTestId('current-color')).toBeInTheDocument();
    expect(screen.getByTestId('open-editor-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('set-color-list')).not.toBeInTheDocument();
  })

  test('Open-editor-btn shouls open and close set-color-list', async () => {
    const user = userEvent.setup();
    renderWithRedux(<ContentBlock />, {initialState: stateWithCurrentColor});
    
    const btn = screen.getByTestId('open-editor-btn')

    await user.click(btn);
    expect(screen.getByTestId('set-color-list')).toBeInTheDocument();
    expect(screen.queryByTestId('current-color')).not.toBeInTheDocument();

    await user.click(btn);
    expect(screen.getByTestId('open-editor-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('set-color-list')).not.toBeInTheDocument();
  })
})