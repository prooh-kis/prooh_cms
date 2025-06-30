import { Loading, NoDataView, SearchInputField } from "../../components/index";
import { ScreenListMonitoringView } from "../../components/molecules/ScreenListMonitoringView";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CampaignScreenList = ({
  campaignCreated,
  loadingScreens,
  campaigns,
  handelSelectScreen,
  handleChangeCampaignStatus,
  setOpenCreativeEndDateChangePopup,
  screens,
  handleShowLogReport,
}: any) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<any>("");
  const filterScreenList =
    campaigns?.filter((camp: any) =>
      camp.screenName?.toLowerCase().includes(searchQuery)
    ) || [];
  return (
    <div className="col-span-4 border rounded bg-white p-4">
      <h1 className="text-[16px] font-semibold p-1 py-2">
        Screens Play{" "}
        <span className="text-[14px]">({filterScreenList?.length || 0})</span>
      </h1>

      <div className="my-2 ">
        <SearchInputField
          placeholder="Search screens by name"
          height="h-8"
          value={searchQuery}
          onChange={(value: string) => setSearchQuery(value?.toLowerCase())}
        />
      </div>
      {loadingScreens ? (
        <Loading />
      ) : (
        <div className="h-[70vh] overflow-y-auto no-scrollbar py-2  flex flex-col gap-4">
          {campaigns?.length === 0 && <NoDataView />}
          {filterScreenList?.map((camp: any, k: any) => (
            <div
              key={k}
              className="p-0 m-0"
              onClick={() => handelSelectScreen(camp?._id)}
              onDoubleClick={() =>
                navigate(`/screens-details/${camp?.screenId}`)
              }
            >
              <ScreenListMonitoringView
                handleChangeCampaignStatus={handleChangeCampaignStatus}
                campaignCreated={campaignCreated}
                setOpenCreativeEndDateChangePopup={
                  setOpenCreativeEndDateChangePopup
                }
                screen={screens?.find(
                  (screen: any) => screen?.screenId == camp?.screenId
                )}
                campaign={camp}
                noImages={false}
                showOption={true}
                handleGetCampaignLog={handleShowLogReport}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignScreenList;
