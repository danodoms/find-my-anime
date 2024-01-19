function CoverArt({ title }: any, { image }: any) {
  return (
    <div className="container">
      <div className="row">
        <img src={image} alt="anime image" />
      </div>

      <div className="row">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default CoverArt;
