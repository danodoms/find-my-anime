import Recommendations from "../components/Recommendations";
import React from "react";
import "../App.scss";
import CoverArt from "../components/CoverArt";
import Hero from "../components/Hero";

function Home({
  selectedAnime,

  recommendations,
}: any) {
  return (
    <>
      {selectedAnime.title == "" ? (
        <div className="flex justify-center p-4 h-screen">
          <Hero />
        </div>
      ) : (
        <div className="flex w-full flex-wrap p-2 py-20 gap-4 justify-start">
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
          <Recommendations recommendations={recommendations} />
        </div>
      )}
    </>
  );
}

export default Home;
