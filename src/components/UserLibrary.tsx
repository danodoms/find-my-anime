import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onSnapshot, collection, doc } from "firebase/firestore";

import { deleteFromLibrary, toggleWatchingStatus } from "../models/AnimeList";
import { Anime } from "../interfaces/jikan";
import { User } from "firebase/auth";

interface LibraryProps {
  user: User | null | undefined;
  loading: boolean;
  error?: Error;
}

function UserLibrary({ user, loading }: LibraryProps) {
  const [library, setLibrary] = useState<Anime[]>([]);
  const userDocRef = doc(db, "animeList", user?.uid ?? "");
  const animesSubcolRef = collection(userDocRef, "animes");

  useEffect(() => {
    console.log("library: ", library);
    if (user) {
      const unsubscribe = onSnapshot(
        animesSubcolRef,
        { includeMetadataChanges: true },
        (snapshot) => {
          console.log(
            "WOWWWWWWWWW YOUR DATABASEEE HASSS BEEENNN UPPPDATEEEDDD"
          );
          console.log("snapshot: ", snapshot);

          // Create an array to hold the mal_id values
          const animeIds = snapshot.docs.map((doc) => doc.data().anime_id);
          const userAnimeList = snapshot.docs.map((doc) => doc.data());
          console.log("userAnimeList: ", userAnimeList);
          console.log("animeIds: ", animeIds);

          const source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);
          console.log("Data came from " + source);
          console.log("Data came from " + source);

          fetchAllAnimes(userAnimeList, animeIds);
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  return renderLibrary();

  function renderLibrary() {
    if (library.length < 1) {
      return renderLoading();
    } else {
      return renderLibraryWithContent();
    }
  }

  function renderLoading() {
    return (
      <div className="flex flex-auto flex-col rounded p-2 py-20 mb-40 h-dvh">
        {loading ? (
          <h1 className="flex-auto text-3xl font-bold m-0 p-0">
            Sign In to Add Animes to Your Library
          </h1>
        ) : (
          <div className="flex-auto">
            <h1 className=" text-3xl font-bold m-0 p-0">
              Fetching Your Library
            </h1>
          </div>
        )}
        <div className="flex-auto justify-center self-center">
          <span className="loading loading-spinner loading-lg align-middle"></span>
        </div>
      </div>
    );
  }

  function renderLibraryWithContent() {
    return (
      <div className="flex flex-auto rounded p-2 py-20 mb-40 h-dvh">
        <div className="flex flex-wrap rounded content-start gap-4">
          <div className="flex flex-auto justify-center items-center rounded gap-4">
            {loading ? (
              <h1 className="flex-auto text-3xl font-bold m-0 p-0">
                Sign In to Add Animes to Your Library
              </h1>
            ) : (
              <h1 className="flex-auto text-3xl font-bold m-0 p-0">
                Your Library
              </h1>
            )}
          </div>

          {library.map((anime: Anime, id: number) => {
            console.log("title: ", anime.data.title);
            return (
              <div
                key={id}
                className="flex flex-auto rounded-lg p-2 bg-black gap-2 "
              >
                <img
                  className="grow-0 w-20 rounded "
                  src={anime.data.images.jpg.image_url}
                  alt={anime.data.title}
                />

                <div className="flex flex-col flex-1">
                  <h2 className="flex-1 font-bold text-xl self-center text-center content-center text-pretty leading-6">
                    {anime.data.title}
                  </h2>

                  <div
                    className="flex-1 sm:self-start items-end mt-auto join lg:join-horizontal"
                    role="group"
                    aria-label="Anime watching options"
                  >
                    {anime.watching ? (
                      <button
                        type="button"
                        className="btn flex-auto join-item"
                        onClick={() => handleWatching(anime.data.mal_id)}
                      >
                        Watching
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn flex-auto btn-outline join-item "
                        onClick={() => handleWatching(anime.data.mal_id)}
                      >
                        Not Watching
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn flex-auto btn-error join-item"
                      onClick={() => handleDelete(anime.data.mal_id)}
                    >
                      <img
                        src="/icons/trash-icon.svg"
                        className="h-5 w-5"
                        alt="Delete"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  async function fetchAllAnimes(userAnimeList: any, animeList: any) {
    const promises = animeList.map((anime: number) => getAnimeDetails(anime));
    const results = await Promise.all(promises);

    function isAnime(obj: any): obj is Anime {
      return obj && obj.data !== undefined;
    }

    const validResults: Anime[] = results.filter(isAnime);

    const mergedResults = validResults.map((anime, index) => {
      // Merge the anime object with the corresponding userAnimeList object
      // Ensure userAnimeList[index] exists to avoid runtime errors
      return { ...anime, ...(userAnimeList[index] || {}) };
    });

    setLibrary(mergedResults);
    console.log("library: ", library);
  }

  async function getAnimeDetails(anime_id: number): Promise<object> {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime_id}/full`
      );

      if (!response.ok) {
        // if HTTP-status is 200-299
        // throws an Error object with statusbutto
        throw new Error(response.status.toString());
      }
      const data = await response.json();
      console.log(data);
      return data; // Return the fetched data directly
    } catch (error) {
      console.log("mal_id may be invalid: ", anime_id);
      console.error(error);
      return {}; // Return null or an appropriate value in case of an error
    }
  }

  function handleDelete(anime_id: number) {
    if (user?.uid) deleteFromLibrary(anime_id, user.uid);
  }

  function handleWatching(anime_id: number) {
    if (user?.uid) toggleWatchingStatus(user?.uid, anime_id);
  }
}

export default UserLibrary;
