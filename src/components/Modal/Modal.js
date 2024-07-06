import { useState, useEffect } from "react";
import Button from "../Button";

function Modal({ clickEvent, ModalContents, ModalContentsData, ddlData }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("overlay");
  const [unselectTrigger, setUnselectTrigger] = useState(0);
  const resetDdlData = ModalContentsData.resetDdlData;

  function unselectImgs() {
    setUnselectTrigger((unselectTrigger) => unselectTrigger + 1);
  }

  useEffect(() => {
    if (clickEvent > 0) openModal(); //clickEvent equals 0 on initial HTML render
  }, [clickEvent]);

  function openModal() {
    setSharedModalClass("modal active");
    setSharedOverlayClass("overlay active");
  }

  function exitModal() {
    setSharedModalClass("modal");
    setSharedOverlayClass("overlay");
  }

  function closeModal() {
    exitModal();
    unselectImgs();
    resetDdlData([]);
  }

  return (
    <div>
      <div className={sharedModalClass} id="modal">
        <ModalContents
          exitModal={exitModal}
          ModalContentsData={ModalContentsData}
          unselectTrigger={unselectTrigger}
          unselectImgs={unselectImgs}
        />
      </div>
      <OverlayDiv
        closeModal={closeModal}
        exitModal={exitModal}
        className={sharedOverlayClass}
      />
    </div>
  );
}

function OverlayDiv({ closeModal, className, exitModal }) {
  return <div onClick={closeModal} className={className}></div>;
}

export default Modal;
