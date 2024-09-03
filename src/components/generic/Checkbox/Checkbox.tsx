import styles from './Checkbox.module.css';

export enum CheckboxColors {
  gray = 'gray',
  green = 'green'
}

export enum CheckboxShapes {
  circle = 'circle',
  square = 'square',
}

interface IProps {
  onChange: () => void;
  inputValue: boolean;
  id: string;
  name: string,
  color?: CheckboxColors,
  shape?: CheckboxShapes,
  testId?: string,
}

export function Checkbox({ onChange, inputValue, id, name, color = CheckboxColors.gray, shape = CheckboxShapes.square, testId = '' }: IProps) {
  return (
    <>
      <input
        onChange={onChange}
        checked={inputValue}
        type="checkbox"
        className={`${styles.checkbox} ${styles[color]} ${styles[shape]}`}
        id={id}
        name={name}
        data-testid={testId}
      />
      <label htmlFor={id} />
    </>
  )
}