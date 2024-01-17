import { useState } from "react";

function SearchBar() {
  // TODO: Add a search bar component that allows users to search for locations.
  const [location, setLocation] = useState("");

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
    console.log(location);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Location"
            value={location}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
