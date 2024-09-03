import { FormEvent, useState } from 'react';
import styles from './NewTaskForm.module.css';
import { Btn, btnAngleTypes, btnTypes } from '../../../generic/buttons/Btn/Btn';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { ITask } from '../../../../types/task';
import { generateString } from '../../../../helpers/generateString';
import { colors } from '../../../../types/color';
import { Input } from '../../../generic/Input/Input';

interface IProps {
  hideForm: () => void,
}

export function NewTaskForm({hideForm}: IProps) {
  const {currentDay, days} = useTypedSelector(store => store.day);
  const {addDay, editDay, addTask} = useActions();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const day = days.find(d => d.date === currentDay);
    const newTask:ITask = {
      id: generateString(),
      text: inputValue,
      done: false,
      created: Date.now(),
      day: currentDay,
      selected: false,
    }

    if (day) {
      addTask(newTask);
    } else {
      addDay({
        date: currentDay,
        color: colors.none,
      });
      addTask(newTask);
    }
    hideForm();
    setInputValue('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-testid="new-task-form">
      <Input 
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeHolder='Создайте новую задачу!'
        testId='new-task-input'
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