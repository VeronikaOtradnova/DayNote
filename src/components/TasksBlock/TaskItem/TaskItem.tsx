import { ITask } from '../../../types/task';
import styles from './TaskItem.module.css';
import { SelectTaskCheckbox } from '../checkboxes/SelectTaskCheckbox/SelectTaskCheckbox';
import { DoneTaskCheckbox } from '../checkboxes/DoneTaskCheckbox/DoneTaskCheckbox';

interface IProps {
  task: ITask;
}

export function TaskItem({ task }: IProps) {
  return (
    <li className={task.done ? `${styles.item} ${styles.done}` : styles.item}>
      <div className={styles.leftWrapper}>
        <SelectTaskCheckbox task={task} />
        <span className={styles.text}>{task.text}</span>
      </div>

      <DoneTaskCheckbox task={task} />
    </li>
  )
}