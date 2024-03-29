import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

function Library({ userProp, loading, error }: LibraryProps) {
  const [user] = useState(userProp);
  const [library, setLibrary] = useState([]);

  interface LibraryProps {
    userProp: object;
    loading: boolean;
    error?: Error; // Optional, assuming error might not always be provided
  }

  useEffect(() => {
    console.log("current user state: ", user);
    const fetchData = async () => {
      if (user) {
        const animeList = await fetchUserAnimes();
        await fetchAllAnimes(animeList);
        console.log("fetching anime ids from firestore");
      }
    };

    fetchData();
  }, [user]);

  return renderLibrary();

  async function fetchUserAnimes() {
    if (!user) {
      console.error("No user logged in");
      return;
    }

    try {
      // const colRef = collection(db, "animeList");
      // const q = query(colRef, where("user_id", "==", user.uid));

      const getAnimes = await getDocs(collection(db, "animeList"));
      const animes = [];

      getAnimes.forEach((doc) => {
        animes.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return animes[0].anime_ids;
    } catch (error) {
      console.error("Failed to fetch user animes:", error);
    }
  }

  // function renderLibrary() {
  //   if (animeList.length > 0) {
  //     return renderLibraryWithContent();
  //   } else {
  //     return renderNoLibrary();
  //   }
  // }

  // function renderNoLibrary() {
  //   return (
  //     <div className="container rounded gx-0 gy-0">
  //       <div className="row rounded bg-black">
  //         <div className="col p-4">
  //           <h4 className="m-0 mb-1"> Your Library is Empty</h4>
  //           <p className="weight-regular m-0">
  //             Add Animes to Your Library by clicking on "Add to Library"
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  function renderLibrary() {
    return (
      <div className="container rounded gx-0 gy-0">
        <div className="row rounded bg-black">
          <div className="row p-0 primary-bg rounded">
            {loading ? (
              <>
                <h4 className="m-0 mb-1 col">Sign in</h4>
                <button className="btn">Sign in</button>
              </>
            ) : (
              <>
                <img
                  className="col-sm-1 circular square-img p-3"
                  src={user?.photoURL}
                  alt="user profile picture"
                />
                <h5 className="m-0 dark-text col align-self-center">
                  Signed in as {user?.displayName}
                </h5>
                <button className="btn col-4 ">Sign out</button>
              </>
            )}
          </div>

          {library.map((anime: number, id: any) => {
            console.log("title: ", anime.data.title);
            return (
              <div key={id} className="row rounded bg-black">
                <p className="weight-regular m-0">{anime.data.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  async function fetchAllAnimes(animeList: []) {
    const promises = animeList.map((anime_id: number) =>
      getAnimeDetails(anime_id)
    );
    const results = await Promise.all(promises);
    setLibrary(results);
    console.log("library: ", library);
  }

  async function getAnimeDetails(anime_id: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime_id}/full`
      );
      const data = await response.json();
      console.log(data);
      return data; // Return the fetched data directly
    } catch (error) {
      console.error(error);
      return null; // Return null or an appropriate value in case of an error
    }
  }
}

export default Library;
