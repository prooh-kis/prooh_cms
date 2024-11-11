import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // Import CSS for styling
import animationData from "../../assets/lottie/loading.json";
import { Player } from "@lordicon/react";

export const Loading = (props: any) => {
  const playerRef = useRef<Player>(null);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // Lottie options configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    playerRef.current?.playFromBeginning();

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingComplete(true); // Mark loading as complete
          return 100;
        }
        return prev + 1; // Increment progress by 1%
      });
    }, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loading-container ${loadingComplete ? "collapse" : ""}`}>
      {/* <Lottie
        options={defaultOptions}
        height={props.height || 300}
        width={props.width || 300}
        isStopped={loadingComplete} // Stop animation when loading completes
      /> */}
      <Player ref={playerRef} icon={animationData} />
      {props?.slider && (
        <div className="loading-slider">
          <div
            className="loading-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Optionally show progress text */}
      {/* <span className="loading-text">{progress}%</span> */}
    </div>
  );
};
