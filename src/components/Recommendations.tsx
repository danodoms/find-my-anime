import ReactPlayer from "react-player";

function Recommendations() {
  return (
    <div className="container rounded gx-0 gy-0">
      <div className="row rounded bg-black">
        <div className="col p-4">
          <h2 className="">Frieren: Beyond Journey's End</h2>
          <p className="synopsis weight-regular">
            It follows an elf mage, Frieren, after she and her companions defeat
            the Demon King and go back to their regular lives. Except Frieren is
            near-immortal, and the rest of the party is human. She spends the
            next fifty years off exploring and learning more magic... while her
            former companions age and approach death.
          </p>

          <div className="row gap-2">
            <div className="col text-align-center">
              <button
                className="btn"
                onClick={() => {
                  this.refs.player.playing(true);
                }}
              >
                Play
              </button>
              <button className="btn">I like this</button>
              <button className="btn">Next</button>
            </div>
          </div>
        </div>

        <div className="col relative rounded gx-0">
          <div className="col bg-primary gx-0 gy-0">
            <div className="gradient-overlay"></div>
          </div>
          <ReactPlayer
            style={{ borderRadius: "10px" }}
            className="rounded relative d-flex"
            url="https://www.youtube.com/watch?v=itKPyGXrCVA"
            playing={true}
            loop
            volume={0} // mute the audio initially
            onReady={() => {
              // @ts-ignore
              this.refs.player.seekTo(0); // go back to beginning
              // @ts-ignore
              this.refs.player.volume = 0.8; // fade volume up over 0.5 seconds
              // @ts-ignore
              this.refs.player.fadeIn(0.5);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
