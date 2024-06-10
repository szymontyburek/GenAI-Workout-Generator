import "./App.css";

function App() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Image Generator</h1>
        <TextField />
        <Submit />
      </div>
    </div>
  );
}

function TextField() {
  return <textarea style={{ width: "80%", height: "300px" }}></textarea>;
}

function Submit() {
  function getText() {
    debugger;
  }

  return (
    <button
      style={{ marginTop: "1em", padding: "1em", width: "80%" }}
      onClick={getText}
    >
      Submit
    </button>
  );
}

function getMessage() {}

export default App;
