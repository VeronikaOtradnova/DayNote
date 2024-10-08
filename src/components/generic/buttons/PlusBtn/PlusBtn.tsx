import styles from './PlusBtn.module.css'

interface IProps {
  onClick: () => void,
  testId?: string,
  bgSize?: number
}

export function PlusBtn({onClick, testId, bgSize}: IProps) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={styles.btn}
      style={bgSize ? {backgroundSize: `${bgSize}px ${bgSize}px`} : {}}
    />
  )
}