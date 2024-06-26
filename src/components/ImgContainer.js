import { useEffect, useState } from "react";

export default function ImgContainer({ src, onUnselect, selectOpt }) {
  const [imgSrc, setImgSrc] = useState("");
  const [styles, setStyles] = useState({
    width: "inherit",
    height: "50%",
    display: "flex",
    alignItems: "center",
  });
  const [border, setBorder] = useState("");
  const [clickCount, setClickCount] = useState(0);

  function selectImg() {
    if (!selectOpt) return;
    if (clickCount % 2 == 0) setBorder("4px solid orange");
    else setBorder("4px solid black");
    setClickCount((clickCount) => clickCount + 1);
  }

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (!selectOpt) return;
    setBorder("4px solid black");
    setClickCount(0);
  }, [onUnselect]);

  useEffect(() => {
    let clone = structuredClone(styles);
    clone.border = border;
    setStyles(clone);
  }, [border]);

  return (
    <div style={styles}>
      <img style={{ width: "100%" }} src={src} onClick={selectImg}></img>
    </div>
  );
}
