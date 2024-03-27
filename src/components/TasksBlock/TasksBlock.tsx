import { useCurrentDayData } from '../../hooks/useCurrentDayData';
import styles from './TasksBlock.module.css';
import { NewTaskForm } from './NewTaskForm/NewTaskForm';
import { TaskItem } from './TasksList/TaskItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export function TasksBlock() {
  const {tasks} = useTypedSelector(store => store.task);
  const {currentDay} = useTypedSelector(store => store.day)
  const currentDayData = useCurrentDayData();
  const tasksList = tasks.filter(task => task.day === currentDay);

  return (
    <div className={styles.wrapper}>
      <NewTaskForm />

      {
        tasksList && tasksList.length > 0 &&
        
        <ul className={styles.tasksList}>
          {
            tasks.filter(task => task.day === currentDay).sort((a, b) => a.created - b.created).map(task => <TaskItem key={task.id} task={task} />)
          }
        </ul>
      }
    </div>
  )
}