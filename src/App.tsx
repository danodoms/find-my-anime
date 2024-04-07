// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DevSection from "./components/DevSection";
import Recommendations from "./components/Recommendations";
import Library from "./components/Library";
import SignIn from "./components/SignIn";
import { useState } from "react";
import React from "react";
import "./App.scss";
import CoverArt from "./components/CoverArt";
import Offline from "./components/Offline";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import BottomNav from "./components/BottomNav";
import Wrapper from "./components/Wrapper";

//FIREBASE RELATED IMPORTS
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import BottomMenu from "./components/BottomMenu";

export const ResultsContext = React.createContext<[any[], any]>([[], 0]);

function App() {
  const [results, setResults] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState({
    id: 0,
    title: "",
    image: "",
  });

  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const [recommendations, setRecommendations] = useState([]);

  // console.log("recommendations: " + recommendations);

  return (
    <div className="">
      <ResultsContext.Provider value={[results, setResults]}>
        <NavBar
          setResults={setResults}
          results={results}
          setSelectedAnime={setSelectedAnime}
          setRecommendations={setRecommendations}
          user={user}
        />
      </ResultsContext.Provider>
      {/* <Wrapper> */}
      <div className="flex flex-wrap p-4 gap-4">
        <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
        <Recommendations recommendations={recommendations} />
      </div>

      {/* </Wrapper> */}

      <Hero />

      <div className="divider">Start Here</div>
      {/* <div className="row pt-2 gap-4 justify-content-left gx-0">
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

          <div className="col mt-2">
            <Offline />
          </div>
        </div>

        <div className="col-lg border p-0">
          <CoverArt title={selectedAnime.title} image={selectedAnime.image} />
        </div>
      </div>

      <div className="row">
        <div className="col p-2">
          <h4 className="m-0 mb-1"> Based on your selection</h4>
          <Recommendations recommendations={recommendations} />
        </div>

        <div className="col-sm-4 p-2">
          <h4 className="m-0 mb-1"> Library</h4>
          {user ? (
            <Library userProp={user} loading={loading} error={error} />
          ) : (
            <SignIn />
          )}
        </div>
      </div>

      <DevSection /> */}
      {/* <BottomNav /> */}
      {/* <BottomMenu /> */}
    </div>
  );
}

export default App;
