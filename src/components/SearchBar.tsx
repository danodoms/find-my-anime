import { useState } from "react";
import { debounce } from "lodash";

function SearchBar({ setResults }: any) {
  const [searchTerm, setSearchTerm] = useState("");

  async function fetchData(): Promise<any> {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
      );
      const data = await response.json();
      console.log("Fetching data...");

      setResults(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const debouncedRequest = debounce((searchTerm: string) => {
    setSearchTerm(searchTerm);

    if (!searchTerm) {
      setResults([]);
      return;
    }

    fetchData();
  }, 500);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Anime"
            onChange={(e) => debouncedRequest(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
