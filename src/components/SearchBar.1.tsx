import { useState } from "react";
import { debounce } from "lodash";

export function SearchBar({ setResults }: any) {
  const [anime, setAnime] = useState("");

  async function fetchData(anime: string): Promise<any> {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}`);
      const data = await response.json();
      console.log("Fetching data...");

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  function handleOnChange(anime: string): void {
    setAnime(anime);
    //setResults(fetchData(anime));
    setResults(debouncedRequest(anime));
  }

  const debouncedRequest = debounce(
    async (anime: string) => await fetchData(anime),
    300
  );

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
