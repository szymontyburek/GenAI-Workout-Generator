import { useEffect, useState } from "react";

export default function ImgContainer({ src, onClick, style }) {
  const [imgSrc, setImgSrc] = useState("");
  const [styleObj, setStyleObj] = useState({
    width: "inherit",
    height: "50%",
    display: "flex",
    alignItems: "center",
  });

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    let clone = structuredClone(styleObj);
    clone.border = style;
    setStyleObj(clone);
  }, [style]);

  return (
    <div style={styleObj}>
      <img style={{ width: "100%" }} src={src} onClick={onClick}></img>
    </div>
  );
}
