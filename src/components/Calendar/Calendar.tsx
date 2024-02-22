import styles from './Calendar.module.css';
import { getDayMs } from '../../helpers/getDayMs';
import { generateString } from '../../helpers/generateString';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useState } from 'react';
import { CalendarMonthBlock } from '../CalendarMonthBlock/CalendarMonthBlock';
import { DayInCalendar } from '../DayInCalendar/DayInCalendar';
import { SetCurrentDateBtn } from '../SetCurrentDateBtn/SetCurrentDateBtn';
import { CloseCalendarBtn } from '../CloseCalendarBtn/CloseCalendarBtn';

export const Calendar = () => {
  const {currentDay} = useTypedSelector(store => store.day);
  const [month, setMonth] = useState(new Date(currentDay).getMonth());
  const [year, setYear] = useState(new Date(currentDay).getFullYear());

  const weeks = [];
  let currentWeek = [];

  let d = new Date(year, month); //объект первого дня месяца
  const weekDay = d.getDay(); //день месяца

  //заполняем первую неделю
  for (let i = 1; i < weekDay; i++) { //до первого дня месяца строка должна быть пустой
    currentWeek.push(null);
  }
  currentWeek.push(new Date(+d)); //ставим первый день месяца на его день недели

  while (new Date(+d + getDayMs()).getMonth() === month) {
    d.setDate(d.getDate() + 1);
    currentWeek.push(new Date(+d));

    if (d.getDay() === 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  };

  if (currentWeek.length) {
    weeks.push(currentWeek)
  }

  return (
    <div className={styles.wrapper} data-testid="calendar">
      <CloseCalendarBtn />
      <h2 className={styles.heading}>Календарь</h2>
      <CalendarMonthBlock month={month} setMonth={setMonth} year={year} setYear={setYear} />

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
  )
}