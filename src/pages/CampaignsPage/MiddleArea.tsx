import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CampaignListView } from "../../components/molecules/CampaignListView";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_CAMPAIGNS_LIST } from "../../constants/localStorageConstants";
import { getAllCampaignsDetailsAction } from "../../actions/campaignAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { SearchInputField } from "../../components/index";
import { campaignCreationTypeTabs } from "../../constants/tabDataConstant";
import { CAMPAIGN_STATUS_ACTIVE } from "../../constants/campaignConstants";

export const MiddleArea: React.FC = () => {
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
    }
    else {
      dispatch(getAllCampaignsDetailsAction({ userId: userInfo?._id , status : CAMPAIGN_STATUS_ACTIVE }));
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
          userId: userInfo?._id,
          status: campaignCreationTypeTabs.filter((tab: any) => tab.id === status)[0]
            .value,
        })
      );
    };

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="w-full">
        <div className="my-1 border rounded p-4">
          <h1 className="text-[16px] font-semibold">My Campaigns</h1>
        </div>
        <div className="p-1">
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
          <div className="h-[80vh]">
            <div className="flex items-center pt-1">
              <SearchInputField
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search Campaign by campaign name or brand"
              />
            </div>
            {getDataFromLocalStorage(ALL_CAMPAIGNS_LIST)
              ?.list?.filter(
                (campaign: any) =>
                  campaign?.campaignName?.toLowerCase().includes(searchQuery) ||
                  campaign?.brandName?.toLowerCase().includes(searchQuery)
              )
              ?.map((data: any, index: any) => (
                <div
                  key={index}
                  className="overflow-scroll no-scrollbar h-auto">
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
        )}
      </div>
    </div>
  );
};
