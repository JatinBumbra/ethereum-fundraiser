const Button = ({ children, onClick, fullWidth, disabled }) => {
  return (
    <button
      className={`bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all text-white font-semibold px-8 py-3 text-sm rounded ${
        fullWidth ? 'w-full block' : ''
      } ${disabled ? 'disabled:opacity-50 disabled:cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
