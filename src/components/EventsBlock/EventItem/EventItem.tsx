import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IEvent, eventPriorities } from '../../../types/event';
import styles from './EventItem.module.css';
import { formatTime } from '../../../helpers/formatTime';
import { SelectEventCheckbox } from '../checkbox/SelectEventCheckbox/SelectEventCheckbox';
import { useResize } from '../../../hooks/useResize';

interface IProps {
  event: IEvent
}

export function EventItem({event}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [titleWidth, setTitleWidth] = useState('');

  const {currentDay} = useTypedSelector(store => store.day);
  const {width, isScreenM, isScreenS} = useResize();

  useEffect(() => {
    //нужно вычислить ширину заголовка, чтобы к нему применилось свойство overflow-wrap: break-word;
    if (isScreenM) {
      const eventsBlockWidth = ((width - 80)/100)*60;
      setTitleWidth(`${eventsBlockWidth - 135}px`);
    } else if (isScreenS) {
      setTitleWidth(`${width - 190}px`)
    }
  }, [isScreenS])

  const getPriorityClassName = (initClassName: string, priority: eventPriorities) => {
    let className = initClassName;

    switch (priority) {
      case eventPriorities.EXTRA_HIGH:
        className += ` ${styles.extraHighPriority}`;
        break;
      case eventPriorities.HIGH:
        className += ` ${styles.highPriority}`;
        break;
      case eventPriorities.LOW:
        className += ` ${styles.lowPriority}`;
        break;
      case eventPriorities.MEDIUM:
        className += ` ${styles.mediumPriority}`;
        break;
    }

    return className;
  }

  return (
    <li className={event.day + event.time > currentDay ? styles.item : `${styles.item} ${styles.itemPast}`} data-testid={`event-item`}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <SelectEventCheckbox event={event} />
        <div className={styles.time}>{formatTime(event.time)}</div>
        <div 
          className={getPriorityClassName(styles.title, event.priority)}
          style={{width: titleWidth}}
        >
          {event.title}
        </div>
      </div>

      <div className={`${styles.body} ${isOpen ? styles.bodyOpen : ''}`}>
        <div className={styles.bodyContent}>
          <div className={styles.description}>
            {event.description}
          </div>

          <div className={styles.controlsWrapper}>
            <div style={{width: '10px'}} />
          </div>
        </div>
      </div>
    </li>
  )
}