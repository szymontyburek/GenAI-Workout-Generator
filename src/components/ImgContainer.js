import { useEffect, useState } from "react";

export default function ImgContainer({
  src,
  selectAbility,
  onSelect,
  onUnselect,
  unselectTrigger,
  imgData,
  className,
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [styles, setStyles] = useState({
    width: "inherit",
    display: "flex",
    alignItems: "center",
  });
  const [border, setBorder] = useState("");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    if (!selectAbility) return;
    setBorder("4px solid black");
    onUnselect();
    setClickCount(0);
  }, [unselectTrigger]);

  useEffect(() => {
    let clone = { ...structuredClone(styles), ...{ border: border } };
    setStyles(clone);
  }, [border]);

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

  return (
    <div style={styles} className={className}>
      <img src={src} onClick={selectImg}></img>
    </div>
  );
}
