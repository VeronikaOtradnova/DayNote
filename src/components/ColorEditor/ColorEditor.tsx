import { useState } from 'react';
import styles from './ColorEditor.module.css';
import { OpenColorEditorBtn } from './OpenColorEditorBtn/OpenEditorBtn';
import { SetColorList } from './SetColorList/SetColorList';

export function ColorEditor() {
  const [isEditorOpen, setEditorOpen] = useState(false);

  return (
    <div className={styles.editor}>
      {isEditorOpen && <SetColorList setEditorOpen={setEditorOpen} />}
      <OpenColorEditorBtn isEditorOpen={isEditorOpen} setEditorOpen={setEditorOpen} />
    </div>
  )
}