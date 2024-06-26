import { useEffect, useState } from "react";

export default function ImgContainer({ src }) {
  const [imgSrc, setImgSrc] = useState("");
  const [styles, setStyles] = useState({
    width: "inherit",
    height: "50%",
    display: "flex",
    alignItems: "center",
  });
  const [border, setBorder] = useState("4px solid black");
  const [imgCount, setImgCount] = useState(0);

  function selectImg() {
    if (imgCount % 2 == 0) setBorder("4px solid orange");
    else setBorder("4px solid black");
    setImgCount((imgCount) => imgCount + 1);
  }

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
      <img style={{ width: "100%" }} src={src} onClick={selectImg}></img>
    </div>
  );
}
