// import "bootstrap/dist/css/bootstrap.min.css";

function CoverArt({ title, image }: any) {
  return (
    <div className="row bg-black rounded flex-wrap gx-0">
      <div className="col-2 p-2 align-items-center">
        <img className="img-fluid rounded" src={image} alt="anime image" />
      </div>

      <div className="col justify-content-start align-content-center">
        <div className="row">
          <div className="col border p-4">
            <h5 className="m-0">Selected Anime</h5>
            <h2 className="title m-0">{title}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverArt;
