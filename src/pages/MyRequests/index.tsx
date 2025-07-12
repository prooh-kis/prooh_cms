import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../routes/routes";
import {
  SCREEN_ADMIN,
  SCREEN_OWNER,
  USERS_GET_CMS,
} from "../../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { getUserList } from "../../actions/userAction";
import {
  SearchInputField,
  NoDataView,
  ReloadButton,
} from "../../components/index";
import { getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";
import {
  CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT,
  CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_RESET,
} from "../../constants/campaignConstants";
import { message } from "antd";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";

interface Campaign {
  _id: string;
  campaignCreationId: string;
  campaignName: string;
  brandName: string;
  clientName: string;
  type: string;
  totalCampaignBudget: number;
  startDate: string;
  endDate: string;
  duration: string;
  campaigns: any[];
  screens: any[];
  name?: string;
  client?: string;
}

export const MyRequests = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [searchQuery, setSearchQuery] = useState("");
  const [planRequest, setPlanRequest] = useState<Campaign[]>([]);
  const [currentTab, setCurrentTab] = useState<string>(
    CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT
  );
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsVendorRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsVendorRequestsListGet
  );
  const {
    loading: loadingVendorRequestsList,
    error: errorVendorRequestsList,
    data: vendorRequestsList,
  } = myCreateCampaignsVendorRequestsListGet;

  // Redirect if not authenticated or unauthorized
  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
      return;
    }

    if (
      userInfo?.userRole !== SCREEN_ADMIN &&
      userInfo?.userRole !== SCREEN_OWNER
    ) {
      alert("You have no access to this page");
      navigate(-1);
      return;
    }

    dispatch(getUserList({ event: USERS_GET_CMS }));
  }, [navigate, userInfo]);

  const getRequestList = useCallback(() => {
    if (!userInfo?._id) return;

    dispatch(
      getMyCreateCampaignsVendorRequestsList({
        id: userInfo._id,
        status: currentTab,
        event: "campaignCreationGetRequestListVendorCms",
      })
    );
  }, [userInfo?._id, currentTab, dispatch]);

  // Fetch vendor requests
  useEffect(() => {
    if (userInfo?._id) {
      getRequestList();
    }
  }, [userInfo, currentTab]);

  // Show error message if any
  useEffect(() => {
    if (errorVendorRequestsList) {
      message.error(errorVendorRequestsList);
      dispatch({ type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_RESET });
    }
  }, [errorVendorRequestsList, dispatch]);

  // Filter campaigns based on search query
  useEffect(() => {
    if (!vendorRequestsList) return;

    const filtered = vendorRequestsList.filter((campaign: Campaign) => {
      const query = searchQuery.toLowerCase();
      return (
        campaign?.name?.toLowerCase().includes(query) ||
        campaign?.brandName?.toLowerCase().includes(query) ||
        campaign?.client?.toLowerCase().includes(query)
      );
    });

    setPlanRequest(filtered);
  }, [vendorRequestsList, searchQuery]);

  const handleClick = (campaign: Campaign) => {
    const index =
      currentTab === CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT
        ? 1
        : 2;
    navigate(`/my-requests/${campaign._id}/${index}`);
  };

  const reset = () => {
    if (userInfo?._id) {
      getRequestList();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
        <div className="flex gap-4 items-center p-4">
          <i
            className="fi fi-br-arrow-left flex items-center justify-center text-[#8B5CF680]"
            onClick={() => navigate(-1)}
          ></i>
          <h1 className="text-[16px] font-semibold">
            My Requests{" "}
            {/* <span className="text-[14px] text-[#68879C]">
              ({planRequest.length || 0})
            </span> */}
          </h1>
          <ReloadButton onClick={reset} />
        </div>
        <div className="flex items-center w-80">
          <SearchInputField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or brand or group"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between rounded px-4 py-1 mb-1 w-full bg-white">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={[
            {
              label: "Budget Approval",
              id: CAMPAIGN_STATUS_PLEA_REQUEST_VENDOR_BUDGET_APPROVAL_SENT,
            },
            {
              label: "Creative Approval",
              id: CAMPAIGN_STATUS_PLEA_REQUEST_CREATIVE_APPROVAL_SENT,
            },
          ]}
        />
      </div>
      {loadingVendorRequestsList ? (
        <LoadingScreen />
      ) : (
        <div className="h-[70vh] w-full overflow-y-auto scrollbar-minimal mr-2">
          {planRequest.length === 0 ? (
            <NoDataView />
          ) : (
            <div className="rounded-[4px] bg-gray-100">
              {planRequest.map((campaign, index) => (
                <div
                  key={campaign._id}
                  className="pointer-cursor"
                  onClick={() => handleClick(campaign)}
                >
                  <CampaignsListModel index={index} data={campaign} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
