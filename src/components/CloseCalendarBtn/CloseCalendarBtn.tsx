import { useActions } from '../../hooks/useActions';
import styles from './CloseCalendarBtn.module.css';

export const CloseCalendarBtn = () => {
  const {closeCalendar} = useActions();
  return (
    <button onClick={() => closeCalendar()} className={styles.btn}></button>
  )
}