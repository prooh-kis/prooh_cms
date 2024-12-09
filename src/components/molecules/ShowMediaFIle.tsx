import { useEffect, useRef, useState } from "react";

export function ShowMediaFile(props: any) {
  const { url, mediaType, width, height } = props;
  const [mediaUrl, setMediaUrl] = useState<any>(url);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (url) {
      setMediaUrl(url);
      // Force reload for video elements
      if (mediaType === "video" && videoRef.current) {
        videoRef.current.load();
      }
    }
  }, [url, mediaType])
  return (
    <div className={`border rounded relative flex justify-center items-center ${height ? height : "h-32"} ${width ? width : "w-60"}`}>
      {mediaType === "video" ? (
        <div className="relative h-full w-full">
          <video ref={videoRef} className="h-full w-full rounded" controls>
            <source src={mediaUrl}></source>
          </video>
        </div>
      ) : mediaType === "image" ? (
        <img src={mediaUrl} alt="Campaign Image" className="rounded h-full w-full" />
      ) : (
        <iframe
          className="h-full w-full rounded"
          src={mediaUrl}
          title="description"
        ></iframe>
      )}
    </div>
  );
}