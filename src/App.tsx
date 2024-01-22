import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DevSection from "./components/DevSection";
import Recommendations from "./components/Recommendations";
import { useState } from "react";
import "./App.scss";
import CoverArt from "./components/CoverArt";

function App() {
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState({
    id: 0,
    title: "Frieren: Beyond Journey's End",
    image:
      "https://cdn.animenewsnetwork.com/thumbnails/max600x600/cms/news.6/200445/frieren.jpg",
  });

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="container gap-4 background-bg p-4 gx-0 gy-0">
      <div className="row">
        <div className="border col">
          <h1 className="display-6 text-icon">Find My Anime</h1>
        </div>
        <div className="col border align-items-center p-0">
          <SearchBar setResults={setResults} />
          <SearchResults
            results={results}
            setSelectedAnime={setSelectedAnime}
            setRecommendations={setRecommendations}
          />
        </div>
      </div>

      <div className="row p-2">
        <div className="col border alighn-items-center text-center">
          <h2 className="border"> Selected Anime </h2>
        </div>
        <div className="col-lg border p-0">
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
        </div>
      </div>

      <div className="row p-2">
        <div className="col">
          <h4> Based on your selection</h4>
        </div>
        <Recommendations recommendations={recommendations} />
      </div>
      <DevSection />
    </div>
  );
}

export default App;
