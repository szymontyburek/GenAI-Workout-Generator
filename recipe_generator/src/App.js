import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return <Everything />;
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
      style={{ width: "80%", height: "5em", margin: "1em 0" }}
      value={nodeValue}
      onChange={getText}
      placeholder={Placeholder}
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

function ImageGeneration({ setSharedDisplay }) {
  const [sharedUserMessage, setSharedUserMessage] = useState("");
  const [sharedImgSrc, setSharedImgSrc] = useState("");
  const [sharedPlaceholder, setSharedPlaceholder] = useState(
    "Image description..."
  );

  async function exportText(text) {
    const params = { message: text };
    let base64;

    try {
      setSharedDisplay("flex");
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
      <ImgContainer src={sharedImgSrc} onResponse={setSharedImgSrc} />
      <TextField
        text={sharedUserMessage}
        onType={setSharedUserMessage}
        placeholder={sharedPlaceholder}
      />{" "}
      <Submit data={sharedUserMessage} onClick={exportText} />
    </div>
  );
}

function LoadingAnimation({ css_obj, sharedDisplay }) {
  const [styles, setStyles] = useState(css_obj);

  useEffect(() => {
    //modify styles for topmost div dynamically
    let clone = structuredClone(css_obj);
    clone.display = sharedDisplay;
    setStyles(clone);
  }, [sharedDisplay]);

  return (
    <div style={styles}>
      <div className="loadingWheel"></div>
      <ImgContainer src="patience.jpg" style={{ width: "80%" }} />
    </div>
  );
}

function Everything() {
  const [sharedDisplay, setSharedDisplay] = useState("none");

  return (
    <div>
      <ImageGeneration setSharedDisplay={setSharedDisplay} />
      <LoadingAnimation
        css_obj={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        sharedDisplay={sharedDisplay}
      />
    </div>
  );
}

export default App;
