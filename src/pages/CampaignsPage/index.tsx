import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { message } from "antd";
import { CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS } from "../../constants/userConstants";

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
      // message.error("Not a screen owner!!!");
    } else if (!allCampaigns) {
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?._id,
          status: CAMPAIGN_STATUS_ACTIVE,
          event : CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS
        })
      );
    }
  }, [dispatch, userInfo]);


  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };

  const handleGetCampaignByStatus = useCallback((status: any) => {
    setCurrentTab(status);
    dispatch(
      getAllCampaignsDetailsAction({
        userId: userInfo?._id,
        status: campaignCreationTypeTabs?.filter(
          (tab: any) => tab.id === status
        )[0]?.value,
        event : CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS
      })
    );
  },[dispatch, userInfo]);

  const reset = () => {
    dispatch(
      getAllCampaignsDetailsAction({
        userId: userInfo?._id,
        status: CAMPAIGN_STATUS_ACTIVE,
        event : CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS
      })
    );
  };

  const handleDoubleClick = (id: string) => {
    // Save the current scroll position
    if (targetDivRef.current) {
      sessionStorage.setItem(
        "campaignsScrollPosition",
        targetDivRef.current.scrollTop.toString()
      );
    }
    navigate(`/campaigns-details/${id}`);
  };

  useEffect(() => {
    handleGetCampaignByStatus(currentTab);
    // Restore scroll position when coming back to this page
    const savedScrollPosition =
      sessionStorage.getItem("campaignsScrollPosition") || "0";
    if (targetDivRef.current) {
      targetDivRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [currentTab, handleGetCampaignByStatus]);
  return (
    <div className="w-full">
      <div className="bg-white w-[85vw]">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4 ">
            <h1 className="text-[16px] font-semibold">
              My Campaigns{" "}
              <span className="text-[14px] text-[#68879C] ">
                (
                {
                  allCampaigns?.filter(
                    (campaign: any) =>
                      campaign?.campaignName
                        ?.toLowerCase()
                        .includes(searchQuery) ||
                      campaign?.brandName?.toLowerCase().includes(searchQuery) ||
                      campaign?.campaignName
                        ?.toUpperCase()
                        .includes(searchQuery) ||
                      campaign?.brandName?.toUpperCase().includes(searchQuery)
                  )?.length
                }
                )
              </span>
            </h1>
            <ReloadButton onClick={reset} />
          </div>
          <div className="flex items-center mt-1 w-96">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
        </div>

        <div className="mt-1 px-4">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignCreationTypeTabs}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <div className="mt-1">
          {allCampaigns?.length === 0 && (
            <div className="pt-4">
              <NoDataView />
            </div>
          )}
          <div
            className="h-[80vh] overflow-y-auto scrollbar-minimal mt-1"
            ref={targetDivRef}
          >
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
                    onDoubleClick={() => handleDoubleClick(data._id)}
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
