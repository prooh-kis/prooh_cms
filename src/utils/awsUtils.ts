import Axios from "axios";

export const getAWSUrlToUploadFile = async (contentType: String) => {
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_PROOH_SERVER}/api/v1/aws/getURLForFileUplaod`,
      { contentType }
      // {
      //   headers: {
      //     Authorization: `Bearer ${userInfo?.token}`,
      //   },
      // }
    );
    return data;
  } catch (error) {
    console.log("Not able to get aws file url");
    throw new Error("Error while getting aws url");
  }
};

export const saveFileOnAWS = async (url: string, file: File) => {
  try {
    console.log("Calling function to save file aws");
    const { data } = await Axios.put(url, file, {
      headers: {
        "Content-Type": file?.type,
      },
    });
    console.log("file upload successfully on aws");
    return "success";
  } catch (error) {
    console.log("Not able to save file on aws");
    throw new Error("Error saving on aws");
  }
};
