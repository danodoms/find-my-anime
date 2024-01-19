import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { useState } from "react";
import "./App.scss";
import CoverArt from "./components/CoverArt";

function App() {
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState({
    title: "Default title",
    image:
      "https://i.pinimg.com/236x/23/4b/16/234b16d7bb9750320b652584bda39bd3.jpg",
  });

  return (
    <div className="container border">
      <div className="row border">
        <h1>Find My Anime</h1>
        <SearchBar setResults={setResults} />
        <SearchResults results={results} />
      </div>

      <div className="row">
        <div className="col text-center">
          <h4> Selected Anime </h4>
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
        </div>
      </div>
    </div>
  );
}

export default App;
