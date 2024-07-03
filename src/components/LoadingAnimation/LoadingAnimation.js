import "./LoadingAnimation.css";

export default function LoadingAnimation({ style }) {
  return (
    <div style={style}>
      <div className="loadingWheel"></div>
    </div>
  );
}
