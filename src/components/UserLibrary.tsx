import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { onSnapshot, collection, doc } from "firebase/firestore";

import {
  getAnimeListByUserId,
  deleteFromLibrary,
  toggleWatchingStatus,
} from "../models/AnimeList";
import { Anime } from "../interfaces/jikan";
import { User } from "firebase/auth";

interface AuthUser {
  photoURL: string;
  uid: string;
  displayName: string;
}

interface LibraryProps {
  user: AuthUser;
  loading: boolean;
  error?: Error;
}

function UserLibrary({ user, loading }: LibraryProps) {
  // const [user] = useState<AuthUser>(userProp);
  const [library, setLibrary] = useState<Anime[]>([]);
  const [userAnimeList, setUserAnimeList] = useState();

  // let library = [];

  // const colRef = collection(db, "animeList");
  const userDocRef = doc(db, "animeList", user?.uid);
  const animesSubcolRef = collection(userDocRef, "animes");

  // useEffect(() => {
  //   console.log("current user state: ", user);

  //   if (user) {
  //     fetchData(user.uid);return
  //   }
  // }, [user]);

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

  // async function fetchData(userId: string) {
  //   const userAnimes = await getAnimeListByUserId(userId);
  //   await fetchAllAnimes(userAnimes);
  // }

  return renderLibrary();

  function renderLibrary() {
    return (
      <div className="flex-auto container rounded p-4">
        <div className="flex flex-col rounded gap-4">
          <div className="flex justify-end items-center rounded gap-4">
            {loading ? (
              <>
                <h4 className="m-0 mb-1 col">Sign in</h4>
                <button className="btn">Sign in</button>
              </>
            ) : (
              <>
                <button className="btn mr-auto " onClick={handleSignOut}>
                  Sign out
                </button>
                <h5 className="">Signed in as {user?.displayName}</h5>
                <img
                  className="flex-none rounded-full w-20 "
                  src={user?.photoURL || undefined}
                  alt="user profile picture"
                />
              </>
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
                  className="flex w-20 rounded p-1"
                  src={anime.data.images.jpg.image_url}
                  alt=""
                />

                <div className="flex flex-col">
                  <h2 className="flex-auto font-bold text-xl justify-end self-start  text-pretty">
                    {anime.data.title}
                  </h2>

                  <div
                    className="flex self-center join lg:join-horizontal"
                    role="group"
                    aria-label="Anime watching options"
                  >
                    {anime.watching ? (
                      <button
                        type="button"
                        className="btn join-item"
                        onClick={() => handleWatching(anime.data.mal_id)}
                      >
                        Watching
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn join-item"
                        onClick={() => handleWatching(anime.data.mal_id)}
                      >
                        Not Watching
                      </button>
                    )}

                    <button
                      type="button"
                      className="btn btn-error join-item"
                      onClick={() => handleDelete(anime.data.mal_id)}
                    >
                      {/* <img
                      src="/icons/trash-icon.svg"
                      className="h-6 w-6"
                      alt="Delete"
                    /> */}
                      Remove
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

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  function handleDelete(anime_id: number) {
    deleteFromLibrary(anime_id, user.uid);
  }

  function handleWatching(anime_id: number) {
    toggleWatchingStatus(user.uid, anime_id);
  }
}

export default UserLibrary;
