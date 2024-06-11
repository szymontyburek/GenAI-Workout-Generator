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

function ImgContainer({ src }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {}, imgSrc);

  return (
    <div style={{ width: "80%", height: "50%", border: "1px solid black" }}>
      <img style={{ width: "100%", height: "100%" }} src={src}></img>
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
      <ImgContainer
        src={
          "https://oaidalleapiprodscus.blob.core.windows.net/private/org-BtAaG8qWwBwmBA6DneVshTfg/user-zrSqydqbbD8ODQqADJEQofM1/img-GOk6Vci3eQmPhbXJKgWF1ZVJ.png?st=2024-06-11T17%3A15%3A47Z&se=2024-06-11T19%3A15%3A47Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-06-10T18%3A38%3A45Z&ske=2024-06-11T18%3A38%3A45Z&sks=b&skv=2023-11-03&sig=1sErq472kw19kc0c2EShCaqYCcVVg79isK/to2h2%2BVk%3D"
        }
      />
      <TextField text={sharedUserMessage} onType={dataChange} />{" "}
      <Submit data={sharedUserMessage} onClick={exportText} />
    </div>
  );
}

export default App;
