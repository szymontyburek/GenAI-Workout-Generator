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

  function closeModal() {
    setSharedModalClass("modal");
    setSharedOverlayClass("overlay");
    unselectImgs();
    resetDdlData([]);
  }

  return (
    <div>
      <div className={sharedModalClass} id="modal">
        <ModalContents
          closeModal={closeModal}
          ModalContentsData={ModalContentsData}
          unselectTrigger={unselectTrigger}
          unselectImgs={unselectImgs}
        />
      </div>
      <OverlayDiv closeModal={closeModal} className={sharedOverlayClass} />
    </div>
  );
}

function OverlayDiv({ closeModal, className }) {
  return <div onClick={closeModal} className={className}></div>;
}

export default Modal;
