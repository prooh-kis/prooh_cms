import { SiteMapViewDetailsPopup } from "../../components/popup/SiteMapViewDetailsPopup";
import React, { useCallback } from "react";
import { MonitoringPicturesAllSitesPopup } from "./MonitoringPicturesAllSitesPopup";
import { useSelector } from "react-redux";

interface MonitoringProps {
  bg: string;
  text: string;
  label: string;
  data: any;
}

const Monitoring = ({ bg, text, label, data }: MonitoringProps) => {
  // Calculate overall percentage for this date period
  const totalCount = Object.values(data).reduce(
    (sum: number, item: any) => sum + item.count,
    0
  );
  const totalTotal = Object.values(data).reduce(
    (sum: number, item: any) => sum + item.total,
    0
  );
  const overallPercentage =
    totalTotal > 0 ? Math.round((totalCount / totalTotal) * 100) : 0;

  // Map icon data to real values from props
  const iconData = [
    {
      icon: "fi fi-ss-brightness flex items-center",
      value: data.dayShot
        ? `${Math.round((data.dayShot.count / data.dayShot.total) * 100)}%`
        : "0%",
    },
    {
      icon: "fi fi-ss-moon flex items-center",
      value: data.nightShot
        ? `${Math.round((data.nightShot.count / data.nightShot.total) * 100)}%`
        : "0%",
    },
    {
      icon: "fi fi-ss-map-marker-check flex items-center",
      value: data.withGeoTag
        ? `${Math.round(
            (data.withGeoTag.count / data.withGeoTag.total) * 100
          )}%`
        : "0%",
    },
    {
      icon: "fi fi-sr-video-camera-alt flex items-center",
      value: data.loopVideo
        ? `${Math.round((data.loopVideo.count / data.loopVideo.total) * 100)}%`
        : "0%",
    },
    {
      icon: "fi fi-sr-newspaper flex items-center",
      value: data.withNewspaper
        ? `${Math.round(
            (data.withNewspaper.count / data.withNewspaper.total) * 100
          )}%`
        : "0%",
    },
  ];

  return (
    <div className="col-span-1 border border-gray-100 gap-2 sm:gap-4 w-full p-2 rounded-md">
      <div
        style={{ backgroundColor: bg, color: text }}
        className="p-2 rounded-md flex items-center justify-center gap-2"
      >
        <div
          style={{ background: text }}
          className="h-2 w-2 rounded-full"
        ></div>
        <p className="text-[12px] font-medium leading-[100%] m-0 p-0">
          {label}
        </p>
        <p className="text-[12px] font-bold leading-[100%] m-0 p-0">
          {overallPercentage}%
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center pt-2">
        {iconData.map((item, index) => (
          <div key={index} className="flex gap-1 text-[11px] items-center">
            <i style={{ color: text }} className={item.icon}></i>
            <p className="font-bold m-0 p-0 text-[#00000090]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SiteMonitoringPicDashboardComponent = ({
  sitesDataMapViewData,
  openSiteMapView,
  setOpenSiteMapView,
  openMonitoringView,
  setOpenMonitoringView,
  siteLevelData,
  loadingSiteLevel,
  campaignId,
}: any) => {
  const handleCancel = () => {
    setOpenSiteMapView(false);
  };
  const handleOpenSiteMapView = useCallback(() => {
    setOpenSiteMapView(true);
  }, [setOpenSiteMapView]);

  const handleCancelMonitoringPopup = () => {
    setOpenMonitoringView(false);
  };
  const handleOpenMonitoringPicsView = useCallback(() => {
    setOpenMonitoringView(true);
  }, [setOpenMonitoringView]);

  const updatedData = sitesDataMapViewData?.map((data: any) => {
    return {
      ...data,
      lat: data.location.latitude,
      lng: data.location.longitude,
      id: data.location._id,
      screenType: "Spectacular",
    };
  });

  const {
    loading: loading,
    error: error,
    data: siteMonitoringPicsPercentageData,
  } = useSelector((state: any) => state.siteMonitoringPicsPercentage);

  // console.log("ddddddd : ", JSON.stringify(siteMonitoringPicsPercentageData));

  // Calculate overall percentage for the header
  const calculateOverallPercentage = () => {
    if (!siteMonitoringPicsPercentageData?.result) return 0;

    let totalCount = 0;
    let totalTotal = 0;

    Object.values(siteMonitoringPicsPercentageData.result).forEach(
      (dateData: any) => {
        Object.values(dateData).forEach((metric: any) => {
          totalCount += metric.count;
          totalTotal += metric.total;
        });
      }
    );

    return totalTotal > 0 ? Math.round((totalCount / totalTotal) * 100) : 0;
  };

  const getLabel = (key: string) => {
    return key === "startDate" ? "Start" : key === "midDate" ? "Mid" : "End";
  };

  const orderedLabel = ["startDate", "midDate", "endDate"];

  // Function to sort the array according to orderedLabel
  function sortDates(data: string[]) {
    return orderedLabel.filter((label) => data.includes(label));
  }

  const getColorScheme = (label: string) => {
    switch (label.toLowerCase()) {
      case "start":
        return { bg: "#F4FFF6", text: "#5AAF69" };
      case "mid":
        return { bg: "#FFF9F0", text: "#FFB800" };
      case "end":
        return { bg: "#FFF0F0", text: "#FF5A5A" };
      default:
        return { bg: "#F4FFF6", text: "#5AAF69" };
    }
  };

  const rowCount = siteMonitoringPicsPercentageData?.result
    ? Object.keys(siteMonitoringPicsPercentageData.result).length
    : 1;

  const getGridColsClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <div className="bg-[#FFFFFF] mt-2 w-full border border-gray-100 rounded-[12px] shadow-sm p-4">
      {openSiteMapView && (
        <SiteMapViewDetailsPopup
          handleCancel={handleCancel}
          sitesDataMapViewData={updatedData}
        />
      )}
      {openMonitoringView && (
        <MonitoringPicturesAllSitesPopup
          open={openMonitoringView}
          handleCancel={handleCancelMonitoringPopup}
          campaignId={campaignId}
        />
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-[15px] sm:text-[16px] py-2 font-semibold leading-[19.36px] text-[#0E212E]">
          Site Monitoring Pics{" "}
          <span className="text-[14px] text-[#68879C]">
            (
            {siteMonitoringPicsPercentageData?.siteMonitoringPicsPercentage?.toFixed(
              0
            )}
            %)
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
          <div
            onClick={handleOpenSiteMapView}
            className=" cursor-pointer flex font-bold text-[13px] sm:text-[14px] text-[#129BFF] gap-1 items-center"
          >
            <i className="fi fi-sr-marker"></i>
            <p>Campaign On Map</p>
          </div>
          <div
            className="cursor-pointer flex font-normal text-[13px] sm:text-[14px] text-[#637D90] gap-1 items-center"
            onClick={handleOpenMonitoringPicsView}
          >
            <p>View All Pics</p>
            <i className="fi fi-br-angle-small-right"></i>
          </div>
        </div>
      </div>
      <div className={`mt-4 grid gap-4 ${getGridColsClass(rowCount)}`}>
        {siteMonitoringPicsPercentageData?.result &&
          sortDates(
            Object.keys(siteMonitoringPicsPercentageData?.result || {})
          ).map((key: string) => {
            const colorScheme = getColorScheme(getLabel(key));
            return (
              <Monitoring
                key={key}
                bg={colorScheme.bg}
                text={colorScheme.text}
                label={getLabel(key)}
                data={siteMonitoringPicsPercentageData.result[key]}
              />
            );
          })}
      </div>
    </div>
  );
};
