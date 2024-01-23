function SearchResults({
  results = [],
  setSelectedAnime,
  setRecommendations,
}: any) {
  if (!Array.isArray(results)) {
    return <p>Results is not an array</p>;
  }

  return (
    <div className="container position-absolute">
      <ul
        className="list-group"
        style={{ overflow: "auto", maxHeight: "50vh", display: "float" }}
      >
        {results.map((result: any, id: any) => {
          return (
            <li
              className="list-group-item"
              key={id}
              onClick={() => {
                const selectedAnime = {
                  id: result.mal_id,
                  title: result.title,
                  image: result.images.jpg.image_url,
                };

                setSelectedAnime(selectedAnime);
                getRecommendations(selectedAnime.id);
                SearchResults([]);
              }}
            >
              {result.title}
            </li>
          );
        })}
      </ul>
    </div>
  );

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
