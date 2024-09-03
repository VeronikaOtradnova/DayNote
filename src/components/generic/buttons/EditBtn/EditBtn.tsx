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
<<<<<<< HEAD
      data-testid={testId}
=======
      data-testId={testId}
>>>>>>> d0cafea301ee2479e2cde0d44dc0be390630589c
    />
  )
}