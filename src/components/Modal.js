import { useState, useEffect } from "react";
import Button from "./Button";

function Modal({ clickEvent, ModalContents, ModalContentsData }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("modal");

  useEffect(() => {
    if (clickEvent > 0) openModal(); //clickEvent equals 0 on initial HTML render
  }, [clickEvent]);

  function openModal() {
    setSharedModalClass("modal active");
    setSharedOverlayClass("modal active");
  }

  function closeModal() {
    setSharedModalClass("modal");
    setSharedOverlayClass("modal");
  }

  return (
    <div>
      <ModalBodyContainer
        className={sharedModalClass}
        closeModal={closeModal}
        ModalContents={ModalContents}
        ModalContentsData={ModalContentsData}
      />
      <OverlayDiv className={sharedOverlayClass} />
    </div>
  );
}

function ModalBodyContainer({
  className,
  closeModal,
  ModalContents,
  ModalContentsData,
}) {
  return (
    <div className={className} id="modal">
      <ModalContents
        closeModal={closeModal}
        ModalContentsData={ModalContentsData}
      />
    </div>
  );
}

function OverlayDiv({ sharedOverlayClass }) {
  return <div className={sharedOverlayClass} id="overlay"></div>;
}

export default Modal;
