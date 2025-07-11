import {
  CAMPAIGNS_LIST,
  DMP_QUERIES,
  MY_COUPONS,
  MY_CREATIVES,
  MY_REQUESTS,
  QUERIES,
  SCREEN_CAMPAIGN_MONITORING,
  SCREENS_LIST,
  USERS,
} from "../routes/routes";

export const campaignMonitoringTab = [
  {
    id: "1",
    label: "Day",
    value: "day",
  },
  {
    id: "2",
    label: "Night",
    value: "night",
  },
  {
    id: "3",
    label: "Miss",
    value: "miss",
  },
];

export const creativeTypeTab = [
  {
    id: "standardDayTimeCreatives",
    label: "Standard Days Creative",
    value: "standardDayTimeCreatives",
  },
  {
    id: "standardNightTimeCreatives",
    label: "Standard Night Creative",
    value: "standardNightTimeCreatives",
  },
  {
    id: "triggerCreatives",
    label: "Trigger Creatives",
    value: "triggerCreatives",
  },
];

export const campaignTypeTabs = [
  {
    id: "1",
    label: "Active",
    value: "Active",
  },
  {
    id: "2",
    label: "Live",
    value: "Live",
  },
  {
    id: "3",
    label: "Upcoming",
    value: "Pending",
  },
  {
    id: "4",
    label: "Hold",
    value: "Hold",
  },
  {
    id: "5",
    label: "Paused",
    value: "Pause",
  },
  {
    id: "6",
    label: "Completed",
    value: "Completed",
  },
  {
    id: "7",
    label: "Deleted",
    value: "Deleted",
  },

  {
    id: "8",
    label: "Default",
    value: "Default",
  },
];

export const campaignCreationTypeTabs = [
  {
    id: "1",
    label: "Active",
    value: "Active",
  },
  {
    id: "2",
    label: "Upcoming",
    value: "Pending",
  },
  {
    id: "3",
    label: "Completed",
    value: "Completed",
  },
];

export const queriesTypeTabs = [
  {
    id: "1",
    label: "All",
    value: "All",
  },
  {
    id: "2",
    label: "Unread",
    value: "unread",
  },
  {
    id: "3",
    label: "Read",
    value: "read",
  },
  {
    id: "4",
    label: "Resolved",
    value: "resolved",
  },
];

export const dmpQueriesTypeTabs = [
  {
    id: "1",
    label: "All",
    value: "All",
  },
  {
    id: "2",
    label: "Verified",
    value: "verified",
  },
  {
    id: "3",
    label: "Unverified",
    value: "unverified",
  },
];

export const menuItemsAdmin = [
  {
    value: "My Screens",
    path: SCREENS_LIST,
    icon: "fi fi-sr-screen ",
    option: "Screens",
  },
  {
    value: "Campaigns",
    path: CAMPAIGNS_LIST,
    icon: "fi fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Creatives",
    path: MY_CREATIVES,
    icon: "fi fi-sr-photo-video ",
    option: "Creatives",
  },
  {
    value: "Monitoring",
    path: SCREEN_CAMPAIGN_MONITORING,
    icon: "fi fi-br-camera-movie ",
    option: "Monitoring",
  },
  {
    value: "Requests",
    path: MY_REQUESTS,
    icon: "fi fi-ss-bell-notification-social-media",
    option: "Requests",
  },
  {
    value: "Coupons",
    path: MY_COUPONS,
    icon: "fi fi-bs-ticket",
    option: "Coupons",
  },
  {
    value: "Users",
    path: USERS,
    icon: "fi fi-sr-users-alt ",
    option: "Users",
  },
  {
    value: "Queries",
    path: QUERIES,
    icon: "fi fi-sr-person-circle-question",
    option: "Queries",
  },
  {
    value: "Dmp Queries",
    path: DMP_QUERIES,
    icon: "fi fi-sr-code-pull-request-closed",
    option: "DmpQueries",
  },
];

export const menuItemsScreenOwner = [
  {
    value: "My Screens",
    path: SCREENS_LIST,
    icon: "fi fi-sr-screen ",
    option: "Screens",
  },
  {
    value: "Campaigns",
    path: CAMPAIGNS_LIST,
    icon: "fi fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Creatives",
    path: MY_CREATIVES,
    icon: "fi fi-sr-photo-video ",
    option: "Creatives",
  },
  {
    value: "Monitoring",
    path: SCREEN_CAMPAIGN_MONITORING,
    icon: "fi fi-br-camera-movie ",
    option: "Monitoring",
  },
  {
    value: "Requests",
    path: MY_REQUESTS,
    icon: "fi fi-ss-bell-notification-social-media",
    option: "Requests",
  },
  {
    value: "Users",
    path: USERS,
    icon: "fi fi-sr-users-alt ",
    option: "Users",
  },
];

export const menuItemsScreenManager = [
  {
    value: "My Screens",
    path: SCREENS_LIST,
    icon: "fi fi-sr-screen ",
    option: "Screens",
  },
  {
    value: "Campaigns",
    path: CAMPAIGNS_LIST,
    icon: "fi fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Creatives",
    path: MY_CREATIVES,
    icon: "fi fi-sr-photo-video ",
    option: "Creatives",
  },
  {
    value: "Monitoring",
    path: SCREEN_CAMPAIGN_MONITORING,
    icon: "fi fi-br-camera-movie ",
    option: "Monitoring",
  },
];

export const menuItemsScreenMonitoring = [
  {
    value: "My Screens",
    path: SCREENS_LIST,
    icon: "fi fi-sr-screen ",
    option: "Screens",
  },
];

// dashboard tab constants
export const CAMPAIGN_DURATION = "campaignDuration";
export const AUDIENCE_IMPRESSION = "audienceImpression";
export const HARDWARE_PERFORMANCE = "hardwarePerformance";
export const SPOT_DELIVERY = "spotDelivery";
export const COST_CONSUMED = "costConsumed";

export const siteLevelPerformanceTabData = [
  { id: "1", label: "Campaign Duration", value: CAMPAIGN_DURATION },
  { id: "2", label: "Audience Impression", value: AUDIENCE_IMPRESSION },
  { id: "3", label: "Hardware Performance", value: HARDWARE_PERFORMANCE },
  { id: "4", label: "Slot delivery", value: SPOT_DELIVERY },
  { id: "5", label: "Cost consumption", value: COST_CONSUMED },
];

export const siteLevelAnalysisTabData = [
  { id: "1", label: "Site Analysis", value: "siteAnalysis" },
  { id: "2", label: "Site Monitoring", value: "siteMonitoring" },
  // { id: "3", label: "Site Logs", value: "siteLogs" },
];

export const siteLevelMonitoringTabData = [
  { id: "1", label: "Start Date", value: "startDate" },
  { id: "2", label: "End Date", value: "endDate" },
  { id: "3", label: "Mid Date", value: "midDate" },
];
