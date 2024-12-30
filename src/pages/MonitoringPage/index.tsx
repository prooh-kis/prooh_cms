import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  getAllScreensDetailsAction,
  getScreenCampaignsDetailsAction,
  screenCampaignsMonitoringAction,
} from "../../actions/screenAction";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import {
  ALL_SCREENS_LIST,
  SCREEN_CAMPAIGN_MONITORING_PICS,
} from "../../constants/localStorageConstants";
import { getAllDatesBetween } from "../../utils/dateAndTimeUtils";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import { CampaignListMonitoringView } from "../../components/molecules/CampaignListMonitoringView";
import { CalendarPopup } from "../../components/popup/CalendarPopup";
import { MonitoringPictures } from "../../components/Segment/MonitoringPictures";
import { UploadMonitoringPicturesPopup } from "../../components/popup/UploadMonitoringPicturesPopup";
import { NoDataView, SearchInputField } from "../../components";

const time = ["day", "night", "misc"];
const pictures = ["images", "video", "geoTag", "newspaper"];

export const MonitoringPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [allDates, setAllDates] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [searchQueryForCampaign, setSearchQueryForCampaign] = useState<any>("");

  const [monitoringScreen, setMonitoringScreen] = useState<any>(null);
  const [monitoringCampaign, setMonitoringCampaign] = useState<any>(null);
  const [monitoringDate, setMonitoringDate] = useState<any>(new Date());
  const [monitoringTime, setMonitoringTime] = useState<any>(time[0]);
  const [monitoringMedia, setMonitoringMedia] = useState<any>(pictures[0]);
  const [fileType, setFileType] = useState<string>("any");

  const [monitoringData, setMonitoringData] = useState<any>(
    getDataFromLocalStorage(SCREEN_CAMPAIGN_MONITORING_PICS)
  );

  const [openCalendarPopup, setOpenCalendarPopup] = useState<any>(false);
  const [openUploadPopup, setOpenUploadPopup] = useState<any>(false);
  const [mediaFiles, setMediaFiles] = useState<any>([]);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const { loading, error, data: allScreens } = allScreensDataGet;

  const screenCampaignsDetailsGet = useSelector(
    (state: any) => state.screenCampaignsDetailsGet
  );
  const {
    loading: loadingCampaigns,
    error: errorCampaigns,
    data: campaigns,
  } = screenCampaignsDetailsGet;

  const screenCampaignMonitoring = useSelector(
    (state: any) => state.screenCampaignMonitoring
  );
  const {
    loading: loadingScreenCampaignMonitoringData,
    error: errorScreenCampaignMonitoringData,
    data: screenCampaignMonitoringData,
  } = screenCampaignMonitoring;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }
    dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
  }, [dispatch, userInfo]);

  const handleScreenClick = ({ screen }: any) => {
    setMonitoringScreen(screen);
    dispatch(
      getScreenCampaignsDetailsAction({
        screenId: screen._id,
        status: ["Active", "Pause"],
      })
    );
  };

  const handleCampaignClick = ({ campaign }: any) => {
    setMonitoringCampaign(campaign);
    setAllDates(() => {
      return getAllDatesBetween(campaign.startDate, campaign.endDate);
    });
  };

  const handleUploadClick = () => {
    setOpenUploadPopup(!openUploadPopup);
  };

  const monitoringPicturesSaveHandler = () => {
    dispatch(
      screenCampaignsMonitoringAction(
        getDataFromLocalStorage(SCREEN_CAMPAIGN_MONITORING_PICS)
      )
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <UploadMonitoringPicturesPopup
        openUploadPopup={openUploadPopup}
        mediaFiles={mediaFiles}
        setMediaFiles={setMediaFiles}
        onClose={() => {
          setOpenUploadPopup(false);
          setMediaFiles([]);
        }}
        monitoringScreenId={monitoringScreen?._id}
        monitoringCampaignId={monitoringCampaign?._id}
        monitoringDate={monitoringDate}
        monitoringTime={monitoringTime}
        monitoringMedia={monitoringMedia}
        setMonitoringData={setMonitoringData}
        fileType={fileType}
      />
      {openCalendarPopup && (
        <div className="overflow-scroll no-scrollbar">
          <CalendarPopup
            onClose={() => setOpenCalendarPopup(false)}
            dates={allDates}
            monitoringDate={monitoringDate}
            setMonitoringDate={setMonitoringDate}
            openCalendarPopup={openCalendarPopup}
          />
        </div>
      )}
      <div className="w-full ">
        <div className="border rounded p-4 w-full bg-white">
          <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>
        </div>
        <div className="grid grid-cols-12 gap-2 mt-2">
          <div className="col-span-3 border rounded bg-white">
            <div className="w-full p-2">
              <SearchInputField
                placeholder="Screen Name"
                value={searchQuery}
                onChange={setSearchQuery}
                height="h-8"
              />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <div className="p-1 overflow-scroll no-scrollbar h-[75vh] bg-white">
                {getDataFromLocalStorage(ALL_SCREENS_LIST)
                  ?.list?.filter((screen: any) =>
                    screen?.screenName
                      ?.toLowerCase()
                      ?.includes(searchQuery?.toLowerCase())
                  )
                  ?.map((data: any, index: any) => (
                    <div
                      key={index}
                      onClick={() => handleScreenClick({ screen: data })}
                    >
                      <ScreenListMonitoringView
                        screen={data}
                        noImages={true}
                        showOption={false}
                        handleGetCampaignLog={() => {}}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="col-span-3 border rounded bg-white">
            <div className="w-full p-2">
              <SearchInputField
                placeholder="Brand Name"
                value={searchQueryForCampaign}
                onChange={setSearchQueryForCampaign}
                height="h-8"
              />
            </div>
            {loadingCampaigns ? (
              <Loading />
            ) : (
              <div className="p-1 overflow-scroll no-scrollbar h-[75vh] bg-white">
                {campaigns ? (
                  campaigns
                    ?.filter((campaign: any) =>
                      campaign?.brandName
                        .toLowerCase()
                        .includes(searchQueryForCampaign)
                    )
                    ?.map((campaign: any, index: any) => (
                      <div
                        key={index}
                        className="px-2"
                        onClick={() => {
                          handleCampaignClick({ campaign: campaign });
                        }}
                      >
                        <CampaignListMonitoringView
                          campaign={campaign}
                          noImages={true}
                        />
                      </div>
                    ))
                ) : (
                  <NoDataView />
                )}
              </div>
            )}
          </div>
          {monitoringScreen && monitoringCampaign && (
            <div className="col-span-6 border rounded bg-white">
              <div className="flex justify-between items-center border-b">
                <div className="p-4 flex items-end gap-1">
                  <h1 className="text-[12px]">
                    {monitoringScreen
                      ? monitoringScreen?.screenName
                      : "Screen "}
                    {">"}
                  </h1>
                  <h1 className="text-[12px] font-semibold">
                    {monitoringCampaign
                      ? ` ${monitoringCampaign?.brandName}`
                      : "Brand"}
                  </h1>
                </div>
                <div
                  className="flex gap-2 items-center p-4"
                  onClick={() => setOpenCalendarPopup(true)}
                >
                  <i className="fi fi-sr-calendar-lines text-[12px] flex items-center"></i>
                  <h1 className="text-[12px]">{allDates.length} Days</h1>
                </div>
              </div>
              <div className="border-b p-2 flex justify-between items-center">
                <h1 className="text-[12px] font-semibold">
                  {moment(monitoringDate).format("MMM DD YY")}
                </h1>
                <PrimaryButton
                  title="Save"
                  height="h-8"
                  width="w-auto"
                  textSize="text-[12px]"
                  rounded="rounded-full"
                  loading={loadingScreenCampaignMonitoringData}
                  loadingText="Saving..."
                  action={monitoringPicturesSaveHandler}
                />
              </div>

              <div className="h-auto">
                {time?.map((t: any, i: any) => (
                  <div className="w-full" key={i}>
                    <MonitoringPictures
                      isUsedForShow={false}
                      handleUploadClick={handleUploadClick}
                      time={t}
                      setMonitoringMedia={setMonitoringMedia}
                      setMonitoringTime={setMonitoringTime}
                      monitoringData={monitoringData}
                      screenId={monitoringScreen?._id}
                      campaignId={monitoringCampaign?._id}
                      setFileType={setFileType}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
