import { useEffect, useState } from "react";

export default function ImgContainer({
  src,
  selectAbility,
  onSelect,
  onUnselect,
  unselect,
  imgData,
}) {
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
    if (!selectAbility) return;

    if (clickCount % 2 == 0) {
      setBorder("4px solid orange");
      onSelect(imgData);
    } else {
      setBorder("4px solid black");
      onUnselect(imgData);
    }

    setClickCount((clickCount) => clickCount + 1);
  }

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (!selectAbility) return;
    setBorder("4px solid black");
    onUnselect(true);
    setClickCount(0);
  }, [unselect]);

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
