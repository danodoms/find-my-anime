import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DevSection from "./components/DevSection";
import Recommendations from "./components/Recommendations";
import { useState, useContext } from "react";
import React from "react";
import "./App.scss";
import CoverArt from "./components/CoverArt";

export const ResultsContext = React.createContext<any>([]);

function App() {
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState({
    id: 0,
    title: "",
    image: "",
  });

  const [recommendations, setRecommendations] = useState([]);

  // console.log("recommendations: " + recommendations);

  return (
    <div className="container gap-4 p-2 background-bg gx-0 gy-0">
      <div className="row pt-2 gap-4 justify-content-left gx-0">
        <div className="col border">
          <h1 className="display-6 text-icon border m-0 p-0">Find My Anime</h1>
          <p className="weight-regular mb-2 p-1">
            Get anime recommendations based on your fave animes
          </p>

          <div className="col-md border relative align-items-center p-0">
            <ResultsContext.Provider value={[results, setResults]}>
              <SearchBar setResults={setResults} />
              <SearchResults
                results={results}
                setSelectedAnime={setSelectedAnime}
                setRecommendations={setRecommendations}
              />
            </ResultsContext.Provider>
          </div>
        </div>

        <div className="col-lg border p-0">
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
        </div>
      </div>

      <div className="row">
        <div className="col p-2">
          <h4 className="m-0 mb-1"> Based on your selection</h4>
        </div>
        <Recommendations recommendations={recommendations} />
      </div>
      <DevSection />
    </div>
  );
}

export default App;
