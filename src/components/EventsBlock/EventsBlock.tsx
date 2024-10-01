import { useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import styles from './EventsBlock.module.css';
import { PlusBtn } from '../generic/buttons/PlusBtn/PlusBtn';
import { NewEventForm } from './forms/NewEventForm/NewEventForm';
import { XBtn } from '../generic/buttons/XBtn/XBtn';
import { EventItem } from './EventItem/EventItem';
import { IEvent } from '../../types/event';
import { EditEventBtn } from './btns/EditEventBtn/EditEventBtn';
import { RemoveEventsBtn } from './btns/RemoveEventsBtn/RemoveEventsBtn';
import { XSquareBtn } from '../generic/buttons/XSquareBtn/XSquareBtn';

export function EventsBlock() {
  const {events} = useTypedSelector(store => store.event);
  const {currentDay} = useTypedSelector(store => store.day);
  const eventsList = events.filter(event => event.day === currentDay);
  const checkedItems = eventsList.filter(event => event.selected);
  const [isFormOpen, setFormOpen] = useState(false);
  
  return (
    <>
      <div className={`block-wrapper ${styles.wrapper}`}>
        <div className='block-title-wrapper'>
          <h2 className='block-title'>События</h2>

          {
            checkedItems.length === 1 && 
            <EditEventBtn />
          }

          {
            checkedItems.length > 0 && 
            <RemoveEventsBtn />
          }

          {
            isFormOpen ?
            <XSquareBtn 
              onClick={() => setFormOpen(false)}
              testId='events-block__hide-form-btn'
              bgSize={30}
            />
            :
            <PlusBtn
              onClick={() => setFormOpen(true)}
              testId='events-block__show-form-btn'
              bgSize={30}
            />
          }
        </div>

        {
          isFormOpen &&
          
            <NewEventForm
              hideForm={() => setFormOpen(false)}
            />
          
        }

        <ul className={`list ${styles.list}`}>
          {
            eventsList && eventsList.sort((a: IEvent, b: IEvent) => b.time < a.time ? 1 : -1).map(event => <EventItem event={event} key={event.id} />)
          }
        </ul>
      </div>
    </>
  )
}