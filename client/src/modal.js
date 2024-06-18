function Modal() {
  return (
    // <div class="modal" id="modal">
    //   <div class="modal-header">
    //     <button data-close-button class="close-button">&times;</button>
    //     <div
    //       style="display: flex; justify-content: center; align-items: center"
    //     >
    //       <div class="title">Prior Generations:</div>
    //       <select name="selectDate" id="">
    //         <option value="">06/17/2024</option>
    //         <option value="">06/16/2024</option>
    //       </select>
    //     </div>
    //   </div>
    //   <div class="modal-body">
    //     <img src="logo512.png" alt="" />
    //     <img src="logo512.png" alt="" />
    //     <img src="logo512.png" alt="" />
    //     <img src="logo512.png" alt="" />
    //     <img src="logo512.png" alt="" />
    //     <div
    //       style="
    //         display: flex;
    //         justify-content: space-around;
    //         align-items: center;
    //       "
    //     >
    //       <button>Cancel</button>
    //       <button style="background-color: #ee2400">Download</button>
    //     </div>
    //   </div>
    // </div>
    // <div id="overlay"></div>
    <div>
      <Button1 />
      <ModalContainer />
    </div>
  );
}

function Button1() {
  return <button data-modal-target="#modal">Open Modal</button>;
}

function Button2() {
  return (
    <button data-close-button class="close-button">
      &times;
    </button>
  );
}

function ModalContainer() {
  return <div className="modal" id="modal"></div>;
}

export default Modal;
