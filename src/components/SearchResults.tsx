import { useContext } from "react";

import { ResultsContext } from "../App";
import SearchBar from "./SearchBar";

function SearchResults({
  setResults,
  results = [],
  setSelectedAnime,
  setRecommendations,
}: any) {
  const [resultsContext, setResultsContext] = useContext(ResultsContext);
  // const { setResults } = useContext(ResultsContext);
  console.log(resultsContext); //only used for removing the resultsCONtext warning
  if (!Array.isArray(results)) {
    return <p>Results is not an array</p>;
  }

  return (
    <div className="flex-auto">
      <div className={`dropdown ${results.length > 0 ? "dropdown-open" : ""}`}>
        <SearchBar setResults={setResults} />

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box overflow-y-scroll"
        >
          {results.map((result: any, id: any) => {
            return (
              <li
                className=""
                key={id}
                onClick={() => {
                  const selectedAnime = {
                    id: result.mal_id,
                    title: result.title,
                    image: result.images.jpg.image_url,
                  };

                  setSelectedAnime(selectedAnime);
                  getRecommendations(selectedAnime.id);
                  setResultsContext([]);
                  console.log("selected anime: ", selectedAnime.title);
                }}
              >
                <a>{result.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );

  // return (
  //   <div className="container position-absolute">
  //     <ul
  //       className="list-group"
  //       style={{ overflow: "auto", maxHeight: "50vh", display: "float" }}
  //     >
  //       {results.map((result: any, id: any) => {
  //         return (
  //           <li
  //             className="list-group-item"
  //             key={id}
  //             onClick={() => {
  //               const selectedAnime = {
  //                 id: result.mal_id,
  //                 title: result.title,
  //                 image: result.images.jpg.image_url,
  //               };

  //               setSelectedAnime(selectedAnime);
  //               getRecommendations(selectedAnime.id);
  //               setResultsContext([]);
  //             }}
  //           >
  //             {result.title}
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );

  async function getRecommendations(anime_id: number): Promise<any> {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${anime_id}/recommendations`
      );
      const data = await response.json();

      console.log("Fetching data...");

      setRecommendations(data.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default SearchResults;
