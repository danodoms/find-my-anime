import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addToLibrary } from "../models/AnimeList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignInModal from "./SignInModal";

import { useContext } from "react";

import { NotificationsContext } from "../App";

function Recommendations({ recommendations = [] }) {
  const [user, loading, error] = useAuthState(auth);
  const [notificationsContext, setNotificationsContext] =
    useContext(NotificationsContext);

  const [trailer, setTrailer] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [playing] = useState(true);
  // const [controls, setControls] = useState(true);
  const [muted, setMuted] = useState(true);
  // const [loop, setLoop] = useState(true);

  const [title, setTitle] = useState("");
  const [animeId, setAnimeId] = useState();
  const [synopsis, setSynopsis] = useState("");

  const [index, setIndex] = useState(0);

  useEffect(() => {
    initializeRecommendations();

    return () => {
      setIndex(0);
      console.log("Index is set to", index);
    };
  }, [recommendations]);

  return renderRecommendations();

  function renderRecommendations() {
    console.log("Recommendations: ", recommendations);
    console.log("index: " + index);
    if (recommendations.length > 0) {
      return renderRecommendationsWithContent();
    } else {
      return renderNoRecommendations();
    }
  }

  function renderNoRecommendations() {
    return (
      <div className="container rounded gx-0 gy-0">
        <div className="row rounded bg-black">
          <div className="col p-4">
            <h4 className="m-0 mb-1"> No recommendations found </h4>
            <p className="weight-regular m-0">
              You might have to ask your friend for this one
            </p>
          </div>
        </div>
      </div>
    );
  }

  function handleNext() {
    recommendations.map((recommendation: any, id: any) => {
      if (id === index) {
        setTitle(recommendation.entry.title);
        setAnimeDetails(recommendation.entry.mal_id);
      }
    });
    setIndex((index) => ++index);
  }

  function handlePrevious() {
    recommendations.map((recommendation: any, id: any) => {
      if (id === index) {
        setTitle(recommendation.entry.title);
        setAnimeDetails(recommendation.entry.mal_id);
      }
    });
    setIndex((index) => --index);
  }

  async function handleAddToLibrary() {
    const openModal = () => {
      const modal = document.getElementById("sign-in-modal");
      //@ts-ignore
      if (modal) modal.showModal();
    };

    if (user?.uid && animeId) {
      const response = await addToLibrary(animeId, user.uid);

      if (response == "success") {
        toast.success("Added to Library", { position: "top-center" });
        const newValue = notificationsContext.addedToLibrary + 1;
        setNotificationsContext({ addedToLibrary: newValue });
      } else if (response == "already added") {
        toast.warn("Already in your Library", { position: "top-center" });
      } else if (response == "error") {
        toast.error("Error adding to Library", { position: "top-center" });
      }
    } else {
      openModal();
    }
  }

  function initializeRecommendations() {
    recommendations.map((recommendation: any, id: any) => {
      if (id === 0) {
        setTitle(recommendation.entry.title);
        setAnimeDetails(recommendation.entry.mal_id);
        return;
      }
    });
  }

  function renderRecommendationsWithContent() {
    return (
      <div className="flex flex-wrap flex-auto w-full rounded bg-black">
        <SignInModal />
        <div className="carousel md:w-1/2 rounded-xl flex-auto ">
          {recommendations.map((id: number) => (
            <div
              id={id.toString()}
              className="carousel-item relative w-full bg-black"
            >
              <div className="flex flex-col p-6 ">
                <h1 className="font-bold text-3xl pb-2">
                  {/* {recommendation.entry.title} */}
                  {title}
                </h1>
                <p className="text-justify text-sm lg:text-base">{synopsis}</p>

                <div className="join flex flex-auto mt-auto pt-2 ">
                  <button
                    className="btn join-item"
                    onClick={() => {
                      setMuted(!muted);
                    }}
                  >
                    {muted ? (
                      <img src="/icons/mute.svg" className="w-6 " alt="" />
                    ) : (
                      <img src="/icons/unmute.svg" className="w-6 " alt="" />
                    )}
                  </button>

                  {index != 0 && (
                    <a
                      // href={`#${id - 1}`}
                      className="btn join-item"
                      onClick={handlePrevious}
                    >
                      <img src="/icons/previous.svg" className="w-6 " alt="" />
                    </a>
                  )}

                  <a
                    // href={`#${id + 1}`}
                    className="btn join-item"
                    onClick={handleNext}
                  >
                    <img src="/icons/next.svg" className="w-6" alt="" />
                  </a>

                  {/* {user ? ( */}
                  <button
                    className="btn btn-secondary join-item"
                    onClick={handleAddToLibrary}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <p className="text-xs leading-3">
                      Add to <br />
                      Library
                    </p>
                  </button>
                  {/* ) : null} */}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container md:w-1/2 sm:w-1/4 flex-1 aspect-video content-center relative">
          <div className="">
            <div className="rounded gradient-overlay"></div>
          </div>
          {trailer == "" ? (
            <div className="flex cover-art-wrapper">
              <img src={coverArt} alt="" />
            </div>
          ) : (
            <div className="flex player-wrapper aspect-video self-center">
              <ReactPlayer
                className="rounded react-player aspect-video"
                style={{ borderRadius: "10px" }}
                url={trailer}
                playing={playing}
                muted={muted} //must be muted to enable autoplay feature (not in all cases)
                controls={false}
                width="100%"
                // height="100%"
                loop
                onReady={() => {}}
                onStart={() => {
                  setMuted(false);
                  // @ts-ignore
                  this.player.volume = 0.8; // fade volume up over 0.5 seconds
                  // @ts-ignore
                  this.player.fadeIn(0.5);
                  //@ts-ignore
                  this.player.seekTo(30);
                }}
              />
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }

  async function setAnimeDetails(anime_id: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime_id}/full`
      );
      const data = await response.json();
      console.log("Fetching data...");

      setTrailer("");
      setTrailer(data.data.trailer.url);
      setAnimeId(data.data.mal_id);
      setSynopsis(limitCharacters(data.data.synopsis, 500));
      setCoverArt(data.data.images.jpg.large_image_url);
      console.log("title: ", title);
      console.log("cover art for this recommendation: ", coverArt);
      console.log("trailer: ", trailer);
    } catch (error) {
      console.error(error);
    }
  }

  //create a fucntion that accepts a string and limit characters to 500 and add ellipsis to end
  function limitCharacters(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
}

export default Recommendations;
