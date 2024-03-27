import { useEffect, useState } from 'react';
import { ITask } from '../../../types/task';
import styles from './TaskItem.module.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { RemoveTaskBtn } from '../RemoveTaskBtn/RemoveTaskBtn';

interface IProps {
  task: ITask;
}

export function TaskItem({ task }: IProps) {
  const [inputValue, setInputValue] = useState(task.done);
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { editTask } = useActions();

  const handleChange = () => {
    setInputValue(!inputValue);
  }

  useEffect(() => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    editTask({...task, done: inputValue})
  }, [inputValue]);

  return (
    <li className={task.done ? `${styles.item} ${styles.done}` : styles.item}>
      <span>{task.text}</span>

      <div className={styles.controlsWrapper}>
        <RemoveTaskBtn taskId={task.id} />

        <input onChange={handleChange} checked={inputValue} type="checkbox" className={styles.checkbox} id={task.id} name={task.id} />
        <label htmlFor={task.id} />
      </div>
    </li>
  )
}