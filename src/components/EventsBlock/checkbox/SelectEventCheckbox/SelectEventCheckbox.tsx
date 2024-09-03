import { useEffect, useState } from 'react';
import { Checkbox, CheckboxShapes } from '../../../generic/Checkbox/Checkbox';
import { IEvent } from '../../../../types/event';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

interface IProps {
  event: IEvent
}

export function SelectEventCheckbox({event}: IProps) {
  const [value, setValue] = useState(event.selected);
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { editEvent } = useActions();

  const handleChange = () => {
    setValue(!value);
  }

  useEffect(() => {
    setValue(event.selected);
  }, [event]);

  useEffect(() => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    editEvent({ ...event, selected: value })
  }, [value]);

  return (
    <Checkbox
      id={event.id}
      inputValue={value}
      name={event.id}
      onChange={handleChange}
      shape={CheckboxShapes.circle}
    />
  )
}