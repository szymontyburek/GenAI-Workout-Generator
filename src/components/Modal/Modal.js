import { useState, useEffect } from "react";
import Button from "../Button";

function Modal({ clickEvent, ModalContents, ModalContentsData, ddlData }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("overlay");

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
        />
      </div>
      <OverlayDiv exitModal={exitModal} className={sharedOverlayClass} />
    </div>
  );
}

function OverlayDiv({ className, exitModal }) {
  return <div onClick={exitModal} className={className}></div>;
}

export default Modal;
