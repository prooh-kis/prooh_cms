export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAIL = "USER_SIGNUP_FAIL";
export const USER_SIGNUP_RESET = "USER_SIGNUP_RESET";

export const USER_SIGNIN_REQUEST = "USER_SIGNIN_REQUEST";
export const USER_SIGNIN_SUCCESS = "USER_SIGNIN_SUCCESS";
export const USER_SIGNIN_FAIL = "USER_SIGNIN_FAIL";
export const USER_SIGNIN_RESET = "USER_SIGNIN_RESET";

export const USER_ADD_NEW_USER_REQUEST = "USER_ADD_NEW_USER_REQUEST";
export const USER_ADD_NEW_USER_SUCCESS = "USER_ADD_NEW_USER_SUCCESS";
export const USER_ADD_NEW_USER_FAIL = "USER_ADD_NEW_USER_FAIL";
export const USER_ADD_NEW_USER_RESET = "USER_ADD_NEW_USER_RESET";

export const USER_SIGNOUT = "USER_SIGNOUT";

export const USER_UPDATE_PASSWORD_REQUEST = "USER_UPDATE_PASSWORD_REQUEST";
export const USER_UPDATE_PASSWORD_SUCCESS = "USER_UPDATE_PASSWORD_SUCCESS";
export const USER_UPDATE_PASSWORD_FAIL = "USER_UPDATE_PASSWORD_FAIL";
export const USER_UPDATE_PASSWORD_RESET = "USER_UPDATE_PASSWORD_RESET";

export const USER_DELETE_REQUEST = "USER_DELETE_REQUEST";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_ERROR = "USER_DELETE_ERROR";
export const USER_DELETE_RESET = "USER_DELETE_RESET";

export const USER_LIST_REQUEST = "USER_LIST_REQUEST";
export const USER_LIST_SUCCESS = "USER_LIST_SUCCESS";
export const USER_LIST_ERROR = "USER_LIST_ERROR";
export const USER_LIST_RESET = "USER_LIST_RESET";

export const USER_EMAIL_VERIFICATION_REQUEST =
  "USER_EMAIL_VERIFICATION_REQUEST";
export const USER_EMAIL_VERIFICATION_SUCCESS =
  "USER_EMAIL_VERIFICATION_SUCCESS";
export const USER_EMAIL_VERIFICATION_ERROR = "USER_EMAIL_VERIFICATION_ERROR";
export const USER_EMAIL_VERIFICATION_RESET = "USER_UPDATE_PROFILE_RESET";

export const SEND_EMAIL_TO_RESET_PASSWORD_REQUEST =
  "SEND_EMAIL_TO_RESET_PASSWORD_REQUEST";
export const SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS =
  "SEND_EMAIL_TO_RESET_PASSWORD_SUCCESS";
export const SEND_EMAIL_TO_RESET_PASSWORD_ERROR =
  "SEND_EMAIL_TO_RESET_PASSWORD_ERROR";
export const SEND_EMAIL_TO_RESET_PASSWORD_RESET = "USER_UPDATE_PROFILE_RESET";

export const ALLY_USER_ROLE = "ally";
export const MASTER_USER_ROLE = "master";

export const USER_ROLE_PRIMARY = "primary";
export const USER_ROLE_SECONDARY = "secondary";

export const SEND_EMAIL_FOR_CONFIRMATION_REQUEST =
  "SEND_EMAIL_FOR_CONFIRMATION_REQUEST";
export const SEND_EMAIL_FOR_CONFIRMATION_SUCCESS =
  "SEND_EMAIL_FOR_CONFIRMATION_SUCCESS";
export const SEND_EMAIL_FOR_CONFIRMATION_ERROR =
  "SEND_EMAIL_FOR_CONFIRMATION_ERROR";
export const SEND_EMAIL_FOR_CONFIRMATION_RESET =
  "SEND_EMAIL_FOR_CONFIRMATION_RESET";

export const SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST =
  "SEND_EMAIL_FOR_VENDOR_CONFIRMATION_REQUEST";
export const SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS =
  "SEND_EMAIL_FOR_VENDOR_CONFIRMATION_SUCCESS";
export const SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR =
  "SEND_EMAIL_FOR_VENDOR_CONFIRMATION_ERROR";
export const SEND_EMAIL_FOR_VENDOR_CONFIRMATION_RESET =
  "SEND_EMAIL_FOR_VENDOR_CONFIRMATION_RESET";

export const CAMPAIGN_PLANNER = "campaignPlanner";
export const CAMPAIGN_MANAGER = "campaignManager";
export const CLIENT_POC_USER = "clientPocUser";
export const SCREEN_ADMIN = "screenAdmin";
export const SCREEN_OWNER = "screenOwner";
export const SCREEN_MANAGER = "screenManager";
export const SCREEN_MONITORING_USER = "screenMonitoring";

