import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CampaignListView } from "../../components/molecules/CampaignListView";
import { Loading } from "../../components/Loading";
import { getAllCampaignsDetailsAction } from "../../actions/campaignAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import {
  NoDataView,
  ReloadButton,
  SearchInputField,
} from "../../components/index";
import { campaignCreationTypeTabs } from "../../constants/tabDataConstant";
import { CAMPAIGN_STATUS_ACTIVE } from "../../constants/campaignConstants";

export const CampaignsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allCampaignsDataGet = useSelector(
    (state: any) => state.allCampaignsDataGet
  );
  const { loading, error, data: allCampaigns } = allCampaignsDataGet;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    } else if (!allCampaigns) {
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?.primaryUserId,
          status: CAMPAIGN_STATUS_ACTIVE,
        })
      );
    }
  }, [dispatch, userInfo]);

  // Handle card click, setting the clicked card's index
  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };

  const handleGetCampaignByStatus = (status: any) => {
    setCurrentTab(status);
    dispatch(
      getAllCampaignsDetailsAction({
        userId: userInfo?.primaryUserId,
        status: campaignCreationTypeTabs?.filter(
          (tab: any) => tab.id === status
        )[0]?.value,
      })
    );
  };

  const reset = () => {
    dispatch(
      getAllCampaignsDetailsAction({
        userId: userInfo?.primaryUserId,
        status: CAMPAIGN_STATUS_ACTIVE,
      })
    );
  };

  return (
    <div className="w-full p-2">
      <div className="flex gap-4 items-center border rounded p-4 bg-white w-[85vw]">
        <h1 className="text-[16px] font-semibold">
          My Campaigns{" "}
          <span className="text-[18px] text-green-500">
            {
              allCampaigns?.filter(
                (campaign: any) =>
                  campaign?.campaignName?.toLowerCase().includes(searchQuery) ||
                  campaign?.brandName?.toLowerCase().includes(searchQuery)
              )?.length
            }
          </span>
        </h1>
        <ReloadButton onClick={reset} />
      </div>
      {/* This is not working now */}
      <div className="px-4 bg-white w-[85vw] mt-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={handleGetCampaignByStatus}
          tabData={campaignCreationTypeTabs}
        />
      </div>
      {loading ? (
        <div className="w-full h-full">
          <Loading />
        </div>
      ) : (
        <div className="">
          <div className="flex items-center mt-2">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
          {allCampaigns?.length === 0 && (
            <div className="pt-4">
              <NoDataView />
            </div>
          )}
          <div className="h-[60vh]  overflow-scroll">
            {allCampaigns
              ?.filter(
                (campaign: any) =>
                  campaign?.campaignName?.toLowerCase().includes(searchQuery) ||
                  campaign?.brandName?.toLowerCase().includes(searchQuery)
              )
              ?.map((data: any, index: any) => (
                <div key={index} className="h-auto">
                  <CampaignListView
                    isSelected={data?._id === selectedCard}
                    color={""}
                    handleCardClick={() => handleCardClick(data._id)}
                    navigate={() => navigate(`/campaigns-details/${data._id}`)}
                    data={data}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
