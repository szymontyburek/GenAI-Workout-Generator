import { useState, useEffect } from "react";
import Button from "./Button";
import ImgContainer from "./ImgContainer";

export default function HistoryDisplay({ closeModal, ModalContentsData }) {
  const [postData, setPostData] = useState("");

  useEffect(() => {
    setPostData(ModalContentsData);
  }, [ModalContentsData]);

  return (
    <div>
      <div className="modal-header">
        <Button text="&times;" className="close-button" onClick={closeModal} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="title">Prior Generations:</div>
          <select name="selectDate" id="">
            <option value="">06/17/2024</option>
            <option value="">06/16/2024</option>
          </select>
        </div>
      </div>
      <DynamicInstantiation
        Component={ImgContainer}
        InstantiateData={postData}
      />
    </div>
  );
}

function DynamicInstantiation({ Component, InstantiateData }) {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    if (InstantiateData.length > 0) setData(InstantiateData);
  }, [InstantiateData]);

  return (
    <div className="modal-body">
      {data.map((img, idx) => (
        <div key={idx}>
          <h3>{img.description}</h3>
          <Component src={img.base64} />
        </div>
      ))}
    </div>
  );
}
