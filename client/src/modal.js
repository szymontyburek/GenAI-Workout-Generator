function Modal() {
  return (
    <div>
      <Button1 />
      <ModalBody />
    </div>
  );
}

function Button1() {
  return <button data-modal-target="#modal">Open Modal</button>;
}

function Button2() {
  return (
    <button data-close-button className="close-button">
      &times;
    </button>
  );
}

function ModalBody() {
  return (
    <div className="modal" id="modal">
      <div className="modal-header">
        <Button2 />
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

export default Modal;
