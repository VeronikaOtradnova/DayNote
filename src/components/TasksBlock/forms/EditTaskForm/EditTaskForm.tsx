import { FormEvent, useState } from 'react';
import { Input } from '../../../generic/Input/Input';
import styles from './EditTaskForm.module.css';
import { Btn, btnColors, btnTypes } from '../../../generic/buttons/Btn/Btn';
import { useActions } from '../../../../hooks/useActions';
import { ITask } from '../../../../types/task';

interface IProps {
  hideFn: () => void;
  task: ITask;
}

export function EditTaskForm({ hideFn, task }: IProps) {
  const { editTask } = useActions();

  const [inputValue, setInputValue] = useState(task.text);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    editTask({
      ...task,
      selected: false,
      text: inputValue
    })

    hideFn();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        inputValue={inputValue}
        setInputValue={setInputValue}
        placeHolder=''
        testId='edit-task-input'
      />

      <Btn
        color={btnColors.gray}
        type={btnTypes.submit}
        testId="create-task-btn"
        style={{marginTop: '10px', alignSelf: 'flex-end'}}
      >
        Изменить
      </Btn>
    </form>
  )
}