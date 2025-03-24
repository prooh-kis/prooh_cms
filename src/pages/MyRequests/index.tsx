import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "../../routes/routes";
import {
  CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CMS,
  CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS,
  SCREEN_ADMIN,
  SCREEN_OWNER,
  USERS_GET_CMS,
} from "../../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserList } from "../../actions/userAction";
import { SearchInputField, NoDataView } from "../../components/index";
import {
  getMyCreateCampaignsVendorRequestsList,
  changeCampaignStatusAfterVendorApproval,
} from "../../actions/campaignAction";
import {
  CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET,
} from "../../constants/campaignConstants";
import { Loading } from "../../components/Loading";
import { message, Tooltip } from "antd";
import {
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";

export const MyRequests = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else {
      if (
        userInfo?.userRole != SCREEN_ADMIN &&
        userInfo?.userRole != SCREEN_OWNER
      ) {
        alert("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(getUserList({ event: USERS_GET_CMS }));
      }
    }
  }, [dispatch, navigate, userInfo]);

  //
  const myCreateCampaignsVendorRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsVendorRequestsListGet
  );
  const {
    loading: loadingVendorRequestsList,
    error: errorVendorRequestsList,
    data: vendorRequestsList,
  } = myCreateCampaignsVendorRequestsListGet;

  useEffect(() => {
    dispatch(
      getMyCreateCampaignsVendorRequestsList({
        id: userInfo?._id,
        status: CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
        event: CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS,
      })
    );
  }, [dispatch, userInfo]);

  const [showDetails, setShowDetails] = useState<any>({
    show: false,
    data: {},
  });

  const [planRequest, setPlanRequest] = useState<any>([
    {
      campaignCreationId: "",
      campaignName: "",
      brandName: "",
      clientName: "",
      type: "",
      totalCampaignBudget: 0,
      startDate: "",
      endDate: "",
      duration: "",
      campaigns: [],
      screens: [],
    },
  ]);

  const [selectedCampaignIds, setSelectedCampaignIds] = useState<any>([]);

  const campaignStatusChangeAfterVendorApproval = useSelector(
    (state: any) => state.campaignStatusChangeAfterVendorApproval
  );
  const {
    loading: loadingVendorApprovalStatus,
    error: errorVendorApprovalStatus,
    data: vendorApprovalStatus,
  } = campaignStatusChangeAfterVendorApproval;

  useEffect(() => {
    if (vendorApprovalStatus) {
      message.success("Campaign Approved Successfully...");
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET,
      });
      dispatch(
        getMyCreateCampaignsVendorRequestsList({
          id: userInfo?._id,
          status: CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT,
          event: CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS,
        })
      );
    }

    if (errorVendorApprovalStatus) {
      message.error("Campaign Approval Failed");
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET,
      });
    }

    setPlanRequest(
      vendorRequestsList?.campaignCreations?.filter(
        (campaign: any) =>
          campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [
    vendorRequestsList,
    vendorApprovalStatus,
    errorVendorApprovalStatus,
    searchQuery,
  ]);

  const handleApprovedClicked = () => {
    if (!selectedCampaignIds?.length) {
      message.error("Please select campaigns!");
      return;
    }
    dispatch(
      changeCampaignStatusAfterVendorApproval({
        approvedIds: selectedCampaignIds,
        event: CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CMS,
        disapprovedIds: [],
      })
    );
  };

  const handleRejectClicked = () => {
    if (!selectedCampaignIds?.length) {
      message.error("Please select campaigns!");
      return;
    }
    dispatch(
      changeCampaignStatusAfterVendorApproval({
        approvedIds: [],
        event: CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CMS,
        disapprovedIds: selectedCampaignIds,
      })
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
        <h1 className="text-[16px] font-semibold">My Requests</h1>
        <div className="flex items-center w-80">
          <SearchInputField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Campaign by campaign name or brand"
          />
        </div>
      </div>

      <div className="flex gap-1">
        {loadingVendorRequestsList ? (
          <div className="">
            <Loading />
          </div>
        ) : vendorRequestsList ? (
          <div className="h-[80vh] w-full overflow-y-auto scrollbar-minimal mr-2">
            {!showDetails.show ? (
              <div className="rounded-[4px] bg-gray-100">
                {planRequest?.map((campaign: any, i: any) => (
                  <div
                    key={i}
                    className="pointer-cursor"
                    onClick={() => {
                      setShowDetails({
                        show: !showDetails.show,
                        data: campaign,
                      });
                    }}
                  >
                    <CampaignsListModel index={i} data={{ ...campaign }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-2 bg-white">
                <div className="flex gap-4 py-2">
                  <div className="px-2">
                    <h1 className="font-semibold">Request Details</h1>
                  </div>
                  <div
                    className="flex items-center pr-2"
                    onClick={() =>
                      setShowDetails({
                        show: !showDetails.show,
                        data: {},
                      })
                    }
                  >
                    <Tooltip title="Open list">
                      <h1 className="text-[16px] text-[#129BFF] cursor-pointer">
                        Go Back
                      </h1>
                    </Tooltip>
                  </div>
                </div>
                <VendorConfirmationBasicTable
                  vendorConfirmationData={showDetails?.data}
                />

                <div className="flex justify-between items-start mt-4">
                  <div className="p-4 shadow-sm rounded-lg">
                    <h1 className="text-lg font-semibold mb-2">
                      Screens Selected (
                      {showDetails?.data?.screenWiseSlotDetails?.length || 0})
                    </h1>
                  </div>
                  <div
                    className="flex gap-4 pr-2"
                    onMouseEnter={() => {
                      if (selectedCampaignIds.length === 0) {
                        message.info("Please select any one screen...");
                      }
                    }}
                  >
                    <button
                      title="reject"
                      type="submit"
                      className="text-[#FF000090] font-medium rounded-[9px] text-[14px] sm:text-[16px] font-bold  hover:text-[#FF0000] w-[160px] h-[40px] border border-[#FF000090] hover:border-[#FF0000]"
                      disabled={loadingVendorApprovalStatus}
                      onClick={handleRejectClicked}
                    >
                      Reject
                    </button>
                    <button
                      title="approve"
                      type="submit"
                      disabled={loadingVendorApprovalStatus}
                      className={`${
                        loadingVendorApprovalStatus
                          ? "bg-gray text-primaryButton hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton"
                          : "bg-[#129BFF] text-[#FFFFFF] font-custom rounded-[9px] text-[14px] sm:text-[16px] font-bold hover:bg-[#129BFF90] hover:text-[#FFFFFF] w-[170px] h-[40px]"
                      }`}
                      onClick={handleApprovedClicked}
                    >
                      Approve
                    </button>
                  </div>
                </div>

                {showDetails?.data && (
                  <VendorConfirmationStatusTable
                    userInfo={userInfo}
                    campaignCreationStatusTableData={showDetails?.data}
                    selectedCampaignIds={selectedCampaignIds}
                    setSelectedCampaignIds={setSelectedCampaignIds}
                    campaignsList={vendorRequestsList?.campaigns}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </div>
  );
};
