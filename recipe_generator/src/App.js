import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Container />
    </div>
  );
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
      style={{ width: "80%", height: "300px" }}
      value={nodeValue}
      onChange={getText}
    ></textarea>
  );
}

function Submit({ data, onClick }) {
  return (
    <button
      style={{ marginTop: "1em", padding: "1em", width: "80%" }}
      onClick={() => onClick(data)}
    >
      Submit
    </button>
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
      }}
    >
      <h1>Image Generator</h1>
      <TextField text={sharedUserMessage} onType={dataChange} />{" "}
      <Submit data={sharedUserMessage} onClick={exportText} />
    </div>
  );
}

export default App;
