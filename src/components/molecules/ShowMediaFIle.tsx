export function ShowMediaFile(props: any) {
  const { url, mediaType, width, height } = props;
  return (
    <div className={`flex justify-center items-center ${height ? height : "h-32"} ${width ? width : "w-40"}`}>
      {mediaType === "url" ? (
        <iframe
          className="h-full w-full rounded"
          src={url}
          title="description"
        ></iframe>
      ) : mediaType === "image" ? (
        <img src={url} alt="Campaign Image" className="rounded h-full w-full" />
      ) : (
        <video className="h-full w-full rounded" controls>
          <source src={url}></source>
        </video>
      )}
    </div>
  );
}