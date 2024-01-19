import "bootstrap/dist/css/bootstrap.min.css";

function CoverArt({ title, image }: any) {
  return (
    <div className="container">
      <div className="row">
        <img className="img-fluid rounded" src={image} alt="anime image" />
      </div>

      <div className="row">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default CoverArt;
