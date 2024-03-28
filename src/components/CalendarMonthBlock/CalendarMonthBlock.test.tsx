import { useState } from "react";
import { TRootState } from "../../store/redusers"
import { renderWithRedux, testInitialState } from "../../tests/helpers/renderWithRedux";
import { CalendarMonthBlock } from "./CalendarMonthBlock";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const initialState: TRootState = {
  ...testInitialState,
  day: {
    currentDay: +(new Date(2020, 11, 1)),
    days: []
  },
  calendar: {
    isCalendarOpen: true,
    calendarDate: +(new Date(2020, 11, 1)),
  },
}

interface IParentProps {
  startMonth: number;
  startYear: number;
}

const MonthBlockInParent = ({startMonth, startYear}: IParentProps) => {
  const [month, setMonth] = useState(startMonth);
  const [year, setYear] = useState(startYear);

  return (
    <CalendarMonthBlock month={month} setMonth={setMonth} year={year} setYear={setYear}  />
  )
}

describe('TEST MONTH-BLOCK', () => {
  test('Should render current month', () => {
    renderWithRedux(<MonthBlockInParent startMonth={0} startYear={2021} />, { initialState: initialState });

    expect(screen.getByTestId('month-block__text')).toBeInTheDocument();
    expect(screen.getByTestId('month-block__text')).toHaveTextContent('Январь');
  })

  test('Should render prev month aftex click on prev-btn', async () => {
    const user = userEvent.setup();
    renderWithRedux(<MonthBlockInParent startMonth={0} startYear={2021} />, { initialState: initialState });

    const prevBtn = screen.getByTestId('prev-month-btn');
    expect(prevBtn).toBeInTheDocument();

    await user.click(prevBtn);
    expect(screen.getByTestId('month-block__text')).toHaveTextContent('Декабрь');
  });

  test('Should render next month aftex click on next-btn', async () => {
    const user = userEvent.setup();
    renderWithRedux(<MonthBlockInParent startMonth={0} startYear={2021} />, { initialState: initialState });

    const nextBtn = screen.getByTestId('next-month-btn');
    expect(nextBtn).toBeInTheDocument();

    await user.click(nextBtn);
    expect(screen.getByTestId('month-block__text')).toHaveTextContent('Февраль');
  })

  test('Should render disabled next-btn when currentMonth === calendarMonth', async () => {
    const user = userEvent.setup();
    renderWithRedux(<MonthBlockInParent startMonth={11} startYear={2020} />, { initialState: initialState });
    
    expect(screen.queryByTestId('next-month-btn')).not.toBeInTheDocument();
    expect(screen.getByTestId('next-month-btn_disabled')).toBeInTheDocument();
  })
})

