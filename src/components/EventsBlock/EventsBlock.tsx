import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './EventsBlock.module.css';

export function EventsBlock() {
  const {events} = useTypedSelector(store => store.event);
  
  return (
    <div className={styles.wrapper}>

    </div>
  )
}