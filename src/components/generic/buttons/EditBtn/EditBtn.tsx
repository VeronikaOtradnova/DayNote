import styles from './EditBtn.module.css';

interface IProps {
  onClick: () => void,
  testId?: string
}

export function EditBtn({onClick, testId = ''}: IProps) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      data-testId={testId}
    />
  )
}