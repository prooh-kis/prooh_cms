import React, { useEffect, useState, useCallback } from "react";
import { CampaignDashboard } from "./CampaignDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import {
  getBasicDataForPlannerDashboard,
  getCampaignCreationsDetails,
  getSiteMonitoringPicsPercentage,
  getSitesDataMapViewForPlannerDashboard,
} from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

import { getUserRole } from "../../utils/campaignUtils.js";

interface FilterState {
  audience: string[];
  screenPerformance: string[];
  spotDelivery: string[];
  costConsumption: string[];
  siteLevel: string[];
}

export const NewDashBoard: React.FC = () => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const campaignId = pathname.split("/")[2] || "";

  // console.log("NewDashBoard  : ", campaignId);

  const [openInvoice, setOpenInvoice] = useState<any>(false);
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  // State for filters
  const [filters, setFilters] = useState<{
    cities: FilterState;
    touchPoints: FilterState;
    screenTypes: FilterState;
    dayTypes: FilterState;
    timezones: FilterState;
  }>({
    cities: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    touchPoints: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    screenTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    dayTypes: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
    timezones: {
      audience: [],
      screenPerformance: [],
      spotDelivery: [],
      costConsumption: [],
      siteLevel: [],
    },
  });

  // Selectors for Redux state
  const {
    loading: loadingCampaignDetails,
    error: errorCampaignDetails,
    data: campaignDetails,
  } = useSelector((state: any) => state.campaignCreationsDetailsGet);

  const {
    loading: loadingDashboard,
    error: errorDashboard,
    data: dashboardData,
  } = useSelector((state: any) => state.basicDataForPlannerDashboard);

  const { loading: loadingSiteLevel, data: siteLevelData } = useSelector(
    (state: any) => state.siteLevelPerformanceForPlannerDashboard
  );

  const { loading: loadingSitesDataMapView, data: sitesDataMapViewData } =
    useSelector((state: any) => state.sitesDataMapViewForPlannerDashboard);

  // Set up initial data fetch and refresh interval
  useEffect(() => {
    dispatch(
      getCampaignCreationsDetails({
        id: campaignId,
      })
    );
    dispatch(
      getBasicDataForPlannerDashboard({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );

    dispatch(
      getSiteMonitoringPicsPercentage({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );
    dispatch(
      getSitesDataMapViewForPlannerDashboard({
        id: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
      })
    );
  }, [dispatch, campaignId]);

  const isLoading = loadingCampaignDetails || loadingDashboard;
  const hasError = errorCampaignDetails || errorDashboard;

  if (isLoading) {
    return (
      <div className="w-full h-full space-y-2">
        <div className="h-[10vh] w-full border rounded-[12px] mt-10">
          <SkeletonLoader />
        </div>
        <div className="h-[20vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
        <div className="h-[40vh] w-full border rounded-[12px]">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-[20vh] w-full border rounded-[12px] p-4">
        <p className="text-[14px]">
          Stay tuned for the campaign dashboard...
          {/* {errorCampaignDetails?.data?.message || errorDashboard?.data.message} */}
        </p>
      </div>
    );
  }
  return (
    <div className="w-full">
      {!loadingCampaignDetails && campaignDetails ? (
        <CampaignDashboard
          pathname={pathname}
          loading={isLoading}
          campaignDetails={campaignDetails}
          screenLevelData={dashboardData}
          filters={filters}
          setFilters={setFilters}
          sitesDataMapViewData={sitesDataMapViewData}
          siteLevelData={siteLevelData}
          loadingSiteLevel={loadingSiteLevel}
          setOpenInvoice={setOpenInvoice}
          openInvoice={openInvoice}
          billInvoiceDetailsData={{}}
        />
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};
