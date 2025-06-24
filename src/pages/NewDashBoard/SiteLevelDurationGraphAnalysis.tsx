import { useDispatch, useSelector } from "react-redux";
import { DurationGraphPerDay } from "../../components/segments/DurationGraphPerDay";
import { useEffect } from "react";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { CAMPAIGN_DURATION } from "../../constants/tabDataConstant";
import { getUserRole } from "../../utils/campaignUtils.js";

export const SiteLevelDurationGraphAnalysis = ({
  campaignId,
  currentDate,
}: any) => {
  const dispatch = useDispatch<any>();
  const {
    loading: loadingTabWiseSiteData,
    error: errorTabWiseSiteData,
    data: tabWiseSiteData,
  } = useSelector(
    (state: any) => state.siteLevelPerformanceTabWiseForPlannerDashboard
  );

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    dispatch(
      getSiteLevelPerformanceTabWiseForPlannerDashboard({
        campaignId: campaignId,
        userRole: getUserRole(userInfo?.userRole),
        userId: userInfo?._id,
        tab: CAMPAIGN_DURATION,
        date: new Date(currentDate).toISOString().replace("Z", "+00:00"),
        dayTypes: [],
        timezones: [],
      })
    );
  }, [dispatch, campaignId, currentDate]);

  return (
    <div className="h-auto border rounded-[12px] border-gray-100 shadow-sm">
      {!loadingTabWiseSiteData && tabWiseSiteData ? (
        <DurationGraphPerDay
          currentData={tabWiseSiteData}
          additionalLegends={[
            {
              label: "Hourly Delivery",
              values: [1500],
              color: "rgba(16, 185, 129, 1)",
            },
            {
              label: "Extra Delivery",
              values: [1200],
              color: "rgba(245, 158, 11, 1)",
            },
          ]}
        />
      ) : (
        <div className="bg-[#FFFFFF] h-[200px] rounded-[12px]">
          <LoadingScreen />
        </div>
      )}
    </div>
  );
};
