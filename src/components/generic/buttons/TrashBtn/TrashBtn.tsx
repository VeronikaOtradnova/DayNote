import styles from './TrashBtn.module.css';

interface IProps {
  onClick: () => void,
  testId?: string
}

export function TrashBtn({onClick, testId = ''}: IProps) {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
      data-testid={testId}
    />
  )
}