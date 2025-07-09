import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { Loading } from "../../components/Loading";
import { getAllCampaignsDetailsAction } from "../../actions/campaignAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { NoDataView, ReloadButton, SearchInputField } from "../../components";
import { campaignCreationTypeTabs } from "../../constants/tabDataConstant";
import { CAMPAIGN_STATUS_ACTIVE } from "../../constants/campaignConstants";
import { CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS } from "../../constants/userConstants";
import { CampaignListView } from "../../components/molecules/CampaignListView";

interface Campaign {
  _id: string;
  name: string;
  brandName: string;
  clientName: string;
  // Add other properties as needed
}

export const CampaignsPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    loading,
    error,
    data: allCampaigns,
  } = useSelector((state: any) => state.allCampaignsDataGet);

  const fetchCampaigns = useCallback(
    (status: string) => {
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?._id,
          status,
          event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS,
          plannerId: [],
        })
      );
    },
    [dispatch, userInfo?._id]
  );

  // Initial data fetch
  useEffect(() => {
    if (userInfo?.isMaster && !allCampaigns) {
      fetchCampaigns(CAMPAIGN_STATUS_ACTIVE);
    }
  }, [dispatch, userInfo]);

  const handleGetCampaignByStatus = useCallback(
    (status: string) => {
      if (loading) {
        message.warning("Please wait, data is loading");
        return;
      }

      const selectedTab = campaignCreationTypeTabs.find(
        (tab: { id: string; value: string }) => tab.id === status
      );

      if (!selectedTab) return;

      setCurrentTab(status);
      fetchCampaigns(selectedTab.value);
    },
    [loading, fetchCampaigns]
  );

  const reset = useCallback(() => {
    const selectedTab = campaignCreationTypeTabs.find(
      (tab: { id: string; value: string }) => tab.id === currentTab
    );
    fetchCampaigns(selectedTab?.value || CAMPAIGN_STATUS_ACTIVE);
  }, [fetchCampaigns]);

  const handleDoubleClick = useCallback(
    (id: string) => {
      sessionStorage.setItem(
        "campaignsScrollPosition",
        targetDivRef.current?.scrollTop?.toString() || "0"
      );
      navigate(`/campaigns-details/${id}`);
    },
    [navigate]
  );

  // Restore scroll position
  useEffect(() => {
    const savedScrollPosition =
      sessionStorage.getItem("campaignsScrollPosition") || "0";
    if (targetDivRef.current) {
      targetDivRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [currentTab]);

  // Memoized filtered results
  const filteredResults = useMemo(() => {
    if (!allCampaigns?.result) return [];

    const query = searchQuery.toLowerCase();
    return allCampaigns.result.filter((campaign: Campaign) =>
      [campaign.name, campaign.brandName, campaign.clientName].some((field) =>
        field?.toLowerCase().includes(query)
      )
    );
  }, [allCampaigns, searchQuery]);

  const handleCardClick = useCallback((id: string) => {
    setSelectedCard((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[4px]">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4">
            <h1 className="text-[16px] font-semibold">
              My Campaigns{" "}
              <span className="text-[14px] text-[#68879C]">
                ({filteredResults.length})
              </span>
            </h1>
            <ReloadButton onClick={reset} />
          </div>
          <div className="flex items-center mt-1 w-96">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, client, brand"
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
        <Loading />
      ) : (
        <div className="mt-1">
          {!filteredResults.length && (
            <div className="pt-4">
              <NoDataView />
            </div>
          )}

          <div
            className="h-[77vh] overflow-y-auto scrollbar-minimal mt-1 mr-2"
            ref={targetDivRef}
          >
            {filteredResults.map((data: Campaign) => (
              <CampaignListView
                key={data._id}
                isSelected={data._id === selectedCard}
                handleCardClick={() => handleCardClick(data._id)}
                onDoubleClick={() => handleDoubleClick(data._id)}
                data={data}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
