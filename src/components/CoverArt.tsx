// import "bootstrap/dist/css/bootstrap.min.css";

function CoverArt({ title, image }: any) {
  return (
    <div className="row p-4 primary-bg rounded flex-wrap gx-0">
      <div className="col-2 align-items-center">
        <img className="img-fluid rounded" src={image} alt="anime image" />
      </div>

      <div className="col justify-content-start align-content-center">
        <div className="row">
          <div className="col dark-text ">
            <p className="title display-5 title dark-text">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverArt;
