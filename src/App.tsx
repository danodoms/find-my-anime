// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import DevSection from "./components/DevSection";
import Recommendations from "./components/Recommendations";
import Library from "./pages/Library";
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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { User } from "firebase/auth";

//FIREBASE RELATED IMPORTS
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import { Notifications } from "./interfaces/Notifications";

export const ResultsContext = React.createContext<[any[], any]>([[], 0]);
export const NotificationsContext = React.createContext<[Notifications, any]>([
  { addedToLibrary: 0 },
  0,
]);

function App() {
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState({ addedToLibrary: 0 });
  const [selectedAnime, setSelectedAnime] = useState({
    id: 0,
    title: "",
    image: "",
  });

  const [user, loading, error] = useAuthState(auth);

  console.log(user);

  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="">
      <ResultsContext.Provider value={[results, setResults]}>
        <NotificationsContext.Provider
          value={[notifications, setNotifications]}
        >
          <BrowserRouter>
            <div className="flex flex-col flex-wrap bg-base-200 justify-start">
              <NavBar
                setResults={setResults}
                results={results}
                setSelectedAnime={setSelectedAnime}
                setRecommendations={setRecommendations}
                user={user}
              />
              <Routes>
                <Route
                  path="/library"
                  element={
                    //@ts-ignore
                    <Library user={user} loading={loading} />
                  }
                />

                <Route
                  index
                  element={
                    <Home
                      results={results}
                      setResults={setResults}
                      selectedAnime={selectedAnime}
                      setSelectedAnime={setSelectedAnime}
                      setRecommendations={setRecommendations}
                      user={user}
                      recommendations={recommendations}
                    />
                  }
                />
              </Routes>
              <BottomNav />
            </div>
          </BrowserRouter>
        </NotificationsContext.Provider>
      </ResultsContext.Provider>
    </div>
  );
}

export default App;
