import styles from './Input.module.css'

interface IProps {
  placeHolder?: string,
  inputValue: string,
  setInputValue: (value: string) => void,
  testId?: string,
  style?: object,
  type?: string
}

export function Input({placeHolder = '', inputValue, setInputValue, testId, style, type = 'text'}: IProps) {
  return (
    <input
      className={styles.input}
      placeholder={placeHolder}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
      data-testid={testId}
      style={style}
      type={type}
    />
  )
}