import userEvent from "@testing-library/user-event";
import { TRootState } from "../../../store/redusers";
import { renderWithRedux } from "../../../tests/helpers/renderWithRedux";
import { colors } from "../../../types/color";
import { SetColorItem } from "./SetColorItem";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";


describe('TEST SET-COLOR-ITEM', () => {
  test('Should add the day with selected color after click', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<SetColorItem color={colors.green} />);

    const item = screen.getByTestId('set-color-item');
    expect(item).toBeInTheDocument();

    await act(async () => {
      await user.click(item);
    })
    
    const state: TRootState = store.getState();
    expect(state.day.days[0].color).toBe(colors.green);
  })
})