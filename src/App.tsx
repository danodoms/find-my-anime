import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";

function App() {
  const content = (
    <>
      {" "}
      <div className="container">
        <div className="row">
          <div className="col left-side">
            <h1>IT'S BEEN RAINING IN MA AREA</h1>
            <SearchBar />
          </div>
          <div className="col right-side"></div>
        </div>
      </div>
    </>
  );

  return content;
}

export default App;
