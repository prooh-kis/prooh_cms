import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export const PlayLiveUrl: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://d3vzzurgwj985w.cloudfront.net/index.m3u8";

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
      });

      return () => {
        hls.destroy(); // Cleanup on unmount
      };
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-[-10px] mb-[-10px]">
      <video ref={videoRef} controls width="100%" height="auto" />;
    </div>
  );
};
