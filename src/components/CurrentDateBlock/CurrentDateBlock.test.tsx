import { screen } from "@testing-library/react"
import { renderWithRedux, testInitialState } from "../../tests/helpers/renderWithRedux"
import { colors } from "../../types/color"
import { CurrentDateBlock } from './CurrentDateBlock'
import { TRootState } from "../../store/redusers"
import userEvent from "@testing-library/user-event"
import { getTodayMs } from "../../helpers/getTodayMs"
import { act } from "react-dom/test-utils"

const initialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 0, 1)),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  }
}

const initialStateToday: TRootState = {
  ...testInitialState,
  day: {
    currentDay: getTodayMs(),
    days: [{
      date: +(new Date(2020, 0, 1)),
      color: colors.gray,
    }]
  },
}

describe('CURRENT-DATE-BLOCK TESTING', () => {
  test('Render current date', () => {
    renderWithRedux(<CurrentDateBlock />, { initialState: initialState });

    const dateBlock = screen.getByTestId('date-block');
    expect(dateBlock).toBeInTheDocument();
    expect(dateBlock).toMatchSnapshot();

    expect(screen.getByTestId<HTMLDivElement>('date-elem')).toHaveTextContent('1 января');
  })

  test('Prev-date btn', async () => {
    const user = userEvent.setup();
    renderWithRedux(<CurrentDateBlock />, { initialState: initialState });

    const prevBtn = screen.getByTestId<HTMLButtonElement>('prev-btn');
    expect(prevBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(prevBtn);
    })

    expect(screen.getByTestId<HTMLDivElement>('date-elem')).toHaveTextContent('31 декабря');
  });

  test('Next-date btn', async () => {
    const user = userEvent.setup();
    renderWithRedux(<CurrentDateBlock />, { initialState: initialState });

    const nextBtn = screen.getByTestId<HTMLButtonElement>('next-btn');
    expect(nextBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(nextBtn);
    })
    
    expect(screen.getByTestId<HTMLDivElement>('date-elem')).toHaveTextContent('2 января');
  });

  test('Disabled next-date btn', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<CurrentDateBlock />, { initialState: initialStateToday });
    const firstState:TRootState = store.getState();

    expect(screen.queryByTestId('next-btn')).not.toBeInTheDocument();
    const disabledBtn = screen.getByTestId<HTMLButtonElement>('disabled-next-btn');
    expect(disabledBtn).toBeInTheDocument();

    await act(async () => {
      await user.click(disabledBtn);
    })
    
    const stateAfterClick:TRootState = store.getState();
    expect(firstState.day.currentDay).toBe(stateAfterClick.day.currentDay); // после клика дата в стейте не изменилась
  });

  test('Should change state.calendar.icCalendarOpen to true after click on date-elem', async () => {
    const user = userEvent.setup();
    const {store} = renderWithRedux(<CurrentDateBlock />, { initialState: initialState });

    const dateElem = screen.getByTestId('date-elem');
    
    await act(async () => {
      await user.click(dateElem);
    })

    const state:TRootState = store.getState();
    expect(state.calendar.isCalendarOpen).toBe(true);
  })
})