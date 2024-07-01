import { useState, useEffect } from "react";
import Button from "./Button";
import ImgContainer from "./ImgContainer";
import downloadImage from "../methods/downloadImage";

export default function HistoryDisplay({ exitModal, ModalContentsData }) {
  const sharedDbData = ModalContentsData.sharedDbData;
  const ddlData = ModalContentsData.ddlData;

  const [postData, setPostData] = useState("");
  const [unselectAll, setUnselectAll] = useState(0);
  const [ddlOptions, setDdlOptions] = useState([]);

  useEffect(() => {
    setPostData(sharedDbData);
  }, [sharedDbData]);

  useEffect(() => {
    setDdlOptions(ddlData);
  }, [ddlData]);

  function unselectClick() {
    setUnselectAll((unselectAll) => unselectAll + 1);
  }

  function closeModal() {
    exitModal();
    unselectClick();
  }

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
          <Ddl options={ddlOptions} />
        </div>
      </div>
      <DynamicInstantiation
        Component={ImgContainer}
        InstantiateData={postData}
        unselectAll={unselectAll}
        unselectClick={unselectClick}
      />
    </div>
  );
}

function Ddl(options) {
  const [ddlOptions, setDdlOptions] = useState(["2024-06-20", "2024-06-21"]);

  // useEffect(() => {
  //   if (options.length > 0) setDdlOptions(options);
  // }, [options]);

  function dateChange() {}

  return (
    <select onChange={dateChange}>
      {ddlOptions.map((item, idx) => (
        <option key={idx}>{item}</option>
      ))}
    </select>
  );
}

function DynamicInstantiation({
  Component,
  InstantiateData,
  unselectAll,
  unselectClick,
}) {
  const [data, setData] = useState([{}]);
  const [selectedImgData, setSelectedImgData] = useState([]);

  useEffect(() => {
    if (InstantiateData.length > 0) setData(InstantiateData);
  }, [InstantiateData]);

  function onSelect(imgObj) {
    const shallowClone = [...selectedImgData];
    shallowClone.push(imgObj);
    setSelectedImgData(shallowClone);
  }

  function onUnselect(imgObj) {
    if (arguments.length == 0) {
      setSelectedImgData([]);
      return;
    }

    const shallowClone = [...selectedImgData];
    let index = shallowClone.indexOf(imgObj);
    shallowClone.splice(index, 1);
    setSelectedImgData(shallowClone);
  }

  return (
    <div className="modal-body">
      {data.map((img, idx) => (
        <div key={idx}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",
              }}
            >
              {img.description}
            </h5>
            <h5 style={{ textWrap: "nowrap", padding: "0em 1em" }}>
              {typeof img.dateCreated != "undefined"
                ? " " + img.dateCreated.split("T")[0]
                : null}
            </h5>
          </div>
          <Component
            src={img.base64}
            imgData={img}
            onSelect={onSelect}
            onUnselect={onUnselect}
            unselectAll={unselectAll}
            selectAbility={true}
          />
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "1em 0",
        }}
      >
        <Button
          text="Unselect All"
          style={{ padding: "1em", borderRadius: ".5em" }}
          onClick={unselectClick}
        />
        <Button
          text="Download"
          style={{
            padding: "1em",
            borderRadius: ".5em",
            backgroundColor: "#ee2400",
          }}
          onClick={downloadImage}
          data={selectedImgData}
        />
      </div>
    </div>
  );
}
