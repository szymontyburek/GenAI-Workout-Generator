import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return <Container />;
}

function TextField({ text, onType }) {
  const [nodeValue, setNodeValue] = useState("");

  useEffect(() => {
    setNodeValue(text);
  }, [text]);

  function getText(e) {
    const val = e.target.value;
    setNodeValue(val);
    onType(val); //pass data to parent
  }

  return (
    <textarea
      style={{ width: "80%", height: "5em", margin: "1em 0" }}
      value={nodeValue}
      onChange={getText}
      placeholder="Image description..."
    ></textarea>
  );
}

function Submit({ data, onClick }) {
  return (
    <button
      style={{ padding: "1em", width: "80%" }}
      onClick={() => onClick(data)}
    >
      Submit
    </button>
  );
}

function ImgContainer({ src, onResponse }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div style={{ width: "80%", height: "50%", border: "1px solid black" }}>
      <img style={{ width: "100%", height: "100%" }} src={src}></img>
    </div>
  );
}

function Container() {
  const [sharedUserMessage, setSharedUserMessage] = useState("");
  const [sharedImgSrc, setSharedImgSrc] = useState("");

  const messageChange = function (newData) {
    setSharedUserMessage(newData);
  };

  const displayImage = function (src) {
    setSharedImgSrc(src);
  };

  async function exportText(text) {
    const params = { message: text };
    let base64;

    try {
      const response = await axios.get("http://localhost:8080/generateImage", {
        params,
      });
      const imageUrl = response.data.url;

      setSharedImgSrc(response.data.url);
    } catch (error) {
      setSharedUserMessage(error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1>Image Generator</h1>
      <ImgContainer src={sharedImgSrc} onResponse={displayImage} />
      <TextField text={sharedUserMessage} onType={messageChange} />{" "}
      <Submit data={sharedUserMessage} onClick={exportText} />
    </div>
  );
}

export default App;
