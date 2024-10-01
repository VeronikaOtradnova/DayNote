import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './CalendarMonthBlock.module.css';

interface IProps {
  month: number,
  setMonth: (m: number) => void,
  year: number,
  setYear: (m: number) => void,
}

export const CalendarMonthBlock = ({ month, setMonth, year, setYear }: IProps) => {
  const {currentDay} = useTypedSelector(store => store.day);
  if (!currentDay) return null;
  const currentMonth = new Date(currentDay).getMonth();

  let monthName;
  switch (month) {
    case 0:
      monthName = 'Январь';
      break;
    case 1:
      monthName = 'Февраль';
      break;
    case 2:
      monthName = 'Март';
      break;
    case 3:
      monthName = 'Апрель';
      break;
    case 4:
      monthName = 'Май';
      break;
    case 5:
      monthName = 'Июнь';
      break;
    case 6:
      monthName = 'Июль';
      break;
    case 7:
      monthName = 'Август';
      break;
    case 8:
      monthName = 'Сентябрь';
      break;
    case 9:
      monthName = 'Октябрь';
      break;
    case 10:
      monthName = 'Ноябрь';
      break;
    case 11:
      monthName = 'Декабрь';
      break;
  }

  const prevMonthBtnHandler = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else if (month > 0 && month < 12) {
      setMonth(month - 1);
    }
  }

  const nextMonthHandler = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else if ( month > -1 && month < 11) {
      setMonth(month + 1);
    }
  }

  return (
    <div className={styles.wrapper} data-testid="month-block">
      <button onClick={prevMonthBtnHandler} className={`${styles.btn} ${styles.prevBtn}`} data-testid="prev-month-btn" />

      <div className={styles.monthText} data-testid="month-block__text">{monthName}</div>

      <button onClick={nextMonthHandler} className={`${styles.btn} ${styles.nextBtn}`} data-testid="next-month-btn" />
    </div>
  )
}
