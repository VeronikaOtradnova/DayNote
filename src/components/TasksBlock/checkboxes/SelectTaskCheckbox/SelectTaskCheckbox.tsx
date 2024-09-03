import { useEffect, useState } from "react";
import { ITask } from "../../../../types/task";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useActions } from "../../../../hooks/useActions";
import { Checkbox, CheckboxShapes } from "../../../generic/Checkbox/Checkbox";

interface IProps {
  task: ITask
}

export function SelectTaskCheckbox({ task }: IProps) {
  const [value, setValue] = useState(task.selected);
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { editTask } = useActions();

  const handleChange = () => {
    setValue(!value);
  }

  useEffect(() => {
    setValue(task.selected);
  }, [task]);

  useEffect(() => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    editTask({ ...task, selected: value })
  }, [value]);

  return (
    <Checkbox
      id={task.id}
      inputValue={value}
      name={task.id}
      onChange={handleChange}
      shape={CheckboxShapes.circle}
    />
  )

}