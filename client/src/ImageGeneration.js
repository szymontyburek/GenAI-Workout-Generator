import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextField from "./TextField";
import ImgContainer from "./ImgContainer";
import HistoryDisplay from "./HistoryDisplay";
import axios from "axios";

function ImageGeneration({ setIsLoading }) {
  const [sharedUserMessage, setSharedUserMessage] = useState("");
  const [sharedImgSrc, setSharedImgSrc] = useState("");
  const [sharedPostData, setSharedPostData] = useState("");
  const [sharedPlaceholder, setSharedPlaceholder] = useState(
    "Image description..."
  );
  const clickTrigger = useRef(0);

  async function exportText(text) {
    const params = { message: text };
    let base64;

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function getRecords(text) {
    let base64;

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/getRecords", {
        message: "banana",
      });

      if (response.data.success) {
        setSharedPostData(response.data.message);
        clickTrigger.current = clickTrigger.current + 1; //because this variable is used as an useEffect dependency in its corresponding Modal component instantiation, the modal will be opened
      } else {
        setSharedPlaceholder(response.data.message);
        setSharedUserMessage("");
      }
    } catch (error) {
      setSharedUserMessage(error);
      setSharedUserMessage("");
    } finally {
      setIsLoading(false);
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
      <ImgContainer src={sharedImgSrc} />
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
          onClick={getRecords}
          id="historyBtn"
          style={{ padding: "1em", borderRadius: "0.5em" }}
        />
        <Modal
          clickEvent={clickTrigger}
          ModalContents={HistoryDisplay}
          ModalContentsData={sharedPostData}
        />
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
