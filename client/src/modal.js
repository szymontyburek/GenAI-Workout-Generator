function Modal() {
  const openModalButtons = document.querySelectorAll("[data-modal-target]");
  const closeModalButtons = document.querySelectorAll("[data-close-button]");
  const overlay = document.getElementById("overlay");

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

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
    <Button1 />
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
