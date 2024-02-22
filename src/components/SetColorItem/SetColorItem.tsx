import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { TColor, colors } from '../../types/color';
import styles from './SetColorItem.module.css';

interface IProps {
  color: TColor,
  setEditorOpen?: (value: boolean) => void;
}

export const SetColorItem = ({color, setEditorOpen}: IProps) => {
  const {currentDay, days} = useTypedSelector(store => store.day);
  const {addDay, editDay} = useActions();
  let className = `${styles.item} ${color}`;

  if (!currentDay) return null;
  
  const handleClick = () => {
    const day = days.find(d => d.date === currentDay);

    if (day) {
      editDay({...day, color: color});
      if (setEditorOpen) setEditorOpen(false);
    } else {
      addDay({
        date: currentDay,
        color: color
      })
    }
  }

  return (
    <li onClick={handleClick} className={className} data-testid="set-color-item">{color}</li>
  )
}