import { ITask } from '../../../types/task';
import styles from './TaskItem.module.css';
import { SelectTaskCheckbox } from '../checkboxes/SelectTaskCheckbox/SelectTaskCheckbox';
import { DoneTaskCheckbox } from '../checkboxes/DoneTaskCheckbox/DoneTaskCheckbox';
import { useResize } from '../../../hooks/useResize';
import { useEffect, useState } from 'react';

interface IProps {
  task: ITask;
}

export function TaskItem({ task }: IProps) {
  const [textWidth, setTextWidth] = useState('');
  const {isScreenS, isScreenM, width} = useResize();

  useEffect(() => {
    //нужно вычислить ширину текста, чтобы к нему применилось свойство overflow-wrap: break-word;
    if (isScreenS) {
      setTextWidth(`${width - 170}px`);
    } else if (isScreenM) {
      const tasksBlockWidth = ((width - 80)/100)*40;
      setTextWidth(`${tasksBlockWidth - 105}px`);
    }
  }, [isScreenS])

  return (
    <li className={task.done ? `${styles.item} ${styles.done}` : styles.item}>
      <div className={styles.leftWrapper}>
        <SelectTaskCheckbox task={task} />
        <div className={styles.text} style={{width: textWidth}}>{task.text}</div>
      </div>

      <DoneTaskCheckbox task={task} />
    </li>
  )
}