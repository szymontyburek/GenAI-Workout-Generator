import { useState, useEffect } from "react";
import Button from "./Button";

function Modal({ clickEvent, ModalContents, ModalContentsData, ddlData }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("modal");

  useEffect(() => {
    if (clickEvent > 0) openModal(); //clickEvent equals 0 on initial HTML render
  }, [clickEvent]);

  function openModal() {
    setSharedModalClass("modal active");
    setSharedOverlayClass("modal active");
  }

  function exitModal() {
    setSharedModalClass("modal");
    setSharedOverlayClass("modal");
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
      <OverlayDiv className={sharedOverlayClass} />
    </div>
  );
}

function OverlayDiv({ sharedOverlayClass }) {
  return <div className={sharedOverlayClass} id="overlay"></div>;
}

export default Modal;
