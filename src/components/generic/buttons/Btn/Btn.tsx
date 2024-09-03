import styles from './Btn.module.css';

export enum btnColors {
  extralightGray = 'extralightGray',
  lightGray = 'lightGray',
  gray = 'gray',
  black = 'black'
}

export enum btnTypes {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export enum btnAngleTypes {
  normal = 'angleNormal',
  rounded5 = 'angleRounded5',
  rounded20 = 'angleRounded5',
}

interface IProps {
  children?: React.ReactNode;
  color?: btnColors;
  onClick?: () => void;
  testId?: string;
  style?: any;
  type?: btnTypes;
  angleType?: btnAngleTypes;
}

export function Btn(props: IProps) {
  const {
    children, color = btnColors.lightGray, onClick, testId, style = {}, type = btnTypes.button, angleType = btnAngleTypes.rounded5
  } = props;

  return (
    <button className={`${styles.btn} ${styles[color]} ${styles[angleType]}`} onClick={onClick} data-testid={testId} style={style} type={type}>
      {children}
    </button>
  )
}