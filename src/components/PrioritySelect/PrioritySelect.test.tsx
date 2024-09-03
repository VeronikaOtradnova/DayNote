import { render, renderHook, screen, within } from "@testing-library/react";
import React, { useState } from "react";
import { eventPriorities } from "../../types/event";
import { PrioritySelect } from "./PrioritySelect";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe('PRIORITY-SELECT-TESTING', () => {
  //1. селект рендерится с заданным приоритетом
  //2. тыкаю на селект - открывается дд со всеми остальными приоритетами
  //3. тыкаю на айтем - currentPriority меняется на выбранный, дд закрыт

  test('Should render select with current priority', () => {
    const { result } = renderHook(() => useState(eventPriorities.LOW));
    const [value, setValue] = result.current;

    render(<PrioritySelect value={value} setValue={setValue} />);

    const currentValueElem = screen.getByTestId('priority-select__current-value');
    expect(currentValueElem).toBeInTheDocument;
    expect(currentValueElem).toHaveTextContent(eventPriorities.LOW);
  })

  test('Should open dropdown after click on currentValueElem', async () => {
    const { result } = renderHook(() => useState(eventPriorities.LOW));
    const [value, setValue] = result.current;
    const user = userEvent.setup();

    render(<PrioritySelect value={value} setValue={setValue} />);

    const currentValueElem = screen.getByTestId('priority-select__current-value');
    await user.click(currentValueElem);

    const dropdown = screen.getByTestId('priorities-dropdown');
    expect(dropdown).toBeInTheDocument;

    const mediumItem = within(dropdown).getByText(eventPriorities.MEDIUM)
    expect(mediumItem).toBeInTheDocument;

    const highItem = within(dropdown).getByText(eventPriorities.HIGH)
    expect(highItem).toBeInTheDocument;

    const extraHighItem = within(dropdown).getByText(eventPriorities.EXTRA_HIGH)
    expect(extraHighItem).toBeInTheDocument;
  })

  test('Should close dropdown after click on dropdownItem', async () => {
    const { result } = renderHook(() => useState(eventPriorities.LOW));
    const [value, setValue] = result.current;

    const user = userEvent.setup();

    render(<PrioritySelect value={value} setValue={setValue} />);

    const currentValueElem = screen.getByTestId('priority-select__current-value');
    await user.click(currentValueElem);

    const dropdown = screen.getByTestId('priorities-dropdown');
    const highItem = within(dropdown).getByText(eventPriorities.HIGH)
    
    await act(async () => {
      await user.click(highItem);
    });
    
    expect(dropdown).not.toBeInTheDocument;
  })
})