import { useState, useEffect } from "react";

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

export default TextField;
