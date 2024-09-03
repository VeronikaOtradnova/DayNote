import { useEffect, useState } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { TrashBtn } from '../../../generic/buttons/TrashBtn/TrashBtn';
import { RemoveWarningModal } from '../../../generic/modals/RemoveWarningModal/RemoveWarningModal';

export function RemoveTasksBtn() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { currentDay, days } = useTypedSelector(store => store.day);
  const { tasks } = useTypedSelector(store => store.task);
  const { removeTasks } = useActions();
  const selectedTaskIds = tasks
    .filter(task => task.selected && task.day === currentDay)
    .map(task => task.id);

  useEffect(() => {
    if (isModalVisible) return;
    setTimeout(() => {
      setModalOpen(false)
    }, 300)
  }, [isModalVisible])

  useEffect(() => {
    if (!isModalOpen) return;

    setModalVisible(true);
  }, [isModalOpen])

  const removeBtnHandler = () => {
    const day = days.find(d => d.date === currentDay);
    if (!day) return;

    removeTasks(selectedTaskIds);
  }

  return (
    <>
      <TrashBtn
        onClick={() => setModalOpen(true)}
        testId='remove-tasks-btn'
      />
      {
        isModalOpen &&
        <RemoveWarningModal
          isWarningVisible={isModalVisible}
          setWarningVisible={setModalVisible}
          text="Удалить выбранные задачи?"
          removeBtnHandler={removeBtnHandler}
          testId="remove-tasks-modal"
          removeBtnTestId="remove-tasks-modal__remove-btn"
        />
      }
    </>
  )
}