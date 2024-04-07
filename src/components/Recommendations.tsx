import ReactPlayer from "react-player";
import { Children, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { addToLibrary } from "../models/AnimeList";
import Wrapper from "./Wrapper";

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

  function handleAddToLibrary() {
    if (user?.uid && animeId) {
      addToLibrary(animeId, user.uid);
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
        <div className="carousel flex-1">
          {recommendations.map((recommendation: any, id: any) => (
            <div id={id} className="carousel-item relative w-full bg-black">
              <div className="p-6">
                <h1 className="font-bold text-3xl pb-2">
                  {recommendation.entry.title}
                </h1>
                <p className="text-justify">{synopsis}</p>

                <div className="flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#${--id}`} className="btn btn-circle">
                    ❮
                  </a>
                  <a href={`#${++id}`} className="btn btn-circle">
                    ❯
                  </a>
                </div>

                <div className="row gap-2">
                  <div className="join">
                    <button
                      className="btn join-item"
                      onClick={() => {
                        setMuted(!muted);
                      }}
                    >
                      {muted ? "Unmute" : "Mute"}
                    </button>

                    {index != 0 && (
                      <button
                        className="btn join-item"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                    )}

                    <button className="btn join-item" onClick={handleNext}>
                      Next
                    </button>

                    {user ? (
                      <button
                        className="btn join-item"
                        onClick={handleAddToLibrary}
                      >
                        Add to Library
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 aspect-video content-center relative pr-1">
          <div className="col bg-primary gx-0 gy-0">
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
