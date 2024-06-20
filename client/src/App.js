import "./App.css";
import { useState, useEffect, useRef } from "react";
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
  const clickTrigger = useRef(0);

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

      if (response.data.success) {
        debugger;
        clickTrigger.current = clickTrigger.current + 1; //because this variable is used as an useEffect dependency in its corresponding Modal component instantiation, the modal will be opened
      } else {
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
          style={{ padding: "1em", borderRadius: "0.5em" }}
        />
        <Modal clickEvent={clickTrigger} />
        <Button
          text="Download"
          data={sharedImgSrc}
          onClick={downloadImage}
          style={{ padding: "1em", borderRadius: "0.5em" }}
        />
        <Button
          text="Generate"
          data={sharedUserMessage}
          onClick={exportText}
          style={{
            backgroundColor: "#ee2400",
            padding: "1em",
            borderRadius: "0.5em",
          }}
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

function Button({ text, data, onClick, style, id, className }) {
  return (
    <button
      id={id}
      style={style}
      onClick={() => onClick(data)}
      className={className}
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

export default ParentContainer;
