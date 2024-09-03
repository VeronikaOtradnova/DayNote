import { useEffect, useState } from "react";
import { EditBtn } from "../../../generic/buttons/EditBtn/EditBtn"
import { Modal, modalSizes } from "../../../generic/modals/Modal/Modal";
import { EditEventForm } from "../../forms/EditEventForm/EditEventForm";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { useCurrentDayData } from "../../../../hooks/useCurrentDayData";
import { useActions } from "../../../../hooks/useActions";

export function EditEventBtn() {
  const { currentDay } = useTypedSelector(store => store.day);
  const { color } = useCurrentDayData();
  const {editEvent} = useActions();
  const { events } = useTypedSelector(store => store.event);
  const selectedEvent = events
    .find(e => e.selected && e.day === currentDay);

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
        testId='edit-event-btn'
      />
      {
        (isModalOpen && selectedEvent) &&
        <Modal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          size={modalSizes.modalMedium}
          useCloseBtn={true}
          color={color}
          testId='edit-event-modal'
          onClose={() => {
            if (selectedEvent) {
              console.log('халоу');
              editEvent({
                ...selectedEvent,
                selected: false,
              })
            }
          }}
        >
          <EditEventForm 
            event={selectedEvent}
            hideFn={() => setModalVisible(false)}
          />
        </Modal>
      }
    </>
  )
}