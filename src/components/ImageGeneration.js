import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";
import TextField from "./TextField";
import ImgContainer from "./ImgContainer";
import HistoryDisplay from "./HistoryDisplay";
import downloadImage from "../methods/downloadImage";
import axios from "axios";

function ImageGeneration({ setIsLoading }) {
  const [sharedUserMessage, setSharedUserMessage] = useState("");
  const [sharedImgData, setSharedImgData] = useState({});
  const [sharedDbData, setSharedDbData] = useState("");
  const [ddlData, setDdlData] = useState("");
  const [sharedPlaceholder, setSharedPlaceholder] = useState(
    "Image description..."
  );
  const [clickTrigger, setClickTrigger] = useState(0);

  async function getImage(text) {
    const params = { message: text };
    let base64;

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/addRecord", {
        params,
      });

      if (response.data.success) setSharedImgData(response.data.message);
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

  async function getRecords(date) {
    let base64;

    try {
      setIsLoading(true);

      let ddlDate = date;
      //if arg1 is an empty string
      if (arguments[0].length == 0) {
        const getDates = await axios.get("http://localhost:8080/getDates");
        const distinctDates = getDates.data.message;
        ddlDate = distinctDates[0];
        setDdlData(distinctDates);
      }

      const response = await axios.get("http://localhost:8080/getRecords", {
        params: { date: ddlDate },
      });

      if (response.data.success) {
        const message = response.data.message;
        setSharedDbData(message);
        setClickTrigger((clickTrigger) => clickTrigger + 1); //because this variable is used as an useEffect dependency in its corresponding Modal component instantiation, the modal will be opened
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
      <ImgContainer src={sharedImgData.base64} />
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
          ModalContentsData={{
            sharedDbData: sharedDbData,
            ddlData: ddlData,
            getRecords: getRecords,
            setIsLoading: setIsLoading,
          }}
        />
        <Button
          text="Download"
          data={[sharedImgData]}
          onClick={downloadImage}
          style={{ padding: "1em", borderRadius: "0.5em" }}
        />
        <Button
          text="Generate"
          data={sharedUserMessage}
          onClick={getImage}
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
