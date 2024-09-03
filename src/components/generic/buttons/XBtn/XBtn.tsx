import styles from './XBtn.module.css';

interface IProps {
  onClick: () => void,
  testId?: string,
  bgSize?: number,
}

export function XBtn({onClick, testId, bgSize}: IProps) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={styles.btn}
      style={bgSize ? {backgroundSize: `${bgSize}px ${bgSize}px`} : {}}
    />
  )
}