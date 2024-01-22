import ReactPlayer from "react-player";
import { useState } from "react";

function Recommendations({ recommendations = [] }) {
  const [url, setUrl] = useState("https://www.youtube.com/watch?v=itKPyGXrCVA");
  const [playing, setPlaying] = useState(true);
  const [controls, setControls] = useState(true);
  const [muted, setMuted] = useState(true);
  const [loop, setLoop] = useState(true);

  const [title, setTitle] = useState("Frieren: Beyond Journey's End");
  const [synopsis, setSynopsis] = useState(
    "It follows an elf mage, Frieren, after she and her companions defeat the Demon King and go back to their regular lives. Except Frieren is near-immortal, and the rest of the party is human. She spends the next fifty years off exploring and learning more magic... while her former companions age and approach death."
  );

  let [index, setIndex] = useState(0);

  function handleNext() {
    console.log(recommendations);
    setIndex(index++);
    console.log("Index: ", recommendations.length);
  }

  return (
    <div className="container rounded gx-0 gy-0">
      <div className="row rounded bg-black">
        <div className="col p-4">
          <h2 className="">{title}</h2>
          <p className="synopsis weight-regular">{synopsis}</p>

          <div className="row gap-2">
            <div className="col gx-0 gy-0">
              <button
                className="btn"
                onClick={() => {
                  setMuted(!muted);
                }}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button className="btn">I like this</button>
              <button className="btn" onClick={handleNext}>
                Next
              </button>
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
            url={url}
            playing={playing}
            muted={muted} //must be muted to enable autoplay feature (not in all cases)
            controls={false}
            loop
            onReady={() => {}}
            onStart={() => {
              setMuted(false);
              // @ts-ignore
              this.player.volume = 0.8; // fade volume up over 0.5 seconds
              // @ts-ignore
              this.player.fadeIn(0.5);
              //@ts-ignore
              this.player.seekTo(30);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Recommendations;
