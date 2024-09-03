import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import { ColorEditor } from "./ColorEditor";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

describe('TEST COLOR-EDITOR', () => {
  test('Should render btn', () => {
    renderWithRedux(<ColorEditor />);

    const button = screen.getByTestId('open-editor-btn');
    expect(button).toBeInTheDocument();
  })

  test('Should open/close colors-list after click', async () => {
    const user = userEvent.setup();

    renderWithRedux(<ColorEditor />)

    const button = screen.getByTestId('open-editor-btn');

    await act(async () => {
      await user.click(button);
    })

    const list = screen.getByTestId('set-color-list');
    expect(list).toBeInTheDocument();

    await act(async () => {
      await user.click(button);
    })
    expect(list).not.toBeInTheDocument();
  })
})