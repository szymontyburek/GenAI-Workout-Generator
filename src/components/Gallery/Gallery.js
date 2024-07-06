import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import ImgContainer from "../ImgContainer";
import downloadImage from "../../methods/downloadImage";
import "./Gallery.css";

export default function Gallery({
  unselectImgs,
  unselectTrigger,
  closeModal,
  ModalContentsData,
}) {
  const sharedDbData = ModalContentsData.sharedDbData;
  const ddlData = ModalContentsData.ddlData;
  const getRecords = ModalContentsData.getRecords;
  const setIsLoading = ModalContentsData.setIsLoading;

  const [dbData, setDbData] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    setDbData(sharedDbData);
  }, [sharedDbData]);

  return (
    <div ref={modalRef} className="subModal">
      <div className="modal-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ddl
            ddlData={ddlData}
            getRecords={getRecords}
            setIsLoading={setIsLoading}
            unselectImgs={unselectImgs}
          />
          <Button
            text="&times;"
            className="close-button"
            onClick={closeModal}
          />
        </div>
      </div>
      <DynamicInstantiation
        Component={ImgContainer}
        InstantiateData={dbData}
        unselectTrigger={unselectTrigger}
        unselectImgs={unselectImgs}
        backToTop={function () {
          modalRef.current.scrollTop = 0;
        }}
      />
    </div>
  );
}

function Ddl(ddlData) {
  const [ddlOptions, setDdlOptions] = useState([]);
  //for some odd reason, 'ddlData' is an object containing the props passed to this component
  const optionsTmp = ddlData.ddlData;
  const getRecords = ddlData.getRecords;
  const setIsLoading = ddlData.setIsLoading;
  const unselectImgs = ddlData.unselectImgs;

  useEffect(() => {
    if (optionsTmp.length > 0) setDdlOptions(optionsTmp);
    else setDdlOptions([]);
  }, [optionsTmp]);

  async function dateChange(e) {
    unselectImgs();
    await setIsLoading(true);
    await getRecords(e.target.value);
    setIsLoading(false); //not using await to avoid synchronous behavior when possible
  }

  return (
    <select style={{ border: "2px solid black" }} onChange={dateChange}>
      {ddlOptions.map((item, idx) => (
        <option key={idx}>{item}</option>
      ))}
    </select>
  );
}

function DynamicInstantiation({
  Component,
  InstantiateData,
  unselectTrigger,
  unselectImgs,
  backToTop,
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
      <div className="galleryContainer">
        {data.map((img, idx) => (
          <div key={idx}>
            <h5
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                textWrap: "nowrap",
              }}
            >
              {img.description}
            </h5>
            <Component
              src={img.base64}
              imgData={img}
              onSelect={onSelect}
              onUnselect={onUnselect}
              unselectTrigger={unselectTrigger}
              selectAbility={true}
            />
          </div>
        ))}
      </div>
      <div
        className="modalBtnsContainer"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          height: "var(--modalBtnsContainer)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "var(--subModalWidth)",
        }}
      >
        <Button
          text="Unselect All"
          style={{ padding: "1em", borderRadius: ".5em", textWrap: "nowrap" }}
          onClick={unselectImgs}
        />{" "}
        <Button
          text="Back To Top"
          style={{ padding: "1em", borderRadius: ".5em", textWrap: "nowrap" }}
          onClick={backToTop}
        />
        <Button
          text="Download"
          style={{
            padding: "1em",
            borderRadius: ".5em",
            backgroundColor: "#ee2400",
            textWrap: "nowrap",
          }}
          onClick={downloadImage}
          data={selectedImgData}
        />
      </div>
    </div>
  );
}
