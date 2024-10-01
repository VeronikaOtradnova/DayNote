import { FormEvent, useState } from 'react';
import styles from './NewTaskForm.module.css';
import { Btn, btnColors, btnTypes } from '../../../generic/buttons/Btn/Btn';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { ITask } from '../../../../types/task';
import { generateString } from '../../../../helpers/generateString';
import { colors } from '../../../../types/color';
import { Input } from '../../../generic/Input/Input';
import { useCurrentDayData } from '../../../../hooks/useCurrentDayData';

interface IProps {
  hideForm: () => void,
}

export function NewTaskForm({hideForm}: IProps) {
  const {currentDay, days} = useTypedSelector(store => store.day);
  const {addDay, addTask} = useActions();
  const [inputValue, setInputValue] = useState('');
  const { color } = useCurrentDayData();

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
    <form 
      className={`${styles.form} ${color ? `bg-${color}` : 'bg-no-color'}`}
      onSubmit={handleSubmit} 
      data-testid="new-task-form"
    >
      <Input 
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeHolder={'Название задачи'}
        testId='new-task-input'
        style={{borderRadius: '5px'}}
      />
      
      <Btn 
        type={btnTypes.submit} 
        color={btnColors.gray}
        testId="create-task-btn"
        style={{marginLeft: 'auto'}}
      >
        Создать
      </Btn>
    </form>
  )
}