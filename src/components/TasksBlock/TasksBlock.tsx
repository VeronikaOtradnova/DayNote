import { useCurrentDayData } from '../../hooks/useCurrentDayData';
import styles from './TasksBlock.module.css';
import { NewTaskForm } from './NewTaskForm/NewTaskForm';
import { TaskItem } from './TasksList/TaskItem';

export function TasksBlock() {
  const currentDayData = useCurrentDayData();
  const tasksList = currentDayData?.tasks;

  return (
    <div className={styles.wrapper}>
      <NewTaskForm />

      {
        tasksList && tasksList.length > 0 &&
        
        <ul className={styles.tasksList}>
          {
            tasksList.sort((a, b) => a.created - b.created).map(task => <TaskItem key={task.id} task={task} />)
          }
        </ul>
      }
    </div>
  )
}