import { useEffect, useState } from "react";
import { useActions } from "../../../../hooks/useActions";
import { TrashBtn } from "../../../generic/buttons/TrashBtn/TrashBtn"
import { RemoveWarningModal } from "../../../generic/modals/RemoveWarningModal/RemoveWarningModal";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

export function RemoveEventsBtn() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { currentDay } = useTypedSelector(store => store.day);
  const { events } = useTypedSelector(store => store.event);
  const selectedEventIds = events
    .filter(e => e.selected && e.day === currentDay)
    .map(e => e.id)
  const {removeEvents} = useActions();

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
      <TrashBtn onClick={() => setModalOpen(true)} testId="remove-events-btn" />
      {
        isModalOpen && 
        <RemoveWarningModal 
          isWarningVisible={isModalVisible} 
          setWarningVisible={setModalVisible} 
          text="Удалить выбранные события?" 
          removeBtnHandler={() => removeEvents(selectedEventIds)}
          testId="remove-events-modal"
          removeBtnTestId="remove-events-modal__remove-btn"
        />
      }
    </>
  )
}