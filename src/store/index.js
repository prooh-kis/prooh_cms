import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"
import authReducer from "./authSlice";


import {
  emailSendForConfirmationReducer,
  emailSendForVendorConfirmationReducer,
  userEmailVerificationReducer,
  userSendEmailToResetPasswordReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdatePasswordReducer,
} from "../reducers/userReducers";
import { allCampaignsDataGetReducer, campaignCreatedScreensDetailsGetReducer, campaignDetailsGetReducer, campaignStatusChangeReducer, createCampaignCreationByScreenOwnerReducer, getAllScreensForScreenOwnerCampaignCreationReducer, screenDataUploadCreativeGetReducer } from "../reducers/campaignReducers";
import { creativesMediaGetReducer, creativesMediaUploadReducer } from "../reducers/creativeReducers";
import { allScreensDataGetReducer, screenCampaignsDetailsGetReducer, screenDetailsGetReducer, setCampaignsLoopForScreenReducer } from "../reducers/screenReducers";

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
    userUpdatePassword: userUpdatePasswordReducer,
    emailVerify: userEmailVerificationReducer,
    userSendEmailToResetPassword: userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: emailSendForVendorConfirmationReducer,

    // campaign creation by screen owner
    createCampaignCreationByScreenOwner: createCampaignCreationByScreenOwnerReducer,
    getAllScreensForScreenOwnerCampaignCreation: getAllScreensForScreenOwnerCampaignCreationReducer,
    screenDataUploadCreativeGet: screenDataUploadCreativeGetReducer,

    // Campaigns
    allCampaignsDataGet: allCampaignsDataGetReducer,
    campaignDetailsGet: campaignDetailsGetReducer,
    campaignCreatedScreensDetailsGet: campaignCreatedScreensDetailsGetReducer,
    campaignStatusChange: campaignStatusChangeReducer,
    setCampaignsLoopForScreen: setCampaignsLoopForScreenReducer,
    
    // creative
    creativesMediaUpload: creativesMediaUploadReducer,
    creativesMediaGet: creativesMediaGetReducer,
    
    // Screens
    allScreensDataGet: allScreensDataGetReducer,
    screenDetailsGet: screenDetailsGetReducer,
    screenCampaignsDetailsGet: screenCampaignsDetailsGetReducer,

  },
  middleware: (() => process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk])
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
