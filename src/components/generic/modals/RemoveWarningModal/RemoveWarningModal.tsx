import { Modal } from '../Modal/Modal';
import styles from './RemoveWarningModal.module.css';

interface IProps {
  isWarningVisible: boolean,
  setWarningVisible: (val: boolean) => void,
  text: string,
  removeBtnHandler: () => void,
  testId?: string,
  removeBtnTestId?: string,
}

export function RemoveWarningModal({isWarningVisible, setWarningVisible, text, removeBtnHandler, testId = '', removeBtnTestId = ''}: IProps) {
  return (
    <Modal
      isModalVisible={isWarningVisible}
      setModalVisible={setWarningVisible}
      testId={testId}
    >
      <header className={styles.header}>
        <div className={styles.redLine} />
        <h3 className={styles.text}>{text}</h3>
      </header>

      <div className={styles.btnsWrapper}>
        <button 
          className={`${styles.btn} ${styles.cancelBtn}`}
          onClick={() => setWarningVisible(false)}
        >Отмена</button>

        <button 
          className={`${styles.btn} ${styles.removeBtn}`}
          onClick={removeBtnHandler}
          data-testid={removeBtnTestId}
        >Удалить</button>
      </div>
    </Modal>
  )
}