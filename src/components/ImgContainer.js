import { useEffect, useState } from "react";

export default function ImgContainer({ src, onClick, border }) {
  const [imgSrc, setImgSrc] = useState("");
  const [styles, setStyles] = useState({
    width: "inherit",
    height: "50%",
    display: "flex",
    alignItems: "center",
  });

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    let clone = structuredClone(styles);
    clone.border = border;
    setStyles(clone);
  }, [border]);

  return (
    <div style={styles}>
      <img style={{ width: "100%" }} src={src} onClick={onClick}></img>
    </div>
  );
}
