import { useState } from "react";
import { debounce } from "lodash";
import "@fortawesome/fontawesome-svg-core/styles.css";

function SearchBar({ setResults }: any) {
  // const [searchTerm, setSearchTerm] = useState("");

  async function fetchData(searchTerm: string): Promise<any> {
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
    // setSearchTerm(searchTerm);
    console.log;

    if (!searchTerm) {
      setResults([]);
      return;
    }

    fetchData(searchTerm);
  }, 500);

  return (
    <div className="form-control flex-auto justify-items-end">
      <input
        type="text"
        className="input input-bordered flex-auto "
        id="searchBar"
        placeholder="Search your favorite anime"
        onChange={(e) => debouncedRequest(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
