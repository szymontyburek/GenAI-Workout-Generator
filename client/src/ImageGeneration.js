import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./modal";
import TextField from "./TextField";
import ImgContainer from "./ImgContainer";
import axios from "axios";

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

export default ImageGeneration;
