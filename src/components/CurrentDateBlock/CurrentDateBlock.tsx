import { getDayMs } from '../../helpers/getDayMs';
import { getTodayMs } from '../../helpers/getTodayMs';
import { useActions } from '../../hooks/useActions';
import { useCurrentDayData } from '../../hooks/useCurrentDayData';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './CurrentDateBlock.module.css';

export const CurrentDateBlock = () => {
  const { currentDay } = useTypedSelector(store => store.day);
  const {setCurrentDay, openCalendar} = useActions();
  const {color} = useCurrentDayData();

  if (!currentDay) return null;

  const day = new Date(currentDay).getDate();
  const numberMonth = new Date(currentDay).getMonth();
  let month;
  switch (numberMonth) {
    case 0:
      month = 'января';
      break;
    case 1:
      month = 'февраля';
      break;
    case 2:
      month = 'марта';
      break;
    case 3:
      month = 'апреля';
      break;
    case 4:
      month = 'мая';
      break;
    case 5:
      month = 'июня';
      break;
    case 6:
      month = 'июля';
      break;
    case 7:
      month = 'августа';
      break;
    case 8:
      month = 'сентября';
      break;
    case 9:
      month = 'октября';
      break;
    case 10:
      month = 'ноября';
      break;
    case 11:
      month = 'декабря';
      break;
  }

  const prevBtnHandler = () => {
    setCurrentDay(currentDay - getDayMs());
  }

  const nextBtnHandler = () => {
    setCurrentDay(currentDay + getDayMs());
  }

  return (
    <div className={styles.wrapper} data-testid="date-block">
      <button 
        onClick={prevBtnHandler} 
        className={`${styles.btn} ${styles.prevDateBtn} ${color ? styles[color] : styles.noColor}`} 
        data-testid="prev-btn" 
      />

      <div className={`${styles.date} ${color ? styles[color] : styles.noColor}`} onClick={() => openCalendar()} data-testid="date-elem">
        <div className={styles.calendarIcon} />
        <div className={styles.dateText}>{`${day} ${month}`}</div>
      </div>
      {
        currentDay === getTodayMs() ?
        <button 
          disabled 
          className={`${styles.btn} ${styles.nextDateBtn} ${color ? styles[color] : styles.noColor} disabled-btn`} 
          data-testid="disabled-next-btn" 
        /> 
        :
        <button 
          onClick={nextBtnHandler} 
          className={`${styles.btn} ${styles.nextDateBtn} ${color ? styles[color] : styles.noColor}`} 
          data-testid="next-btn" 
        />
      }
    </div>
  )
}