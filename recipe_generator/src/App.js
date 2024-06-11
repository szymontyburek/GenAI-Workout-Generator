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

function ImgContainer() {
  return (
    <div style={{ width: "80%", height: "50%", border: "1px solid black" }}>
      <img></img>
    </div>
  );
}

function Container() {
  const [sharedUserMessage, setSharedUserMessage] = useState("");

  const dataChange = function (newData) {
    setSharedUserMessage(newData);
  };

  async function exportText(text) {
    const params = { message: text };
    let base64;

    try {
      const response = await axios.get("http://localhost:8080/generateImage", {
        params,
      });
      const imageUrl = response.data.url;

      setSharedUserMessage(response.data.url);
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
      <ImgContainer />
      <TextField text={sharedUserMessage} onType={dataChange} />{" "}
      <Submit data={sharedUserMessage} onClick={exportText} />
    </div>
  );
}

export default App;
