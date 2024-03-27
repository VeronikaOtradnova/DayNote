import { FormEvent, useState } from 'react';
import styles from './NewTaskForm.module.css';
import { Btn, btnAngleTypes, btnTypes } from '../../generic/Btn/Btn';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { ITask } from '../../../types/task';
import { generateString } from '../../../helpers/generateString';
import { colors } from '../../../types/color';

export function NewTaskForm() {
  const {currentDay, days} = useTypedSelector(store => store.day);
  const {addDay, editDay} = useActions();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const day = days.find(d => d.date === currentDay);
    const newTask:ITask = {
      id: generateString(),
      text: inputValue,
      done: false,
      created: Date.now(),
    }

    if (day) {
      editDay({...day, tasks: [...day.tasks, newTask]});
    } else {
      addDay({
        date: currentDay,
        color: colors.none,
        tasks: [newTask]
      })
    }
    setInputValue('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder='Создайте новую задачу!'
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        data-testid="new-task-input"
      />
      <Btn 
        type={btnTypes.submit} 
        angleType={btnAngleTypes.normal}
        testId="create-task-btn"
      >
        Создать
      </Btn>
    </form>
  )
}