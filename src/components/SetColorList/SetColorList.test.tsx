import { render, screen } from "@testing-library/react"
import { SetColorList } from "./SetColorList"
import { colors } from "../../types/color";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";

describe('TEST SET-COLORS-LIST', () => {
  test('List should render with all colors', () => {
    renderWithRedux(<SetColorList />);
    
    const list = screen.getByTestId('set-color-list');
    expect(list).toBeInTheDocument();
    expect(list).toMatchSnapshot();

    const colorsLength = Object.keys(colors).length;
    expect(screen.getAllByTestId('set-color-item').length).toBe(colorsLength);
  })
})