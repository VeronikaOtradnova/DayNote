import React, { useEffect, useRef, useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import { CurrentDateBlock } from './components/CurrentDateBlock/CurrentDateBlock';
import { getTodayMs } from './helpers/getTodayMs';
import { ContentBlock } from './components/ContentBlock/ContentBlock';
import { Calendar } from './components/Calendar/Calendar';
import { createPortal } from 'react-dom';

function App() {
  const { currentDay } = useTypedSelector(store => store.day);
  const {isCalendarOpen} = useTypedSelector(store => store.calendar);
  const { setCurrentDay, closeCalendar } = useActions();
  const modalWrapperRef = useRef(null);

  useEffect(() => {
    if (!currentDay) {
      setCurrentDay(getTodayMs());
    }
  }, [currentDay])

  const wrapperCkickHandler = (e: React.MouseEvent) => {
    if (e.target == modalWrapperRef.current) {
      closeCalendar()
    }
  }

  return (
    <>
      <div className='app-container'>
        <CurrentDateBlock />
        <ContentBlock />
      </div>
      {
        isCalendarOpen && createPortal(
          <div className='modal-wrapper' ref={modalWrapperRef} onClick={wrapperCkickHandler}>
            <Calendar />
          </div>,
          document.getElementById('modal-root')!
        )
      }
    </>
  )
}

export default App;
