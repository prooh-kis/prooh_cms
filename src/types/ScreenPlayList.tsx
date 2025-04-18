export interface ScreenPlayListCampaign {
  _id: string;
  name: string;
  brandName: string;
  // Add other campaign properties as needed
}

export interface ScreenPlayListScreen {
  id: string;
  downloadedMedia?: any[];
  // Add other screen properties as needed
}

export interface ScreenPlayListProps {
  campaigns: ScreenPlayListCampaign[];
  currentTab: string;
  getDurationCount: () => number;
  autoLoopValue: boolean;
  handleLoopSettingClick: () => void;
  setAutoLoopValue: (value: boolean) => void;
  screenId: string;
  campaignIds: string[];
  changeCampaignStatusHandler: (params: {
    campaignIds: string[];
    status: string;
    event: string;
  }) => void;
  loadingCampaigns: boolean;
  handleGetCampaignByStatus: (tab: string) => void;
  campaignTypeTabs: any[]; // Replace with proper type
  setCurrentCampaign: (campaign: ScreenPlayListCampaign) => void;
  setSelectedCampaign: (id: string) => void;
  setCampaignIds: (ids: string[] | ((prev: string[]) => string[])) => void;
  screen: ScreenPlayListScreen;
}
