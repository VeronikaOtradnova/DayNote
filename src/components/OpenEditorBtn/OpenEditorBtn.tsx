import styles from './OpenEditorBtn.module.css';

interface IProps {
  isEditorOpen: boolean,
  setEditorOpen: (value: boolean) => void,
}

export const OpenEditorBtn = ({isEditorOpen, setEditorOpen}: IProps) => {
  return (
    <button className={styles.btn} onClick={() => setEditorOpen(!isEditorOpen)} data-testid="open-editor-btn">
      {
        isEditorOpen ?
        'Отменить редактирование' :
        'Изменить цвет'
      }
    </button>
  )
}