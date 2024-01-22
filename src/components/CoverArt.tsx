// import "bootstrap/dist/css/bootstrap.min.css";

function CoverArt({ title, image }: any) {
  return (
    <div className="row bg-black rounded flex-wrap gx-0">
      <div className="col-3 p-2 align-items-center">
        <img className="img-fluid rounded" src={image} alt="anime image" />
      </div>

      <div className="col justify-content-start align-content-center">
        <div className="row">
          <div className="col dark-text border p-4 align-items-center">
            <p className="title display-6 m-0">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverArt;
