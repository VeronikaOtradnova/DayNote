import styles from './Calendar.module.css';
import { getDayMs } from '../../helpers/getDayMs';
import { generateString } from '../../helpers/generateString';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useState } from 'react';
import { CalendarMonthBlock } from '../CalendarMonthBlock/CalendarMonthBlock';
import { DayInCalendar } from '../DayInCalendar/DayInCalendar';
import { SetCurrentDateBtn } from '../SetCurrentDateBtn/SetCurrentDateBtn';
import { CloseCalendarBtn } from '../CloseCalendarBtn/CloseCalendarBtn';
import { VerticalSwipeWrapper } from '../helpers/VerticalSwipeWrapper';
import { useActions } from '../../hooks/useActions';

export const Calendar = () => {
  const { currentDay } = useTypedSelector(store => store.day);
  const [month, setMonth] = useState(new Date(currentDay).getMonth());
  const [year, setYear] = useState(new Date(currentDay).getFullYear());
  const {closeCalendar} = useActions();

  const weeks = [];
  let currentWeek = [];

  let d = new Date(year, month); //объект первого дня месяца
  const weekDay = d.getDay(); //день недели первого дня месяца

  //заполняем первую неделю
  if (weekDay === 0) {
    currentWeek.push(null, null, null, null, null, null);
  } else {
    for (let i = 1; i < weekDay; i++) { //до первого дня месяца строка должна быть пустой
      currentWeek.push(null);
    }
  }

  currentWeek.push(new Date(+d)); //ставим первый день месяца на его день недели

  while (new Date(+d + getDayMs()).getMonth() === month) {
    if (d.getDay() === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    d.setDate(d.getDate() + 1);
    currentWeek.push(new Date(+d));
  };

  if (currentWeek.length) {
    weeks.push(currentWeek)
  }

  return (
    <VerticalSwipeWrapper
      onBottom={() => closeCalendar()}
    >
      <div className={styles.wrapper} data-testid="calendar">
        <header className={styles.header}>
          <CloseCalendarBtn />
          <CalendarMonthBlock month={month} setMonth={setMonth} year={year} setYear={setYear} />
        </header>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.headCell}>пн</th>
              <th className={styles.headCell}>вт</th>
              <th className={styles.headCell}>ср</th>
              <th className={styles.headCell}>чт</th>
              <th className={styles.headCell}>пт</th>
              <th className={styles.headCell}>сб</th>
              <th className={styles.headCell}>вс</th>
            </tr>
          </thead>
          <tbody>
            {
              weeks.map(week =>
                <tr key={generateString()}>
                  {
                    week.map(d => {
                      if (d) {
                        return (<DayInCalendar date={d} />)
                      } else {
                        return (<td className={styles.cell} key={generateString()}></td>)
                      }
                    })
                  }
                </tr>
              )
            }
          </tbody>
        </table>

        <SetCurrentDateBtn />
      </div>
    </VerticalSwipeWrapper>
  )
}