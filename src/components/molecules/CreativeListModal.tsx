import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SaveCreativeModel } from "../molecules/SaveCreativeModal";
import { Loading } from "../Loading";
import "react-toastify/dist/ReactToastify.css";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

function SingleCreative({
  creative,
  handleSelectCreative,
  selectedCreative,
}: any) {
  const playVideo = (url: string) => {
    window.open(url);
  };
  const handleSelect = () => {
    handleSelectCreative(creative);
  };

  const isSelected = () => {
    return selectedCreative.some(
      (creative1: any) => creative1.creativeId === creative.creativeId
    );
  };

  return (
    <div
      
      title="Click to select creative"
      className={
        isSelected()
          ? "flex flex-row items-center gap-4 p-2 hover:bg-sky-300 cursor-pointer border-2 bg-yellow-400"
          : "flex flex-row items-center gap-4 p-2 hover:bg-sky-300 cursor-pointer border-2"
      }
    >
      <div>
        {creative.creativeType === "video" ? (
          <i
            className="fi fi-br-play-circle text-[]"
            onClick={() => playVideo(creative?.videoURL)}
          ></i>
        ) : (
          <i
            className="fi fi-br-picture text-[]"
            onClick={() => playVideo(creative?.videoURL)}
          ></i>
        )}
      </div>
      <div onClick={handleSelect}>
        <h1 className="text-black-700">{creative.creativeName}</h1>
      </div>

    </div>
  );
}

export function CreativesListModal(props: any) {
  const { creativeList, mediaFiles, setMediaFiles } = props;
  const [searchResult, setSearchResult] = useState<any>([]);
  const [isOpenSaveCreatives, setIsOpenSaveCreatives] =
    useState<boolean>(false);

  const handleCloseModel = () => {
    setIsOpenSaveCreatives(false);
  };

  const [selectedCreative, setSelectedCreatives] = useState<any>(
    mediaFiles || []
  );
  const [option, setOption] = useState<boolean>(true);

  const openSuccessToast = (message: string) => {
    toast.success(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const openErrorToast = (message: string) => {
    toast.error(message, {
      style: {
        marginTop: "50px",
      },
    });
  };

  const handleSelectCreative = (creative: any) => {
    let res = selectedCreative?.some(
      (creative1: any) => creative1.creativeId === creative.creativeId
    );
    if (!res) {
      setSelectedCreatives([...selectedCreative, creative]);
      openSuccessToast("Added!");
    }
  };

  const handleNext = () => {
    if (selectedCreative?.length === 0)
      openErrorToast("You have not selected any creatives");
    else {
      setMediaFiles(selectedCreative);
      setSelectedCreatives([]);
      props?.onClose();
    }
  };

  const handleClose = () => {
    setSelectedCreatives([]);
    props?.onClose();
  };

  const handleRemoveCreative = (creative: any) => {
    setSelectedCreatives(
      selectedCreative?.filter(
        (cc: any) => cc.creativeId !== creative?.creativeId
      )
    );
    openSuccessToast("Removed!");
  };

  useEffect(() => {
    if (props?.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.isOpen]);

  if (!props?.isOpen) {
    return null;
  }

  const findFromImage = (searchText: string) => {
    return creativeList?.images?.filter((creative: any) =>
      creative?.creativeName?.includes(searchText)
    );
  };

  const findFromVideo = (searchText: string) => {
    return creativeList?.videos?.filter((creative: any) =>
      creative?.creativeName?.includes(searchText)
    );
  };

  const handleSearch = (e: any) => {
    let searchValue = e.target.value;
    if (searchValue?.length > 0) {
      if (option) {
        setSearchResult(findFromImage(searchValue));
      } else {
        setSearchResult(findFromVideo(searchValue));
      }
    } else {
      setSearchResult([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-9/12 max-w-full relative overflow-auto max-h-auto no-scrollbar"
        style={{ height: "70vh", width: "50vw" }}
      >
        <SaveCreativeModel
          isOpen={isOpenSaveCreatives}
          onClose={() => handleCloseModel()}
        />
        <ToastContainer />
        <button
          className="border border-solid rounded p-2 w-42 hover:bg-yellow-400 hover:text-white"
          onClick={() => setIsOpenSaveCreatives(true)}
        >
          Add New Creatives
        </button>
        {selectedCreative?.length > 0 && (
          <div className="">
            <h1>Selected Creative</h1>
            <div className="gap-2 flex flex-wrap">
              {selectedCreative?.map((creative: any, index: number) => (
                <div
                  className="flex flex-row gap-4 w-35 h-7 px-2 justify-between items-center border-2 rounded-sm hover:bg-sky-200"
                  key={index}
                >
                  <h1>{creative?.creativeName}</h1>
                  <button
                    title="Remove"
                    className="hover:text-red-700 h-6 w-6"
                    onClick={() => handleRemoveCreative(creative)}
                  >
                    <i className="fi fi-br-circle-xmark"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <h1 className="text-black-500 py-4">Select creatives</h1>
        <div className="flex flex-row gap-8">
          <button
            onClick={() => {
              setOption((pre) => !pre);
              setSearchResult([]);
            }}
            className={
              option ? "text-blue-600 border-b-2 border-indigo-500" : ""
            }
          >
            Images
          </button>
          <button
            onClick={() => {
              setOption((pre) => !pre);
              setSearchResult([]);
            }}
            className={
              !option ? "text-blue-600 border-b-2 border-indigo-500" : ""
            }
          >
            Videos
          </button>
        </div>
        <div className="py-2">
          <input
            type="text"
            placeholder="Enter creative name to search"
            className="w-full h-8 px-2 border-2"
            onChange={handleSearch}
          ></input>
        </div>
        {props.loading ? (
          <Loading />
        ) : (
          <div className="pt-2 gap-2 flex flex-col h-[20rem] overflow-scroll">
            {option
              ? (searchResult?.length > 0
                  ? searchResult
                  : creativeList?.images
                )?.map((creative: any, index: number) => (
                  <SingleCreative
                    creative={creative}
                    key={index + 1}
                    handleSelectCreative={handleSelectCreative}
                    selectedCreative={selectedCreative}
                  />
                ))
              : (searchResult?.length > 0
                  ? searchResult
                  : creativeList?.videos
                )?.map((creative: any, index: number) => (
                  <SingleCreative
                    creative={creative}
                    key={index + 1}
                    handleSelectCreative={handleSelectCreative}
                    selectedCreative={selectedCreative}
                  />
                ))}
          </div>
        )}
        <div className="flex flex-row justify-end pt-2 gap-2">
          <PrimaryButton
            action={handleNext}
            disabled={false}
            title="Done"
          />
          <PrimaryButton
            title="Cancel"
            action={handleClose}
          />
        </div>
      </div>
    </div>
  );
}
