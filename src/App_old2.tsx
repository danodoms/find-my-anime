import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DevSection from "./components/DevSection";
import { useState } from "react";
import "./App.scss";
import CoverArt from "./components/CoverArt";

function App() {
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState({
    id: 0,
    title: "Default title",
    image:
      "https://i.pinimg.com/236x/23/4b/16/234b16d7bb9750320b652584bda39bd3.jpg",
  });

  return (
    <div className="container gap-4 background-bg p-4 gx-0 border">
      <div className="row">
        <h1 className="display-6 text-icon">Find My Anime</h1>
      </div>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} setSelectedAnime={setSelectedAnime} />

      <div className="row p-2">
        <div className="col">
          <h4> Selected Anime </h4>
        </div>
        <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
      </div>

      <DevSection />
    </div>
  );
}

export default App;
