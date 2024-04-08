function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200 pb-60">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img
            src="../public/icons/anime.svg"
            className="w-1/2 mx-auto mb-8"
            alt=""
          />
          <h1 className="text-5xl font-bold text-pretty">
            Discover Animes to Watch.
          </h1>
          <p className="py-6">
            Find your next anime based on your favorite animes.
            <br />
            Start by clicking on the search bar on top
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
export default Hero;
