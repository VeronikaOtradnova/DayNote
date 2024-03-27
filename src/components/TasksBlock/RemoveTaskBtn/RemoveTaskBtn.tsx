import { Interface } from 'readline';
import styles from './RemoveTaskBtn.module.css';
import { useActions } from '../../../hooks/useActions';
import { IDay } from '../../../types/day';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface IProps {
  taskId: string;
}

export function RemoveTaskBtn({taskId}: IProps) {
  const { currentDay, days } = useTypedSelector(store => store.day);
  const {editDay} = useActions();

  const btnHandler = () => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    editDay({...day, tasks: day.tasks.filter(task => task.id !== taskId)})
  }

  return (
    <button 
      onClick={btnHandler} 
      className={styles.removeBtn} 
      data-testid='remove-task-item'
    />
  )
}