import { message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { downloadExcel } from "../../utils/ExcelUtils";
import { analyticsV1 } from "../../constants/urlConsent";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import SearchInputField from "../../components/molecules/SearchInputField";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { Loading } from "../../components/Loading";

export const AllCampaignLogsPopup = ({
  open,
  onClose,
  campaigns,
  screens,
  loadingScreens,
  campaignCreated,
}: any) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState<number>(0);
  const [isStop, setIsStop] = useState<boolean>(false);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedScreens, setSelectedScreens] = useState<string[]>([]);
  const [recentlyDownloadedScreens, setRecentlyDownloadedScreens] = useState<
    string[]
  >([]);

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
      setTime((prevTime) => prevTime + 1); // Increase time by 1 second
    }, 1000); // Update every second

    setIntervalId(id); // Store the interval ID to clear later

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

        const campaignIds = campaigns
          ?.filter((camp: any) => selectedScreens?.includes(camp.screenId))
          ?.map((camp: any) => camp?._id);

        for (let i = 0; i < campaignIds.length; i++) {
          try {
            console.log("i : ", i);
            const { data } = await axios.get(
              `${analyticsV1}/getAllCampaignLogs?campaignId=${campaignIds[i]}`
            );
            console.log("data found", i);
            await downloadExcel({
              campaign: data?.campaign,
              campaignLog: data?.logs,
            });
            setCount((pre: number) => pre + 1);
            const screenId = campaigns.find(
              (camp: any) => camp?._id === campaignIds[i]
            )?.screenId;
            setRecentlyDownloadedScreens((pre: any) =>
              Array.from(new Set([...pre, screenId]))
            );
            console.log("file downloaded", i);
          } catch (error: any) {
            message.error(error);
          }
        }
        message.success("All files downloaded");
        setIsDownloading(false);
        stopTimer();
        setSelectedScreens([]);
      }
    } else {
    }
  };

  function formatTime(seconds: number) {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    // Format time as HH:MM:SS
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div
        className="bg-white p-4 px-8 shadow-lg w-9/12 max-w-full relative max-h-auto rounded-[20px] "
        style={{ height: "90vh", width: "60vw" }}
      >
        <div className="flex items-center justify-between">
          <h1 className="py-4 text-lg font-bold text-[20px]">
            Download All Campaigns Logs{" "}
          </h1>
          <i
            onClick={() => onClose()}
            className="fi fi-rr-cross-small text-[20px]"
          ></i>
        </div>
        <PrimaryButton
          action={handleGetLogData}
          title="Download logs"
          loading={isDownloading}
          loadingText="Downloading , please wait......"
          width="w-full"
        />
        {isDownloading && (
          <>
            <h1 className="text-[#348730] bg-green-200 p-4 mt-4">
              Total campaign Downloaded{" "}
              <span className="text-green-700">{count}</span>
            </h1>
            <h1>Time take to complete task : {formatTime(time)}</h1>
            {campaigns?.length === 0 && (
              <h1 className="text-lg text-red-600 bg-red-200 p-4">
                No Campaign to download report
              </h1>
            )}
          </>
        )}

        {isDownloading && (
          <div className="flex flex-col justify-center items-center">
            <div className="animate-spin border-t-4 border-[#129BFF] border-solid rounded-full w-16 h-16 mb-4"></div>
            <span className="text-xl text-gray-700">Downloading...</span>
          </div>
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
                  title="Click to select screen to view monitoring data"
                  onClick={() => handelSelectScreen(screen?._id)}
                >
                  <input
                    title="q"
                    type="checkbox"
                    defaultChecked={false}
                    checked={selectedScreens?.includes(screen?._id)}
                  />
                  <ScreenListMonitoringView
                    screen={screen}
                    noImages={false}
                    showOption={false}
                    campaignCreated={campaignCreated}
                  />
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
