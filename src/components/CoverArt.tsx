// import "bootstrap/dist/css/bootstrap.min.css";

function CoverArt({ title, image }: any) {
  return (
    <div className="row h-100 bg-black rounded flex-wrap gx-0 gy-0">
      {title == "" ? (
        <div className="col align-self-center border p-4">
          <h5 className="m-0">Select your anime</h5>
          <p className="weight-regular m-0">
            Think about the animes you've loved so far
          </p>
        </div>
      ) : (
        <>
          <div className="row gap-4 p-4 rounded align-items-center flex-no-wrap justify-content-center gx-0">
            <div className="col align-items-center">
              <img
                className="img align-self-center rounded"
                src={image}
                alt="cover"
              />
            </div>

            <div className="col-10 justify-content-start align-self-center">
              <h5 className="m-0">Selected Anime</h5>
              <h2 className="title m-0">{title}</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoverArt;
