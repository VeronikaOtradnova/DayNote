import { useState } from 'react';
import styles from './PrioritySelect.module.css';
import { eventPriorities } from '../../types/event';

interface IProps {
  value: eventPriorities,
  setValue: (priority: eventPriorities) => void,
  wrapperStyle?: object
}

export function PrioritySelect({value, setValue, wrapperStyle}: IProps) {
  const items = [eventPriorities.EXTRA_HIGH, eventPriorities.HIGH, eventPriorities.LOW, eventPriorities.MEDIUM]
  const [isOpen, setIsOpen] = useState(false);

  const itemHandler = (i: eventPriorities) => {
    setIsOpen(false);
    setValue(i);
  }

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
    <div className={styles.wrapper} style={{...wrapperStyle, borderRadius: '5px'}} data-testid='priority-select'>
      <div 
        className={
          isOpen ? 
          getPriorityClassName(`${styles.currentValue} ${styles.currentValueOpen}`, value) : 
          getPriorityClassName(styles.currentValue, value)
        }
        onClick={() => setIsOpen(!isOpen)}
        data-testid='priority-select__current-value'
      >
        {value}
      </div>

      {
        isOpen &&
        <div className={styles.dropdown} data-testid='priorities-dropdown'>
          {items.filter(i => i !== value).map(v => (
            <div 
              className={getPriorityClassName(styles.dropdownItem, v)} 
              onClick={() => itemHandler(v)}
              data-testid='priorities-dropdownitem'
            >{v}</div>
          ))}
        </div>
      }
    </div>
  )
}