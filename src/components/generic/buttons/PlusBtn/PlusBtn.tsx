import styles from './PlusBtn.module.css'

interface IProps {
  onClick: () => void,
  testId?: string
}

export function PlusBtn({onClick, testId}: IProps) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={styles.btn}
    />
  )
}