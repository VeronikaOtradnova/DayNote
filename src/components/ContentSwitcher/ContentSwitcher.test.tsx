import { screen } from "@testing-library/react";
import { renderWithRedux } from "../../tests/helpers/renderWithRedux";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { ContentSwitcher } from "./ContentSwitcher";
import { ContentBlockDisplayMode } from "../ContentBlock/ContentBlock";

describe('TEST CONTENT-SWITCHER', () => {
  test('Should render content-switcher', () => {
    const user = userEvent.setup();

    // Создаем фиктивное состояние с помощью useState
    const setDisplayModeMock = jest.fn(); // мок функция для setEditorOpen
    let displayMode = ContentBlockDisplayMode.EVENT_ONLY; // начальное состояние
    
    // Заменяем setEditorOpen на функцию, которая изменяет isEditorOpen при вызове
    const setStateMock = (newState: ContentBlockDisplayMode) => {
      displayMode = newState;
      setDisplayModeMock(newState);
    };

    renderWithRedux(<ContentSwitcher displayMode={displayMode} setDisplayMode={setStateMock} />);

    const contentSwitcher = screen.getByTestId('content-switcher');
    const taskBtn = screen.getByTestId('content-switcher__task-btn');
    const eventBtn = screen.getByTestId('content-switcher__event-btn');

    expect(contentSwitcher).toBeInTheDocument();
    expect(taskBtn).toBeInTheDocument();
    expect(eventBtn).toBeInTheDocument();
  })

  test('Should change display mode after event-btn click', async () => {
    const user = userEvent.setup();

    // Создаем фиктивное состояние с помощью useState
    const setDisplayModeMock = jest.fn(); // мок функция для setEditorOpen
    let displayMode = ContentBlockDisplayMode.EVENT_ONLY; // начальное состояние
    
    // Заменяем setEditorOpen на функцию, которая изменяет isEditorOpen при вызове
    const setStateMock = (newState: ContentBlockDisplayMode) => {
      displayMode = newState;
      setDisplayModeMock(newState);
    };

    renderWithRedux(<ContentSwitcher displayMode={displayMode} setDisplayMode={setStateMock} />);

    const eventBtn = screen.getByTestId('content-switcher__event-btn');

    await act(async () => {
      await user.click(eventBtn);
    })
    expect(setDisplayModeMock).toHaveBeenCalledWith(ContentBlockDisplayMode.EVENT_ONLY);
  })

  test('Should change display mode after task-btn click', async () => {
    const user = userEvent.setup();

    // Создаем фиктивное состояние с помощью useState
    const setDisplayModeMock = jest.fn(); // мок функция для setEditorOpen
    let displayMode = ContentBlockDisplayMode.TASK_ONLY; // начальное состояние
    
    // Заменяем setEditorOpen на функцию, которая изменяет isEditorOpen при вызове
    const setStateMock = (newState: ContentBlockDisplayMode) => {
      displayMode = newState;
      setDisplayModeMock(newState);
    };

    renderWithRedux(<ContentSwitcher displayMode={displayMode} setDisplayMode={setStateMock} />);

    const taskBtn = screen.getByTestId('content-switcher__task-btn');

    await act(async () => {
      await user.click(taskBtn);
    })
    expect(setDisplayModeMock).toHaveBeenCalledWith(ContentBlockDisplayMode.TASK_ONLY);
  })
})