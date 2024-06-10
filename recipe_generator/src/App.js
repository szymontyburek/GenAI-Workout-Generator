import "./App.css";

function App() {
  return (
    <div>
      <h1>Image Generator</h1>
      <TextField />
      <Submit />
    </div>
  );
}

function TextField() {
  return <textarea></textarea>;
}

function Submit() {
  return <button>Submit</button>;
}

function getMessage() {}

export default App;
