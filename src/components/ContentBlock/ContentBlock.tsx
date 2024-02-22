import styles from './ContentBlock.module.css';
import { SetColorList } from '../SetColorList/SetColorList';
import { useCurrentDayData } from '../../hooks/useCurrentDayData';
import { useState } from 'react';
import { OpenEditorBtn } from '../OpenEditorBtn/OpenEditorBtn';

export const ContentBlock = () => {
  const [isEditorOpen, setEditorOpen] = useState(false);
  const currentDayData = useCurrentDayData();

  return (
    <div className={styles.wrapper}>
      {
        currentDayData ?
          <>
            {
              isEditorOpen ?
              <SetColorList setEditorOpen={setEditorOpen} /> 
              :
              <p className={`${styles.colorText} ${currentDayData.color}`} data-testid="current-color">{currentDayData.color}</p>
            }

            <OpenEditorBtn isEditorOpen={isEditorOpen} setEditorOpen={setEditorOpen} />
          </>
          :
          <SetColorList />
      }
    </div>
  )
}