import styles from './ContentSwitcher.module.css';
import { ContentBlockDisplayMode } from '../ContentBlock/ContentBlock';
import { Btn, btnAngleTypes, btnColors } from '../generic/buttons/Btn/Btn';

interface IProps {
  displayMode: ContentBlockDisplayMode,
  setDisplayMode: (arg: ContentBlockDisplayMode) => void
}

export function ContentSwitcher({ displayMode, setDisplayMode }: IProps) {
  return (
    <div className={styles.wrapper} data-testid='content-switcher'>
      <Btn
        children='Задачи'
        color={displayMode === ContentBlockDisplayMode.TASK_ONLY ? btnColors.black : btnColors.extralightGray}
        angleType={btnAngleTypes.rounded20}
        onClick={() => setDisplayMode(ContentBlockDisplayMode.TASK_ONLY)}
        testId='content-switcher__task-btn'
      />

      <Btn
        children='События'
        color={displayMode === ContentBlockDisplayMode.EVENT_ONLY ? btnColors.black : btnColors.extralightGray}
        style={{marginLeft: '20px'}}
        angleType={btnAngleTypes.rounded20}
        onClick={() => setDisplayMode(ContentBlockDisplayMode.EVENT_ONLY)}
        testId='content-switcher__event-btn'
      />
    </div>
  )
}