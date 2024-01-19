function SearchResults({ results = [] }) {
  if (!Array.isArray(results)) {
    return <p>No results</p>;
  }

  return (
    <div className="container position-absolute">
      <ul
        className="list-group"
        style={{ overflow: "auto", maxHeight: "50vh", display: "float" }}
      >
        {results.map((result: any, id: any) => {
          return (
            <li className="list-group-item" key={id}>
              {result.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
