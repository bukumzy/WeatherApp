import SearchBar from "./components/SearchBar";

function App() {
  const handleSearch = (city) => {
    console.log("Searching for:", city);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
