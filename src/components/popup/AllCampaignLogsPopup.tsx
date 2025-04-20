import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { downloadExcel } from "../../utils/ExcelUtils";
import { analyticsV1 } from "../../constants/urlConsent";
import SearchInputField from "../../components/molecules/SearchInputField";
import { Loading } from "../../components/Loading";
import ButtonInput from "../../components/atoms/ButtonInput";

export const AllCampaignLogsPopup = ({
  open,
  onClose,
  campaigns,
  screens,
  loadingScreens,
}: any) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isStop, setIsStop] = useState<boolean>(false);
  const [selectedScreens, setSelectedScreens] = useState<string[]>([]);
  const [recentlyDownloadedScreens, setRecentlyDownloadedScreens] = useState<
    string[]
  >([]);
  const [downloadProgress, setDownloadProgress] = useState<{
    [key: string]: number;
  }>({});
  const [currentDownloading, setCurrentDownloading] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredScreens = screens?.filter((screen: any) =>
    screen?.screenName?.toLowerCase().includes(searchQuery)
  );

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const startInterval = () => {
    const id = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    setIntervalId(id);

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  };

  const validateDownload = () => {
    if (selectedScreens?.length === 0) {
      message.error("Please select screens!");
      return false;
    } else if (selectedScreens?.length > 20) {
      message.error("You can select only 20 screens max!");
      return false;
    } else {
      return true;
    }
  };

  const handleGetLogData = async () => {
    if (validateDownload() && confirm("Do you really want to download logs?")) {
      if (!isStop) {
        setIsDownloading(true);
        startInterval();
        setDownloadProgress({});
        setCount(0);

        const campaignIds = campaigns
          ?.filter((camp: any) => selectedScreens?.includes(camp.screenId))
          ?.map((camp: any) => camp?._id);

        for (let i = 0; i < campaignIds.length; i++) {
          const campaignId = campaignIds[i];
          const screenId = campaigns.find(
            (camp: any) => camp?._id === campaignId
          )?.screenId;

          try {
            setCurrentDownloading(screenId);
            setDownloadProgress((prev) => ({ ...prev, [screenId]: 0 }));

            const { data } = await axios.get(
              `${analyticsV1}/downloadAllCampaignLogs?campaignId=${campaignId}`,
              {
                onDownloadProgress: (progressEvent) => {
                  if (progressEvent.total) {
                    const percentCompleted = Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setDownloadProgress((prev) => ({
                      ...prev,
                      [screenId]: percentCompleted,
                    }));
                  }
                },
              }
            );

            await downloadExcel({
              campaign: data?.campaign,
              campaignLog: data?.logs,
            });

            setCount((pre: number) => pre + 1);
            setRecentlyDownloadedScreens((pre: any) =>
              Array.from(new Set([...pre, screenId]))
            );
            setDownloadProgress((prev) => ({ ...prev, [screenId]: 100 }));
          } catch (error: any) {
            message.error(error);
            setDownloadProgress((prev) => ({ ...prev, [screenId]: -1 })); // -1 indicates error
          } finally {
            setCurrentDownloading("");
          }
        }
        message.success("All files downloaded");
        setIsDownloading(false);
        stopTimer();
      }
    }
  };

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  if (!open) {
    return null;
  }

  const stopDownload = () => {
    setIsStop(true);
    stopTimer();
    setIsDownloading(false);
  };

  const handelSelectScreen = (screenId: string) => {
    if (selectedScreens?.length + 1 > 20) {
      message.error(
        "You can select only 20 screens at a time, please filter screens or select one by one"
      );
    } else {
      let newSelectedScreen = [];
      const data = campaigns?.find((data: any) => data?.screenId == screenId);
      if (selectedScreens?.includes(data?.screenId)) {
        newSelectedScreen = selectedScreens?.filter(
          (id: string) => id != screenId
        );
      } else {
        newSelectedScreen = [...selectedScreens, screenId];
      }
      setSelectedScreens(newSelectedScreen);
    }
  };

  const handleSelectAllScreens = (checked: boolean) => {
    if (filteredScreens?.length + selectedScreens?.length > 20) {
      message.error(
        "You can select only 20 screens at a time, please filter screens or select one by one"
      );
    } else if (!checked) {
      const data = selectedScreens?.filter(
        (screenId) =>
          !filteredScreens?.map((screen: any) => screen?._id).includes(screenId)
      );
      setSelectedScreens(Array.from(new Set(data)));
    } else {
      const data = [
        ...selectedScreens,
        ...filteredScreens?.map((screen: any) => screen._id),
      ];
      setSelectedScreens(Array.from(new Set(data)));
    }
  };

  const getProgressBarColor = (progress: number) => {
    if (progress === -1) return "bg-red-500"; // Error state
    if (progress < 30) return "bg-blue-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div
        className="bg-white p-4 px-8 shadow-lg w-9/12 max-w-full relative max-h-auto rounded-[20px] "
        style={{ height: "90vh", width: "60vw" }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-[20px]">
            Download All Campaigns Logs{" "}
          </h1>
          <div className="flex gap-2">
            <ButtonInput
              onClick={handleGetLogData}
              loading={isDownloading}
              loadingText="Downloading , please wait......"
            >
              Download logs
            </ButtonInput>
            <i
              onClick={() => onClose()}
              className="fi fi-rr-cross-small text-[20px]"
            ></i>{" "}
          </div>
        </div>
        {isDownloading && (
          <>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h1 className="text-[#348730] font-semibold">
                Total campaign Downloaded:{" "}
                <span className="text-green-700">{count}</span> /{" "}
                {selectedScreens.length}
              </h1>
              <h1 className="mt-2">Time taken: {formatTime(time)}</h1>
              {currentDownloading && (
                <div className="mt-4">
                  <h2 className="text-sm font-medium mb-1">
                    Currently downloading:{" "}
                    {screens.find((s: any) => s._id === currentDownloading)
                      ?.screenName || currentDownloading}
                  </h2>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getProgressBarColor(
                        downloadProgress[currentDownloading] || 0
                      )}`}
                      style={{
                        width: `${downloadProgress[currentDownloading] || 0}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1">
                    {downloadProgress[currentDownloading] === -1
                      ? "Download failed"
                      : `${downloadProgress[currentDownloading] || 0}%`}
                  </p>
                </div>
              )}
            </div>
            {campaigns?.length === 0 && (
              <h1 className="text-lg text-red-600 bg-red-200 p-4 mt-4">
                No Campaign to download report
              </h1>
            )}
          </>
        )}

        <div className="items-center py-4">
          <SearchInputField
            placeholder="Search screens by name"
            height="h-8"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>
        <div className="flex justify-between p-2">
          <div className="flex gap-4">
            <input
              title="q"
              type="checkbox"
              value="Checked All"
              id="Select All"
              defaultChecked={false}
              checked={selectedScreens?.length === filteredScreens?.length}
              onChange={(e) => handleSelectAllScreens(e.target.checked)}
            />
            <label htmlFor="Individual">Select All</label>
            <button
              className="hover:text-[#129BFF]"
              onClick={() => setSelectedScreens([])}
            >
              Reset
            </button>
          </div>
          <h1>Total screen selected: {selectedScreens?.length}</h1>
          <h1>
            Total campaign selected:{" "}
            {
              campaigns?.filter((camp: any) =>
                selectedScreens?.includes(camp.screenId)
              )?.length
            }
          </h1>
        </div>
        {loadingScreens ? (
          <Loading />
        ) : (
          <div className="h-[40vh] overflow-y-auto scrollbar-minimal px-4">
            {filteredScreens?.map((screen: any, k: any) => (
              <div className="flex justify-between " key={k}>
                <div
                  className="p-0 m-0 flex gap-4"
                  title="Click to select screen to view monitoring data hover:border"
                  onClick={() => handelSelectScreen(screen?._id)}
                >
                  <input
                    title="q"
                    type="checkbox"
                    defaultChecked={false}
                    checked={selectedScreens?.includes(screen?._id)}
                  />
                  <div className="col-span-7 truncate flex flex-col gap-1">
                    <h1 className="text-[16px] text-[#294558] font-semibold truncate">
                      {screen?.screenName}
                    </h1>
                    <div className="flex gap-2 text-[12px] text-[#6B8494]">
                      <i className="fi fi-sr-marker"></i>
                      <h1 className="truncate">
                        {screen?.location?.address || screen?.location},{" "}
                        {screen?.location?.city || screen?.city}
                      </h1>
                    </div>
                    {downloadProgress[screen._id] !== undefined && (
                      <div className="w-full mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${getProgressBarColor(
                              downloadProgress[screen._id]
                            )}`}
                            style={{
                              width: `${Math.max(
                                0,
                                downloadProgress[screen._id]
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-right">
                          {downloadProgress[screen._id] === -1
                            ? "Failed"
                            : downloadProgress[screen._id] === 100
                            ? "Completed"
                            : `${downloadProgress[screen._id]}%`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {recentlyDownloadedScreens?.includes(screen?._id) ? (
                  <h1 className="text-[#348730] pt-4">Downloaded</h1>
                ) : (
                  <h1 className="text-red-500 pt-4">Not Download</h1>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
