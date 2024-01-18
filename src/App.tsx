import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { useState } from "react";

function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="container">
      <div className="row">
        <div className="col left-side">
          <h1>Find My Anime</h1>
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
        <div className="col right-side"></div>
      </div>
    </div>
  );
}

export default App;
