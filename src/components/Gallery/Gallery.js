import { useState, useEffect, useRef } from "react";
import Button from "../Button";
import ImgContainer from "../ImgContainer";
import downloadImage from "../../methods/downloadImage";
import "./Gallery.css";

export default function Gallery({ exitModal, ModalContentsData }) {
  const sharedDbData = ModalContentsData.sharedDbData;
  const ddlData = ModalContentsData.ddlData;
  const getRecords = ModalContentsData.getRecords;
  const setIsLoading = ModalContentsData.setIsLoading;

  const [dbData, setDbData] = useState("");
  const [unselectAll, setUnselectAll] = useState(0);
  const [ddlArr, setDdlArr] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    setDbData(sharedDbData);
  }, [sharedDbData]);

  useEffect(() => {
    setDdlArr(ddlData);
  }, [ddlData]);

  function unselectImgs() {
    setUnselectAll((unselectAll) => unselectAll + 1);
  }

  function closeModal() {
    exitModal();
    unselectImgs();
    setDdlArr([]);
  }

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
            ddlArr={ddlArr}
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
        unselectAll={unselectAll}
        unselectImgs={unselectImgs}
        modalRef={modalRef}
      />
    </div>
  );
}

function Ddl(ddlArr) {
  const [ddlOptions, setDdlOptions] = useState([]);
  //for some odd reason, 'ddlArr' is an object containing the props passed to this component
  const optionsTmp = ddlArr.ddlArr;
  const getRecords = ddlArr.getRecords;
  const setIsLoading = ddlArr.setIsLoading;
  const unselectImgs = ddlArr.unselectImgs;

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
  unselectAll,
  unselectImgs,
  modalRef,
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
              unselectAll={unselectAll}
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
          margin: "1em 0",
          position: "absolute",
          bottom: 0,
          height: "var(--modalBtnsContainer)",
          margin: 0,
        }}
      >
        <Button
          text="Unselect All"
          style={{ padding: "1em", borderRadius: ".5em" }}
          onClick={unselectImgs}
        />{" "}
        <Button
          text="Back To Top"
          style={{ padding: "1em", borderRadius: ".5em" }}
          onClick={function () {
            modalRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
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
