import { useState, useEffect } from "react";
import Button from "./button";

function Modal({ clickEvent }) {
  const [sharedModalClass, setSharedModalClass] = useState("modal");
  const [sharedOverlayClass, setSharedOverlayClass] = useState("modal");

  useEffect(() => {
    if (clickEvent.current > 0) openModal(); //clickEvent equals 0 on initial HTML render
  }, [clickEvent.current]);

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
      <ModalBody className={sharedModalClass} closeModal={closeModal} />
      <OverlayDiv className={sharedOverlayClass} />
    </div>
  );
}

function ModalBody({ className, closeModal }) {
  return (
    <div className={className} id="modal">
      <div className="modal-header">
        <Button text="&times;" className="close-button" onClick={closeModal} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="title">Prior Generations:</div>
          <select name="selectDate" id="">
            <option value="">06/17/2024</option>
            <option value="">06/16/2024</option>
          </select>
        </div>
      </div>
      <div className="modal-body">
        <img src="logo512.png" alt="" />
        <img src="logo512.png" alt="" />
        <img src="logo512.png" alt="" />
        <img src="logo512.png" alt="" />
        <img src="logo512.png" alt="" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button>Unselect</button>
          <button style={{ backgroundColor: "#ee2400" }}>Download</button>
        </div>
      </div>
    </div>
  );
}

function OverlayDiv({ sharedOverlayClass }) {
  return <div className={sharedOverlayClass} id="overlay"></div>;
}

export default Modal;
