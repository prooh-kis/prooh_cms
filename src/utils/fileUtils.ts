// using promise
export const getVideoDurationFromVideoURL = (url: string) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement("video");
    video.src = url;
    video.addEventListener("loadedmetadata", function () {
      let duration = video.duration;
      // console.log("getVideoDurationFronVideoURL : ", duration);
      resolve(duration);
    });
  });
};

export const getVideoResolution = (url: string) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
  });
};

export const getImageResolution = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};
