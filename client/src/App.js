import "./App.css";
import Modal from "./modal";
import { useState, useEffect } from "react";
import axios from "axios";

function ParentContainer() {
  const [switchToAnimation, setSwitchToAnimation] = useState(false);
  const [styles, setStyles] = useState({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  useEffect(() => {
    //modify display property for topmost div in LoadingAnimation component dynamically
    let clone = structuredClone(styles);

    if (switchToAnimation) clone.display = "flex";
    else clone.display = "none";

    setStyles(clone);
  }, [switchToAnimation]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageGeneration setSwitchToAnimation={setSwitchToAnimation} />
      <LoadingAnimation style={styles} />
    </div>
  );
}

function ImageGeneration({ setSwitchToAnimation }) {
  const [sharedUserMessage, setSharedUserMessage] = useState("");
  const [sharedImgSrc, setSharedImgSrc] = useState("");
  const [sharedPlaceholder, setSharedPlaceholder] = useState(
    "Image description..."
  );

  async function exportText(text) {
    const params = { message: text };
    let base64;

    try {
      setSwitchToAnimation(true);
      const response = await axios.get("http://localhost:8080/generateImage", {
        params,
      });

      if (response.data.success) setSharedImgSrc(response.data.message);
      else {
        setSharedPlaceholder(response.data.message);
        setSharedUserMessage("");
      }
    } catch (error) {
      setSharedUserMessage(error);
      setSharedUserMessage("");
    } finally {
      setSwitchToAnimation(false);
    }
  }

  async function importGenerations(text) {
    let base64;

    try {
      setSwitchToAnimation(true);
      const response = await axios.post(
        "http://localhost:8080/retrieveRecords",
        { message: "banana" }
      );

      debugger;
      if (response.data.success) setSharedImgSrc(response.data.message);
      else {
        setSharedPlaceholder(response.data.message);
        setSharedUserMessage("");
      }
    } catch (error) {
      setSharedUserMessage(error);
      setSharedUserMessage("");
    } finally {
      setSwitchToAnimation(false);
    }
  }

  function downloadImage(base64) {
    var link = document.createElement("a");
    link.href = base64;
    link.download = "generatedImage.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const openModalButtons = document.querySelectorAll("#historyBtn");
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "80vw",
        height: "100vh",
      }}
    >
      <h1>Image Generator</h1>
      <ImgContainer src={sharedImgSrc} onResponse={setSharedImgSrc} />
      <TextField
        text={sharedUserMessage}
        onType={setSharedUserMessage}
        placeholder={sharedPlaceholder}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "inherit",
        }}
      >
        <Button
          text="History"
          data={sharedUserMessage}
          onClick={importGenerations}
          id="historyBtn"
        />
        <Modal />
        <Button text="Download" data={sharedImgSrc} onClick={downloadImage} />
        <Button
          text="Generate"
          data={sharedUserMessage}
          onClick={exportText}
          style={{ backgroundColor: "#ee2400 " }}
        />
      </div>
    </div>
  );
}

function LoadingAnimation({ style }) {
  return (
    <div style={style}>
      <div className="loadingWheel"></div>
    </div>
  );
}

function TextField({ text, onType, placeholder }) {
  const [nodeValue, setNodeValue] = useState("");
  const [Placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    setNodeValue(text);
  }, [text]);

  useEffect(() => {
    setPlaceholder(placeholder);
  }, [placeholder]);

  function getText(e) {
    const val = e.target.value;
    setNodeValue(val);
    onType(val); //pass data to parent
  }

  return (
    <textarea
      style={{ width: "inherit", height: "5em", margin: "1em 0" }}
      value={nodeValue}
      onChange={getText}
      placeholder={Placeholder}
    ></textarea>
  );
}

function Button({ text, data, onClick, style, id }) {
  const merged_styles = {
    ...style,
    ...{ padding: "1em", borderRadius: ".5em" },
  };
  return (
    <button
      data-modal-target="#modal"
      id={id}
      style={merged_styles}
      onClick={() => onClick(data)}
    >
      {text}
    </button>
  );
}

function ImgContainer({ src, onResponse }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div
      style={{
        width: "inherit",
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img style={{ width: "100%" }} src={src}></img>
    </div>
  );
}

export default ParentContainer;
