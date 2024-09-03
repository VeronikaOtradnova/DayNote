import { useEffect, useState } from "react";
import { ITask } from "../../../../types/task";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { Checkbox, CheckboxColors } from "../../../generic/Checkbox/Checkbox";

interface IProps {
  task: ITask
}

export function DoneTaskCheckbox({ task }: IProps) {
  const [value, setValue] = useState(task.done);
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { editTask } = useActions();

  const handleChange = () => {
    setValue(!value);
  }

  useEffect(() => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    editTask({ ...task, done: value })
  }, [value]);

  return (
    <Checkbox
      id={`${task.id}-done`}
      inputValue={value}
      name={`${task.id}-done`}
      onChange={handleChange}
      color={CheckboxColors.green}
      testId="done-task-checkbox"
    />
  )

}