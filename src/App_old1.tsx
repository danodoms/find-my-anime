import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
      <div className="row flex-column ">
        <div className="col-4"></div>
        <div className="col">
          <h1 className="display-6 text-icon text-center">Find My Anime</h1>
        </div>
        <div className="col-4"></div>
      </div>

      <div className="row">
        <SearchBar setResults={setResults} />
      </div>

      <SearchResults results={results} setSelectedAnime={setSelectedAnime} />

      {/* <DevSection /> */}
    </div>
  );
}

export default App;
