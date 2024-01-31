export default function SearchBar() {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border m-2 mt-4 border-gray-500 rounded-md h-8 w-72"
      ></input>
    </div>
  );
}
