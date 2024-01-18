import { useState } from "react";
import { debounce } from "lodash";

function SearchBar({ setResults }: any) {
  // TODO: Add a search bar component that allows users to search for locations.
  const [anime, setAnime] = useState("");

  //   const fetchData = (value: string) => {
  //     const results = fetch(`https://api.jikan.moe/v4/anime?q=${value}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const results = data;
  //         console.log(results);
  //       })
  //       .catch((error) => console.log(error));

  //     setResults(results);
  //   };

  async function fetchData(value: string): Promise<void> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${value}`);
      const data = await response.json();
      console.log("Fetching data...");

      setResults(data.data);
    } catch (error) {
      console.error(error);
    }
    // console.log(anime);
  }

  function handleOnChange(anime: string): void {
    setAnime(anime);
    debouncedRequest(anime);
    // fetchData(anime);
    // console.log(anime);
  }

  const debouncedRequest = debounce((anime: string) => fetchData(anime), 300);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Anime"
            value={anime}
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
