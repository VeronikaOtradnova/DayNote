import { useEffect, useState } from 'react';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { EditBtn } from '../../../generic/buttons/EditBtn/EditBtn';
import { Modal, modalSizes } from '../../../generic/modals/Modal/Modal';
import { EditTaskForm } from '../../forms/EditTaskForm/EditTaskForm';
import { useActions } from '../../../../hooks/useActions';
import { useCurrentDayData } from '../../../../hooks/useCurrentDayData';

export function EditTaskBtn() {
  const { currentDay } = useTypedSelector(store => store.day);
  const { color } = useCurrentDayData();
  const { editTask } = useActions();
  const { tasks } = useTypedSelector(store => store.task);
  const selectedTask = tasks
    .find(task => task.selected && task.day === currentDay);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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

  return (
    <>
      <EditBtn
        onClick={() => setModalOpen(true)}
        testId='edit-task-btn'
      />
      {
        (isModalOpen && selectedTask) &&
        <Modal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          size={modalSizes.modalMedium}
          color={color}
          useCloseBtn={true}
          testId='edit-task-modal'
          onClose={() => {
            if (selectedTask) {
              editTask({
                ...selectedTask,
                selected: false,
              })
            }
          }}
        >
          <EditTaskForm 
            hideFn={() => setModalVisible(false)} 
            task={selectedTask}
          />
        </Modal>
      }
    </>
  )
}