import { colors } from '../../../types/color';
import { SetColorItem } from '../SetColorItem/SetColorItem';
import styles from './SetColorList.module.css';

interface IProps {
  setEditorOpen?: (value: boolean) => void;
}

export const SetColorList = ({setEditorOpen}: IProps) => {
  return (
    <ul className={styles.list} data-testid="set-color-list">
      <SetColorItem setEditorOpen={setEditorOpen} key={colors.green} color={colors.green} />
      <SetColorItem setEditorOpen={setEditorOpen} key={colors.pink} color={colors.pink} />
      <SetColorItem setEditorOpen={setEditorOpen} key={colors.blue} color={colors.blue} />
      <SetColorItem setEditorOpen={setEditorOpen} key={colors.gray} color={colors.gray} />
    </ul>
  )
}