function Button({ text, data, onClick, style, id, className }) {
  return (
    <button
      id={id}
      style={style}
      onClick={() => onClick(data)}
      className={className}
    >
      {text}
    </button>
  );
}
export default Button;
