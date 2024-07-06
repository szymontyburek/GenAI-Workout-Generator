import { useState, useEffect } from "react";
import Button from "../Button";

function Modal({ clickEvent, ModalContents, ModalContentsData, ddlData }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("overlay");
  const [unselectTrigger, setUnselectTrigger] = useState(0);

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

  return (
    <div>
      <div className={sharedModalClass} id="modal">
        <ModalContents
          exitModal={exitModal}
          ModalContentsData={ModalContentsData}
          ddlData={ddlData}
          unselectTrigger={unselectTrigger}
          unselectImgs={unselectImgs}
        />
      </div>
      <OverlayDiv
        unselectImgs={unselectImgs}
        exitModal={exitModal}
        className={sharedOverlayClass}
      />
    </div>
  );
}

function OverlayDiv({ unselectImgs, className, exitModal }) {
  return (
    <div
      onClick={function () {
        exitModal();
        unselectImgs();
      }}
      className={className}
    ></div>
  );
}

export default Modal;
