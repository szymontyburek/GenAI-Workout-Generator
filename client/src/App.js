import "./App.css";
import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import Button from "./Button";
import ImageGeneration from "./ImageGeneration";
import LoadingAnimation from "./LoadingAnimation";

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

export default ParentContainer;
