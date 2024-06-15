import "./App.css";
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
    const params = { message: "banana" };

    try {
      setSwitchToAnimation(true);
      const response = await axios.post(
        "http://localhost:8080/retrieveRecords",
        params
      );

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
        />
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
      <ImgContainer src="patience.jpg" />
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

function Button({ text, data, onClick, style }) {
  const merged_styles = {
    ...style,
    ...{ padding: "1em", borderRadius: ".5em" },
  };
  return (
    <button style={merged_styles} onClick={() => onClick(data)}>
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
