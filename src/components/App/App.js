import "./App.css";
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal";
import Button from "../Button";
import ImageGeneration from "../ImageGeneration";
import LoadingAnimation from "../LoadingAnimation";

function ParentContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [styles, setStyles] = useState({
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",
    opacity: 0.6,
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  useEffect(() => {
    //modify display property for topmost div in LoadingAnimation component dynamically
    let clone = structuredClone(styles);

    if (isLoading) clone.display = "flex";
    else clone.display = "none";

    setStyles(clone);
  }, [isLoading]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageGeneration setIsLoading={setIsLoading} />
      <LoadingAnimation style={styles} />
    </div>
  );
}

export default ParentContainer;
