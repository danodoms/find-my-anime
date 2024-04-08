import ReactPlayer from "react-player";
import { Children, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addToLibrary } from "../models/AnimeList";
import { startWindToast } from "@mariojgt/wind-notify/packages/index.js";
import Wrapper from "./Wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Recommendations({ recommendations = [] }) {
  const [user, loading, error] = useAuthState(auth);

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
    if (user?.uid && animeId) {
      const response = await addToLibrary(animeId, user.uid);

      if (response == "success") {
        // startWindToast("Library", "Added to Library", "success", 3, "top");
        toast.success("Added to Library", { position: "top-center" });
      } else if (response == "already added") {
        // startWindToast(
        //   "Library",
        //   "Already in your Library",
        //   "warning",
        //   3,
        //   "top"
        // );
        toast.warn("Already in your Library", { position: "top-center" });
      } else if (response == "error") {
        // startWindToast("Library", "Error adding to Library", "error", 3, "top");
        toast.error("Error adding to Library", { position: "top-center" });
      }
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
      <div className="flex flex-wrap container rounded bg-black">
        <div className="carousel md:w-1/2 rounded-xl flex-auto ">
          {recommendations.map((recommendation: any, id: number) => (
            <div
              id={id.toString()}
              className="carousel-item relative w-full bg-black"
            >
              <div className="flex flex-col p-6">
                <h1 className="font-bold text-3xl pb-2">
                  {/* {recommendation.entry.title} */}
                  {title}
                </h1>
                <p className="text-justify">{synopsis}</p>

                <div className="join flex flex-auto mt-auto pt-2">
                  <button
                    className="btn join-item"
                    onClick={() => {
                      setMuted(!muted);
                    }}
                  >
                    {muted ? "Unmute" : "Mute"}
                  </button>

                  {index != 0 && (
                    <a
                      // href={`#${id - 1}`}
                      className="btn join-item"
                      onClick={handlePrevious}
                    >
                      Previous
                    </a>
                  )}

                  <a
                    // href={`#${id + 1}`}
                    className="btn join-item"
                    onClick={handleNext}
                  >
                    Next
                  </a>

                  {user ? (
                    <button
                      className="btn btn-outline btn-secondary join-item"
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
                      Add to Library
                    </button>
                  ) : null}
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

    // return (
    //   <div className="container rounded gx-0 gy-0">
    //     <div className="row rounded bg-black">
    //       <div className="col p-4">
    //         <h2 className="">{title}</h2>
    //         <p className="synopsis weight-regular">{synopsis}</p>

    //         <div className="row gap-2">
    //           <div className="col gx-0 gy-0">
    //             <button
    //               className="btn"
    //               onClick={() => {
    //                 setMuted(!muted);
    //               }}
    //             >
    //               {muted ? "Unmute" : "Mute"}
    //             </button>

    //             {index != 0 && (
    //               <button className="btn" onClick={handlePrevious}>
    //                 Previous
    //               </button>
    //             )}

    //             <button className="btn" onClick={handleNext}>
    //               Next
    //             </button>

    //             {user ? (
    //               <button className="btn" onClick={handleAddToLibrary}>
    //                 Add to Library
    //               </button>
    //             ) : null}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="col-md relative rounded gx-0">
    //         <div className="col bg-primary gx-0 gy-0">
    //           <div className="rounded gradient-overlay"></div>
    //         </div>

    //         {trailer == "" ? (
    //           <div className="cover-art-wrapper">
    //             <img src={coverArt} alt="" />
    //           </div>
    //         ) : (
    //           <div className="player-wrapper">
    //             <ReactPlayer
    //               className="rounded react-player"
    //               style={{ borderRadius: "10px" }}
    //               url={trailer}
    //               playing={playing}
    //               muted={muted} //must be muted to enable autoplay feature (not in all cases)
    //               controls={false}
    //               width="100%"
    //               // height="100%"
    //               loop
    //               onReady={() => {}}
    //               onStart={() => {
    //                 setMuted(false);
    //                 // @ts-ignore
    //                 this.player.volume = 0.8; // fade volume up over 0.5 seconds
    //                 // @ts-ignore
    //                 this.player.fadeIn(0.5);
    //                 //@ts-ignore
    //                 this.player.seekTo(30);
    //               }}
    //             />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // );
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
