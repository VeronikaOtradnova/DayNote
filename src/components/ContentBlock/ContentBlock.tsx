import styles from './ContentBlock.module.css';
import { TasksBlock } from '../TasksBlock/TasksBlock';
import { ColorEditor } from '../ColorEditor/ColorEditor';
import { EventsBlock } from '../EventsBlock/EventsBlock';
import { useEffect, useState } from 'react';
import { useResize } from '../../hooks/useResize';
import { ContentSwitcher } from '../ContentSwitcher/ContentSwitcher';

export enum ContentBlockDisplayMode {
  TASK_ONLY = 'TASK_ONLY',
  EVENT_ONLY = 'EVENT_ONLY',
  BOTH = 'BOTH'
}

export const ContentBlock = () => {
  const [displayMode, setDisplayMode] = useState<ContentBlockDisplayMode>(ContentBlockDisplayMode.BOTH);

  const {isScreenS, isScreenM, width} = useResize();

  useEffect(() => {
    if (isScreenS && displayMode === ContentBlockDisplayMode.BOTH) {
      setDisplayMode(ContentBlockDisplayMode.TASK_ONLY);
    } else if (isScreenM && displayMode !== ContentBlockDisplayMode.BOTH) {
      setDisplayMode(ContentBlockDisplayMode.BOTH);
    }
  }, [width]);

  return (
    <div className={styles.wrapper}>
      {
        isScreenS && 
        <ContentSwitcher 
          displayMode={displayMode}
          setDisplayMode={setDisplayMode}
        />
      }

      {
        (displayMode === ContentBlockDisplayMode.TASK_ONLY || displayMode === ContentBlockDisplayMode.BOTH) &&
        <TasksBlock />
      }

      {
        (displayMode === ContentBlockDisplayMode.EVENT_ONLY || displayMode === ContentBlockDisplayMode.BOTH) &&
        <EventsBlock />
      }

      <ColorEditor />
    </div>
  )
}