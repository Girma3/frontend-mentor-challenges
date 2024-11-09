function Button({ children, className, onAction }) {
  return (
    <button className={className} onClick={(e) => onAction(e)}>
      {children}
    </button>
  );
}

export default Button;
