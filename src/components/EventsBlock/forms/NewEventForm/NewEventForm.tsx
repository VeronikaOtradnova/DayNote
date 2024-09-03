import { FormEvent, useState } from 'react';
import styles from './NewEventForm.module.css';
import { IEvent, eventPriorities } from '../../../../types/event';
import { Input } from '../../../generic/Input/Input';
import { PrioritySelect } from '../../../PrioritySelect/PrioritySelect';
import { Textarea } from '../../../generic/Textarea/Textarea';
import { useCurrentDayData } from '../../../../hooks/useCurrentDayData';
import { Btn, btnColors, btnTypes } from '../../../generic/buttons/Btn/Btn';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { generateString } from '../../../../helpers/generateString';
import { colors } from '../../../../types/color';

interface IProps {
  hideForm: () => void;
}

export function NewEventForm({ hideForm }: IProps) {
  const {events} = useTypedSelector(store => store.event);
  const { color } = useCurrentDayData();
  const { currentDay, days } = useTypedSelector(store => store.day);
  const { addDay, addEvent } = useActions();
  const currDayEvents = events.filter(event => event.day === currentDay);

  const [time, setTime] = useState('12:00');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<eventPriorities>(eventPriorities.LOW);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    let timeMs = +hours * 3600000 + +minutes * 60000;

    let sameTimeEvent = currDayEvents.find(e => e.time === timeMs);

    while (sameTimeEvent) {
      timeMs += 5;
      sameTimeEvent = currDayEvents.find(e => e.time === timeMs);
    }

    const day = days.find(d => d.date === currentDay);
    const newEvent: IEvent = {
      day: currentDay,
      id: generateString(),
      title: title,
      description: description,
      priority: priority,
      time: timeMs,
      selected: false,
    }

    if (day) {
      addEvent(newEvent);
    } else {
      addDay({
        date: currentDay,
        color: colors.none,
      });
      addEvent(newEvent);
    }

    hideForm();
  }

  return (
    <form 
      className={`${styles.form} ${color ? `bg-${color}` : 'bg-no-color'}`}
      onSubmit={handleSubmit}
      data-testid="new-event-form"
    >
      <Input
        inputValue={title}
        setInputValue={setTitle}
        testId='event-title-input'
        placeHolder='Название события'
        style={{borderRadius: '5px'}}
      />

      {
        title &&
        <>
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
            testId='create-event-btn'
          >Создать</Btn>
        </>
      }
    </form>
  )
}