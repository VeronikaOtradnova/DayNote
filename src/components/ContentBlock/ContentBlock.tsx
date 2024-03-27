import styles from './ContentBlock.module.css';
import { SetColorList } from '../ColorEditor/SetColorList/SetColorList';
import { useCurrentDayData } from '../../hooks/useCurrentDayData';
import { useState } from 'react';
import { OpenColorEditorBtn } from '../ColorEditor/OpenColorEditorBtn/OpenEditorBtn';
import { TasksBlock } from '../TasksBlock/TasksBlock';
import { ColorEditor } from '../ColorEditor/ColorEditor';

export const ContentBlock = () => {
  return (
    <div className={styles.wrapper}>
      <TasksBlock />
      <ColorEditor />
    </div>
  )
}