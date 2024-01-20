import ReactPlayer from "react-player";

function Recommendations() {
  return (
    <div className="container rounded gx-0 gy-0">
      <div className="row rounded bg-black">
        <div className="col p-4">
          <h2 className="">Frieren: Beyond Journey's End</h2>

          <div className="row gap-2">
            <div className="col text-align-center">
              <button className="btn">I like this</button>
              <button className="btn">Next</button>
            </div>
          </div>
        </div>
        <div className="col rounded gx-0">
          <ReactPlayer
            className="rounded"
            url="https://www.youtube.com/watch?v=itKPyGXrCVA"
            playing // will autoplay
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

      {/* <div className="gradient-overlay"></div> */}
    </div>
  );
}

export default Recommendations;
