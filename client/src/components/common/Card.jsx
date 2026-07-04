function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

export default Card;
