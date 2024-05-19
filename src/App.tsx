// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";

import { useState, lazy, Suspense } from "react";
import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
// import Library from "./pages/Library";
const Library = lazy(() => import("./pages/Library"));
import { User } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

//FIREBASE RELATED IMPORT
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

  // const location = useLocation();

  return (
    <div className="">
      <ResultsContext.Provider value={[results, setResults]}>
        <NotificationsContext.Provider
          value={[notifications, setNotifications]}
        >
          <BrowserRouter>
            <AnimatePresence>
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
                      <Suspense fallback={<div>Loading...</div>}>
                        <Library user={user} loading={loading} />
                      </Suspense>
                    }
                  />

                  <Route
                    index
                    element={
                      <Suspense fallback={<div>Loading...</div>}>
                        <Home
                          results={results}
                          setResults={setResults}
                          selectedAnime={selectedAnime}
                          setSelectedAnime={setSelectedAnime}
                          setRecommendations={setRecommendations}
                          user={user}
                          recommendations={recommendations}
                        />
                      </Suspense>
                    }
                  />
                </Routes>
                <BottomNav />
              </div>
            </AnimatePresence>
          </BrowserRouter>
        </NotificationsContext.Provider>
      </ResultsContext.Provider>
    </div>
  );
}

export default App;
