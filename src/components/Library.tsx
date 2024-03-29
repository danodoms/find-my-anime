import { useEffect, useState } from "react";

function Library({ animeList = [1] }) {
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    if (animeList.length > 0) {
      fetchAllAnimes();
    }
  }, []);

  return renderLibrary();

  function renderLibrary() {
    if (animeList.length > 0) {
      return renderLibraryWithContent();
    } else {
      return renderNoLibrary();
    }
  }

  function renderNoLibrary() {
    return (
      <div className="container rounded gx-0 gy-0">
        <div className="row rounded bg-black">
          <div className="col p-4">
            <h4 className="m-0 mb-1"> Your Library is Empty</h4>
            <p className="weight-regular m-0">
              Add Animes to Your Library by clicking on "Add to Library"
            </p>
          </div>
        </div>
      </div>
    );
  }

  function renderLibraryWithContent() {
    return (
      <div className="container rounded gx-0 gy-0">
        {library.map((anime: number, id: any) => {
          console.log("title: ", anime.data.title);
          return (
            <div key={id} className="row rounded bg-black">
              <p className="weight-regular m-0">{anime.data.title}</p>
            </div>
          );
        })}
      </div>
    );
  }

  async function fetchAllAnimes() {
    const promises = animeList.map((anime_id: number) =>
      getAnimeDetails(anime_id)
    );
    const results = await Promise.all(promises);
    setLibrary(results);
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
