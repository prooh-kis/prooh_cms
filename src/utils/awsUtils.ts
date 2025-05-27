import Axios from "axios";

export const getAWSUrlToUploadFile = async ({ contentType, name }: any) => {
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_PROOH_SERVER}/api/v1/aws/getURLForFileUplaod`,
      { contentType, name }
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

export const getAWSUrl = async (file: any) => {
  // console.log("getAWSUrl : ", file);
  try {
    const aws = await getAWSUrlToUploadFile(
      {
        contentType: file.type?.split(".")[0],
        name: file?.name?.split(".")[0]
      }
    );
    const successAWSUploadFile = await saveFileOnAWS(aws?.url, file);
    return aws?.awsURL;
  } catch (error: any) {
    throw new Error(error);
  }
};
