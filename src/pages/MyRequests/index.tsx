import { useNavigate } from "react-router-dom";
import { ADD_NEW_USER, SIGN_IN } from "../../routes/routes";
import {
  CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS,
  SCREEN_ADMIN,
  SCREEN_OWNER,
  USER_DELETE_RESET,
  USERS_GET_CMS,
} from "../../constants/userConstants";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { deleteUser, getUserList } from "../../actions/userAction";
import { AddUserDetails } from "../../components/popup/AddUserDetails";
import { PrimaryButton, SearchInputField } from "../../components/index";
import userImage from "../../assets/userImage.png";
import { Tooltip } from "antd";
import { getMyCreateCampaignsVendorRequestsList } from "../../actions/campaignAction";
import { CAMPAIGN_STATUS_PLEA_REQUEST_SCREEN_APPROVAL_SENT } from "../../constants/campaignConstants";
import { VendorsRequestsList } from "./VendorRequestsList";
import { Loading } from "../../components/Loading";

export const MyRequests = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const userList = useSelector((state: any) => state.userList);
  const { loading, error, data: users } = userList;

  const userDelete = useSelector((state: any) => state.userDelete);
  const {
    loading: loadingUserDelete,
    error: errorUserDelete,
    success,
    data: userDeleteMessage,
  } = userDelete;

  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = useCallback(() => {
    setOpen((pre: boolean) => !pre);
  }, [open]);

  useEffect(() => {
    if (success) {
      alert(userDeleteMessage);
      dispatch({ type: USER_DELETE_RESET });
      dispatch(getUserList({ event: USERS_GET_CMS }));
    }
    if (errorUserDelete) {
      alert(errorUserDelete);
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [errorUserDelete, errorUserDelete, success]);

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId));
  };

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const roleList = [
    "screenManager",
    "screenMonitoring"
  ]
  if (userInfo?.userRole == SCREEN_ADMIN) {
    roleList.push("screenOwner")
  }

  useEffect(() => {
    if (!userInfo) {
      navigate(SIGN_IN);
    } else {
      if (userInfo?.userRole != SCREEN_ADMIN && userInfo?.userRole != SCREEN_OWNER) {
        alert("You have no access to this page");
        navigate(-1);
      } else {
        dispatch(getUserList({ event: USERS_GET_CMS }));
      }
    }
  }, [userInfo]);

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
        event : CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS
      })
    );
  },[dispatch, userInfo]);

  const data1 = vendorRequestsList?.campaignCreations?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between border rounded p-4 w-full bg-white">
        <h1 className="text-[16px] font-semibold">My Requests</h1>
        <div className="flex items-center w-80">
          <SearchInputField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Campaign by campaign name or brand"
          />
        </div>
      </div>

      {loadingVendorRequestsList ? (
        <Loading />
      ) : vendorRequestsList ? (
        <div className="w-full h-[85vh] overflow-scroll mt-1">
          <VendorsRequestsList
            userInfo={userInfo}
            requestsList={data1}
            campaignsList={vendorRequestsList?.campaigns}
          />
        </div>
      ) : (
        <div className="h-full flex justify-center">
          <div className="p-4">
            <h1 className="text-2xl font-bold">No Campaigns Found</h1>
            <p className="text-md">Please contact support !!!</p>
          </div>
        </div>
      )}
    </div>
  );
};
