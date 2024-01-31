export default function UpperButton({ children, type, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="border border-black pl-8 pr-8 m-2 mr-8 ml-8 rounded-md w-16 h-8 flex justify-center items-center"
    >
      {children}
    </button>
  );
}
