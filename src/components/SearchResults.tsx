function SearchResults({ results = [], setSelectedAnime }: any) {
  if (!Array.isArray(results)) {
    return <p>Results is not an array</p>;
  }

  return (
    <div className="container">
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
              }}
            >
              {result.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
