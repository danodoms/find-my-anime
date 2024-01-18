function SearchResults({ results = [] }) {
  if (!Array.isArray(results)) {
    return <p>No results</p>;
  }

  return (
    <ul className="list-group">
      {results.map((result: any, id: any) => {
        return (
          <li className="list-group-item" key={id}>
            {result.title_english}
          </li>
        );
      })}
    </ul>
  );
}

export default SearchResults;
