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
        <div className="col">
          <h1>Find My Anime</h1>
          <SearchBar setResults={setResults} />
          <SearchResults results={results} />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h4> Selected Anime </h4>
        </div>
      </div>
    </div>
  );
}

export default App;
