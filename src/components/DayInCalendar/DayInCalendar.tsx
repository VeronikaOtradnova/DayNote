import React from 'react';
import { generateString } from '../../helpers/generateString';
import { useActions } from '../../hooks/useActions';
import styles from './DayInCalendar.module.css';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { colors } from '../../types/color';
import { getTodayMs } from '../../helpers/getTodayMs';

interface IProps {
  date: Date
};

export const DayInCalendar = ({ date }: IProps) => {
  const { calendarDate } = useTypedSelector(store => store.calendar);
  const { days } = useTypedSelector(store => store.day);
  const { setCalendarDate } = useActions();

  const isDayInFuture = +date > getTodayMs() ? true : false;
  const isWeekend = (date.getDay() === 0 || date.getDay() === 6) ? true : false;
  const cellClassName = isWeekend ? `${styles.cell} ${styles.weekend}` : styles.cell;

  const isSelectedDate = +date === calendarDate;
  let color = days.find(d => d.date === +date)?.color || colors.gray;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!isSelectedDate) {
      setCalendarDate(+date);
    }
  }

  return (
    <>
      {
        isDayInFuture ?
          <td className={cellClassName} key={generateString()} data-testid='day-in-calendar_future'>
            <div className={styles.contentWrapper}>
              {date.getDate()}
            </div>
          </td>
          :
          <td onClick={handleClick} className={cellClassName} key={generateString()} data-testid='day-in-calendar'>
            <div className={isSelectedDate ? `${styles.contentWrapper} ${styles.selected} ${styles[color]}` : styles.contentWrapper}>
              <span className={`${styles.number} ${styles[color]}`}>{date.getDate()}</span>
            </div>
          </td>
      }
    </>
  )
}