import styles from './TasksBlock.module.css';
import { NewTaskForm } from './forms/NewTaskForm/NewTaskForm';
import { TaskItem } from './TaskItem/TaskItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useState } from 'react';
import { useCloseOnClickOutside } from '../../hooks/useCloseOnClickOutside';
import { PlusBtn } from '../generic/buttons/PlusBtn/PlusBtn';
import { RemoveTasksBtn } from './btns/RemoveTasksBtn/RemoveTasksBtn';
import { EditTaskBtn } from './btns/EditTaskBtn/EditTaskBtn';
import { XBtn } from '../generic/buttons/XBtn/XBtn';
import { XSquareBtn } from '../generic/buttons/XSquareBtn/XSquareBtn';

export function TasksBlock() {
  const { tasks } = useTypedSelector(store => store.task);
  const { currentDay } = useTypedSelector(store => store.day);
  const tasksList = tasks.filter(task => task.day === currentDay);
  const checkedItems = tasksList.filter(task => task.selected)
  const [isForm, setIsForm] = useState(false);

  const formRef = useCloseOnClickOutside(() => setIsForm(false));

  return (
    <div className={`block-wrapper ${styles.wrapper}`}>
      <div className='block-title-wrapper'>
        <h2 className='block-title'>Задачи</h2>

        {
          checkedItems.length === 1 &&
          <EditTaskBtn />
        }

        {checkedItems.length > 0 && <RemoveTasksBtn />}

        {
          isForm ?
            <XSquareBtn 
              onClick={() => setIsForm(false)}
              testId='tasks-block__hide-form-btn'
              bgSize={30}
            />
            :
            <PlusBtn
              onClick={() => setIsForm(!isForm)}
              testId='tasks-block__show-form-btn'
              bgSize={30}
            />
        }
      </div>

      {
        isForm &&
        <div ref={formRef}>
          <NewTaskForm
            hideForm={() => setIsForm(false)}
          />
        </div>
      }

      {
        tasksList && tasksList.length > 0 &&

        <ul className='list'>
          {
            tasks.filter(task => task.day === currentDay).sort((a, b) => a.created - b.created).map(task => <TaskItem key={task.id} task={task} />)
          }
        </ul>
      }
    </div>
  )
}