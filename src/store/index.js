import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./authSlice";

import {
  emailSendForConfirmationReducer,
  emailSendForVendorConfirmationReducer,
  userAddNewUserReducer,
  userDeleteReducer,
  userEmailVerificationReducer,
  userListReducer,
  userSendEmailToResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdatePasswordReducer,
} from "../reducers/userReducers";
import {
  allCampaignsDataGetReducer,
  campaignCreatedScreensDetailsGetReducer,
  campaignDetailsGetReducer,
  campaignFullDetailsGetReducer,
  campaignLogsByCampaignIdReducer,
  campaignStatusChangeAfterVendorApprovalReducer,
  campaignStatusChangeReducer,
  createCampaignCreationByScreenOwnerReducer,
  editAllSubCampaignsReducer,
  editCampaignCreationByScreenOwnerReducer,
  getAllScreensForScreenOwnerCampaignCreationReducer,
  myCreateCampaignsVendorRequestsListGetReducer,
  screenDataUploadCreativeGetReducer,
} from "../reducers/campaignReducers";
import {
  creativesMediaGetReducer,
  creativesMediaUploadReducer,
  getAllBrandAndNetworkReducer,
} from "../reducers/creativeReducers";
import {
  allScreensDataGetReducer,
  changeAutoLoopValueVReducer,
  changeCampaignCreativeEndDateReducer,
  changeDefaultIncludedReducer,
  editDefaultCreativeReducer,
  getScreenCampaignMonitoringReducer,
  playHoldCampaignsReducer,
  screenCampaignMonitoringReducer,
  screenCampaignsDetailsGetReducer,
  screenCodeChangeReducer,
  screenDataUpdateRedisReducer,
  screenDefaultMediaChangeReducer,
  screenDetailsGetReducer,
  screenLogsGetReducer,
  screenRefreshReducer,
  setCampaignsLoopForScreenReducer,
} from "../reducers/screenReducers";
import {
  allClientAgencyNamesListGetReducer,
  clientAgencyDetailsAddGetReducer,
  clientAgencyDetailsGetReducer,
} from "../reducers/clientReducers";
import {
  createCouponReducer,
  deleteCouponReducer,
  getCouponListReducer,
  toggleStatusCouponReducer,
  updateCouponReducer,
} from "../reducers/couponReducers";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const store = configureStore({
  initialState,
  reducer: {
    // auth
    auth: authReducer,
    userSignin: userSigninReducer,
    userSignup: userSignupReducer,
    userAddNewUser: userAddNewUserReducer,
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: emailSendForVendorConfirmationReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,

    // campaign creation by screen owner
    createCampaignCreationByScreenOwner:
      createCampaignCreationByScreenOwnerReducer,
    getAllScreensForScreenOwnerCampaignCreation:
      getAllScreensForScreenOwnerCampaignCreationReducer,
    screenDataUploadCreativeGet: screenDataUploadCreativeGetReducer,

    // edit campaign creation by screen owner
    editCampaignCreationByScreenOwner: editCampaignCreationByScreenOwnerReducer,

    // Campaigns
    allCampaignsDataGet: allCampaignsDataGetReducer,
    campaignDetailsGet: campaignDetailsGetReducer,
    campaignCreatedScreensDetailsGet: campaignCreatedScreensDetailsGetReducer,
    editAllSubCampaigns: editAllSubCampaignsReducer,
    getCampaignFullDetails: campaignFullDetailsGetReducer,
    myCreateCampaignsVendorRequestsListGet:
      myCreateCampaignsVendorRequestsListGetReducer,
    campaignStatusChangeAfterVendorApproval:
      campaignStatusChangeAfterVendorApprovalReducer,
    //Log
    campaignLogsByCampaignId: campaignLogsByCampaignIdReducer,

    // creative
    creativesMediaUpload: creativesMediaUploadReducer,
    creativesMediaGet: creativesMediaGetReducer,
    getAllBrandAndNetwork: getAllBrandAndNetworkReducer,

    // Screens
    allScreensDataGet: allScreensDataGetReducer,
    screenDetailsGet: screenDetailsGetReducer,
    screenCampaignsDetailsGet: screenCampaignsDetailsGetReducer,
    campaignStatusChange: campaignStatusChangeReducer,
    setCampaignsLoopForScreen: setCampaignsLoopForScreenReducer,
    changeCampaignCreativeEndDate: changeCampaignCreativeEndDateReducer,
    screenCampaignMonitoring: screenCampaignMonitoringReducer,
    getScreenCampaignMonitoring: getScreenCampaignMonitoringReducer,
    screenCodeChange: screenCodeChangeReducer,
    changeDefaultIncluded: changeDefaultIncludedReducer,
    changeAutoLoop: changeAutoLoopValueVReducer,
    editDefaultCreative: editDefaultCreativeReducer,
    screenRefresh: screenRefreshReducer,
    screenDataUpdateRedis: screenDataUpdateRedisReducer,
    playHoldCampaigns: playHoldCampaignsReducer,
    screenLogsGet: screenLogsGetReducer,
    screenDefaultMediaChange: screenDefaultMediaChangeReducer,

    // CLIENT, AGENCY
    clientAgencyDetailsAdd: clientAgencyDetailsAddGetReducer,
    allClientAgencyNamesListGet: allClientAgencyNamesListGetReducer,
    clientAgencyDetailsGet: clientAgencyDetailsGetReducer,

    // coupons
    couponList: getCouponListReducer,
    createCoupon: createCouponReducer,
    updateCoupon: updateCouponReducer,
    deleteCoupon: deleteCouponReducer,
    toggleStatusCoupon: toggleStatusCouponReducer,
  },
  middleware: () =>
    process.env.NODE_ENV !== "production"
      ? [require("redux-immutable-state-invariant").default(), thunk]
      : [thunk],
  // devTools: process.env.NODE_ENV !== 'production'
});

store.subscribe(() => {
  const state = store.getState();
  if (state.auth.isLoggedIn) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        userInfo: state.auth.userInfo,
        loginTime: state.auth.loginTime,
      })
    );
    // localStorage.setItem(
    //   "userInfo",
    //   JSON.stringify({ userInfo: state.auth.userInfo })
    // );
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
  }
});

export default store;
