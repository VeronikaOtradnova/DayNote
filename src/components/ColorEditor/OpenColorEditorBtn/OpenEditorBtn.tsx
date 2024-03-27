import styles from './OpenColorEditorBtn.module.css'

interface IProps {
  isEditorOpen: boolean,
  setEditorOpen: (value: boolean) => void,
}

export const OpenColorEditorBtn = ({isEditorOpen, setEditorOpen}: IProps) => {
  return (
    <button
      onClick={() => setEditorOpen(!isEditorOpen)}
      data-testid='open-editor-btn'
      className={isEditorOpen ? `${styles.btn} ${styles.open}` : styles.btn}
    />
  )
}