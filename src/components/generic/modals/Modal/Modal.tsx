import { colors, TColor } from '../../../../types/color';
import { XBtn } from '../../buttons/XBtn/XBtn';
import styles from './Modal.module.css';

export enum modalSizes {
  modalSmall = 'modalSmall',
  modalMedium = 'modalMedium',
  modalLarge = 'modalLarge',
}

interface IProps {
  isModalVisible: boolean,
  setModalVisible: (val: boolean) => void,
  children?: React.ReactNode,
  size?: modalSizes,
  useCloseBtn?: boolean,
  color?: TColor,
  testId?: string,
  onClose?: () => void
}

export function Modal({isModalVisible, setModalVisible, children, size = modalSizes.modalSmall, useCloseBtn = false, color, testId = '', onClose}: IProps) {
  const closeBtnHandler = () => {
    setModalVisible(false);
    if (onClose) {
      onClose();
    }
  }

  return (  
    <div 
      className={`${styles.wrapper} ${isModalVisible ? '' : styles.hidden}`}
      onClick={() => setModalVisible(false)}
    >
      <div 
        className={`${styles.modal} ${styles[size]} ${(!color || color === colors.none) ? 'bg-no-color' : `bg-${color}`} ${isModalVisible ? '' : styles.hidden}`}
        onClick={e => e.stopPropagation()}
        data-testid={testId}
      >
        {
          useCloseBtn && 
          <div className={styles.closeBtnWrapper}>
            <XBtn 
              onClick={closeBtnHandler} 
              bgSize={25}
            />
          </div>
        }
        {children}
      </div>
    </div>
  )
}