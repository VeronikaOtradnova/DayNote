import { FormEvent, useState } from 'react';
import styles from './EditEventForm.module.css';
import { IEvent, eventPriorities } from '../../../../types/event';
import { Input } from '../../../generic/Input/Input';
import { PrioritySelect } from '../../../PrioritySelect/PrioritySelect';
import { Textarea } from '../../../generic/Textarea/Textarea';
import { useCurrentDayData } from '../../../../hooks/useCurrentDayData';
import { Btn, btnColors, btnTypes } from '../../../generic/buttons/Btn/Btn';
import { useActions } from '../../../../hooks/useActions';
import { formatTime } from '../../../../helpers/formatTime';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

interface IProps {
  event: IEvent,
  hideFn: () => void,
}

export function EditEventForm({ event, hideFn }: IProps) {
  const {events} = useTypedSelector(store => store.event);
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { color } = useCurrentDayData();
  const { editEvent } = useActions();
  const currDayEvents = events.filter(event => event.day === currentDay);

  const [time, setTime] = useState(formatTime(event.time));
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [priority, setPriority] = useState<eventPriorities>(event.priority);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    let timeMs = +hours * 3600000 + +minutes * 60000;

    let sameTimeEvent = currDayEvents.find(e => e.time === timeMs);

    while (sameTimeEvent) {
      timeMs += 1;
      sameTimeEvent = currDayEvents.find(e => e.time === timeMs);
    }

    const editedEvent: IEvent = {
      day: event.day,
      id: event.id,
      title: title,
      description: description,
      priority: priority,
      time: timeMs,
      selected: false
    }

    editEvent(editedEvent);
    hideFn();
  }

  return (
    <form
      className={`${styles.form} ${color ? `bg-${color}` : 'bg-no-color'}`}
      onSubmit={handleSubmit}
    >
      <Input
        inputValue={title}
        setInputValue={setTitle}
        testId='event-title-input'
        placeHolder='Название события'
        style={{borderRadius: '5px'}}
      />

      <Textarea
        value={description}
        onChange={setDescription}
        placeholder='Детали события'
        testId='event-description-input'
      />

      <Input
        inputValue={time}
        setInputValue={setTime}
        testId='event-time-input'
        type='time'
        style={{borderRadius: '5px'}}
      />

      <PrioritySelect
        value={priority}
        setValue={setPriority}
      />

      <Btn
        color={btnColors.gray}
        type={btnTypes.submit}
        testId='edit-event-btn_submit'
      >Изменить</Btn>
    </form>
  )
}