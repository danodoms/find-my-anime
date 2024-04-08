import Recommendations from "../components/Recommendations";
import React from "react";
import "../App.scss";
import CoverArt from "../components/CoverArt";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import BottomNav from "../components/BottomNav";

function Home({
  setResults,
  results,
  setSelectedAnime,
  selectedAnime,
  setRecommendations,
  user,
  recommendations,
}: any) {
  return (
    <div>
      {/* <NavBar
        setResults={setResults}
        results={results}
        setSelectedAnime={setSelectedAnime}
        setRecommendations={setRecommendations}
        user={user}
      /> */}
      {selectedAnime.title == "" ? (
        <Hero />
      ) : (
        <div className="flex flex-wrap p-2 gap-4 ">
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
          <Recommendations recommendations={recommendations} />
        </div>
      )}

      {/* <div className="divider">Start Here</div> */}

      {/* <BottomNav /> */}
    </div>
  );
}

export default Home;
