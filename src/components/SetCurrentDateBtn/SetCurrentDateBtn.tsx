import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './SetCurrentDateBtn.module.css';

export const SetCurrentDateBtn = () => {
  const {currentDay} = useTypedSelector(store => store.day);
  const {calendarDate} = useTypedSelector(store => store.calendar);
  const {setCurrentDay, closeCalendar} = useActions();

  const handleClick = () => {
    if (currentDay !== calendarDate) {
      setCurrentDay(calendarDate);
      closeCalendar();
    } else {
      closeCalendar();
    }
  }

  return(
    <button onClick={handleClick} className={styles.btn} data-testid="set-date-btn">
      Выбрать
    </button>
  )
}