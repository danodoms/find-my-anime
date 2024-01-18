import { useState } from "react";

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

  const fetchData = async (value: string) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${value}`);
      const data = await response.json();

      setResults(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleOnChange(value: string): void {
    setAnime(value);
    fetchData(value);
    console.log(anime);
  }

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