export const CAMPAIGN_STATUS_CHANGED_TO_ACTIVE_CMS =
  "campaignStatusChangedToActiveCms";
export const CAMPAIGN_STATUS_CHANGED_TO_PAUSED_CMS =
  "campaignStatusChangedToPausedCms";
export const CAMPAIGN_STATUS_CHANGED_TO_DELETED_CMS =
  "campaignStatusChangedToDeletedCms";
export const CAMPAIGN_MONITORING_DATA_CMS = "campaignMonitoringDataCms";
export const CAMPAIGN_CHANGE_DATE_AND_CREATIVE_CMS =
  "campaignChangeDateAndCreativeCms";

export const SCREEN_LOOP_CHANGED_CMS = "screenLoopChangedCms";
export const SCREEN_RESTARTED_CMS = "screenRestartedCms";
export const SCREEN_CODE_UPDATE_CMS = "screenCodeUpdateCms";
export const SCREEN_REDIS_UPDATE_CMS = "screenRedisUpdateCms";
export const SCREEN_PLAY_HOLD_CAMPAIGNS_CMS = "screenPlayHoldCampaignsCms";
export const SCREEN_CHANGE_DEFAULT_MEDIA_CMS = "screenChangeDefaultMediaCms";
export const SCREEN_CHANGE_DEFAULT_INCLUDED_STATUS_CMS =
  "screenChangeDefaultIncludedStatusCms";
export const SCREEN_CHANGE_AUTO_LOOP_VALUE_CMS = "screenChangeAutoLoopValueCms";
export const SCREEN_GET_ALL_SCREEN_DATA_CMS = "screenGetAllScreenDataCms";
export const SCREEN_GET_SCREEN_DETAILS_CMS = "screenGetScreenDetailsCms";
export const SCREEN_GET_SCREEN_CAMPAIGN_DETAILS_CMS =
  "screenGetScreenCampaignDetailsCms";
export const SCREEN_GET_UPLOAD_CREATIVE_DETAILS_CMS =
  "screenGetUploadCreativeDetailsCms";
export const SCREEN_GET_ALL_SCREENS_SCREEN_OWNER_CMS =
  "screenGetAllScreensScreenOwnerCms";

export const CAMPAIGN_CREATION_EDIT_CREATIVE_CMS =
  "campaignCreationEditCreativeCms";
export const CAMPAIGN_CREATION_EDIT_END_DATE_CMS =
  "campaignCreationEditEndDateCms";
export const CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_CMS =
  "campaignCreationGetAllCampaignDataCms";
export const CAMPAIGN_CREATION_GET_CAMPAIGN_DETAILS_CMS =
  "campaignCreationGetCampaignDetailsCms";

export const CAMPAIGN_CREATION_GET_VENDOR_REQUEST_LIST_CMS =
  "campaignCreationGetVendorRequestListCms";
export const CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CMS =
  "campaignCreationApproveCampaignCms";
export const CAMPAIGN_CREATION_CREATE_CLONE_CMS =
  "campaignCreationCreateCloneCms";
export const CAMPAIGN_CREATION_CONVERT_CREATIVE_TO_BITRATE_CMS =
  "campaignCreationConvertCreativeToBitrateCms";

export const CAMPAIGN_CREATION_APPROVE_CAMPAIGN_BUDGET_CMS =
  "campaignCreationApproveCampaignBudgetCms";
export const CAMPAIGN_CREATION_APPROVE_CAMPAIGN_CREATIVE_CMS =
  "campaignCreationApproveCampaignCreativeCms";
export const CAMPAIGN_CREATION_FINAL_APPROVE_CAMPAIGN_CMS =
  "campaignCreationFinalApproveCampaignCms";
export const CAMPAIGN_CREATION_GET_CREATIVE_REQUEST_DETAILS_VENDOR_CMS =
  "campaignCreationGetCreativeRequestDetailsVendorCms";
export const CAMPAIGN_CREATION_GET_BUDGET_REQUEST_DETAILS_VENDOR_CMS =
  "campaignCreationGetBudgetRequestDetailsVendorCms";

export const USERS_GET_CMS = "usersGetCms";
export const USERS_DELETE_CMS = "usersDeleteCms";
export const USERS_ADD_CMS = "usersAddCms";

export const CREATIVE_GET_CMS = "creativeGetCms";
export const CREATIVE_ADD_CMS = "creativeAddCms";
// coupons
export const COUPON_ADD_CMS = "couponAddCms";
// monitoring
export const CAMPAIGN_MONITORING_DATA_ADD_CMS = "campaignMonitoringDataAddCms";

// not in use as of now
export const CAMPAIGN_CREATION_CMS = "campaignCreationCms";
export const MONITORING_GET_CAMPAIGN_DETAILS = "MonitoringGetCampaignDetails";
