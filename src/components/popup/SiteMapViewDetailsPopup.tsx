import { useState } from "react";
import { Map } from "@vis.gl/react-google-maps";
import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { NewCustomMarker } from "../../components/map/NewCustomMarker";
import { getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { formatNumber } from "../../utils/formatValue";
import { LinearBar } from "../molecules/linearbar";
import { MonitoringPic } from "../segments/MonitoringPic";

interface SiteMapViewDetailsPopupProps {
  handleCancel: () => void;
  geometry?: {
    coordinates: [number, number];
  };
  zoom?: number;
  sitesDataMapViewData?: any[];
  currentSite?: {
    slotsPromisedTillDate?: number;
    slotsDelivered?: number;
    impressionsPromisedTillDate?: number;
    impressionsDelivered?: number;
    costTakenTillDate?: number;
    costConsumed?: number;
  };
}

interface SiteInfoHeaderProps {
  screenName?: string;
  address?: string;
  lastActive?: Date | string;
  onClose: () => void;
  images: string[];
  showCloseIcon?: any;
}

interface StatusIndicatorProps {
  lastActive?: Date | string;
}

interface ValueDisplayProps {
  left: string | number;
  right: string | number;
  isPositive?: boolean;
  value?: number;
  inPercentage: boolean;
}

interface MetricCardProps {
  label: string;
  delivered: number;
  promised: number;
  colors?: string[];
  inPercentage?: boolean;
}

interface LegendItem {
  id: string;
  label: string;
  color: string;
  size: number; // Made required by removing the optional operator (?)
  doubleColor?: boolean;
  secondColor?: string;
}
const Legend = () => {
  const legendItems: LegendItem[] = [
    {
      id: "iconic-screens",
      label: "Iconic Screens",
      color: "#129BFF",
      size: 6,
    },
    {
      id: "big-screens",
      label: "Big Screens",
      color: "#129BFF",
      size: 5,
    },
    {
      id: "small-screens",
      label: "Small Screens",
      color: "#129BFF",
      size: 4,
    },
    {
      id: "current-day",
      label: "Current Day",
      color: "#FFDB5D",
      size: 4,
    },
    {
      id: "hardware-performance",
      label: "Hardware Performance",
      color: "#6982FF",
      size: 4,
    },
    {
      id: "overall-performance",
      label: "Overall Performance",
      color: "#FF0000",
      size: 4,
      doubleColor: true,
      secondColor: "#149031",
    },
  ];

  return (
    <div className="flex gap-4 py-2 flex-wrap">
      {legendItems.map((item) => (
        <div key={item.id} className="flex gap-2 items-center">
          <div
            className="rounded-full"
            style={{
              width: `${item.size * 0.25}rem`,
              height: `${item.size * 0.25}rem`,
              backgroundColor: item.color,
            }}
          />
          {item.doubleColor && item.secondColor && (
            <div
              className="rounded-full"
              style={{
                width: `${item.size * 0.25}rem`,
                height: `${item.size * 0.25}rem`,
                backgroundColor: item.secondColor,
              }}
            />
          )}
          <h1 className="text-[#0E212E] text-[14px] font-inter">
            {item.label}
          </h1>
        </div>
      ))}
    </div>
  );
};

export const ValueDisplay = ({
  left,
  right,
  isPositive = true,
  value,
  inPercentage,
}: ValueDisplayProps) => (
  <h1 className="text-[12px] font-medium leading-[32.68px] text-[#9bb3c9]">
    <span className="text-[#0E212E]">
      {formatNumber(left)}
      {inPercentage && "%"}
    </span>{" "}
    / {formatNumber(right)}
    {inPercentage && "%"}
    {value !== undefined && (
      <span className={isPositive ? "text-[#2A892D]" : "text-[#CC0000]"}>
        {` (${value}%)`}
        <i
          className={`fi ${isPositive ? "fi-rr-arrow-up" : "fi-rr-arrow-down"}`}
        />
      </span>
    )}
  </h1>
);

export const MetricCard = ({
  label,
  delivered,
  promised,
  colors,
  inPercentage = false,
}: MetricCardProps) => {
  const percentage = ((delivered / promised) * 100).toFixed(0);
  const isPositive = delivered >= promised;

  return (
    <div className="flex flex-col gap-2 mt-2 border-b">
      <p className="text-[#0E212E] font-normal text-[14px]">{label}</p>
      <div className="grid grid-cols-5 gap-4 items-center">
        <div className="col-span-3">
          <LinearBar
            value={delivered}
            colors={colors || ["#FFF2C3", "#FFDB5D"]}
            highest={promised}
            percent={false}
          />
        </div>
        <div className="col-span-2">
          <ValueDisplay
            left={delivered}
            right={promised}
            value={Number(percentage)}
            isPositive={isPositive}
            inPercentage={inPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export const StatusIndicator = ({ lastActive }: StatusIndicatorProps) => {
  const getStatusClass = () => {
    if (!lastActive) return "bg-[#ff3333]";
    const diffMinutes = getTimeDifferenceInMin(lastActive);
    return diffMinutes < 15 ? "bg-[#348730]" : "bg-[#ffec33]";
  };

  return (
    <div
      className={`border w-4 h-4 ${getStatusClass()} rounded-full justify-end`}
    />
  );
};

export const SiteInfoHeader = ({
  screenName = "Road segment A",
  address = "Delhi Sector-29",
  lastActive,
  onClose,
  images,
  showCloseIcon = true,
}: SiteInfoHeaderProps) => (
  <div>
    {showCloseIcon ? (
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className={`h-16 w-16 rounded-[7px] overflow-hidden`}>
            <img
              src={images[0]}
              alt={screenName}
              className="w-full h-full object-cover rounded-[7px]"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[#e3e3e3]"
                );
              }}
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <h1 className="text-[#0E212E] text-[16px] font-semibold m-0 p-0">
                {screenName}
              </h1>
              {showCloseIcon && <StatusIndicator lastActive={lastActive} />}
            </div>
            <p className="text-[#667D8C] font-normal text-[12px]">{address}</p>
          </div>
        </div>
        {showCloseIcon && (
          <i
            className="fi fi-br-cross text-[14px] cursor-pointer"
            onClick={onClose}
          />
        )}
      </div>
    ) : (
      <div>
        <div className="rounded-[7px] p-2">
          <img
            src={images?.[0]}
            alt={screenName}
            className="w-full h-full object-cover rounded-[7px]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.classList.add(
                "bg-[#e3e3e3]"
              );
            }}
          />
        </div>
        <div className="px-2 pt-2">
          <h1 className="text-[#0E212E] text-[16px] font-semibold m-0 p-0">
            {screenName}
          </h1>
          <p className="text-[#667D8C] font-normal text-[12px]">{address}</p>
        </div>
      </div>
    )}
  </div>
);

export const SiteMapViewDetailsPopup = ({
  handleCancel,
  geometry,
  zoom = 10,
  sitesDataMapViewData = [],
}: SiteMapViewDetailsPopupProps) => {
  const [viewState] = useState({
    center: {
      lat: sitesDataMapViewData?.[0]?.lat || 28.495,
      lng: sitesDataMapViewData?.[0]?.lng || 77.0891,
    },
    zoom,
  });

  const [currentSite, setCurrentSite] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState<string>("1");

  // Then when using the component:
  <TabWithoutIcon
    tabData={[
      { id: "1", label: "Site Overview" },
      { id: "2", label: "Monitoring Pic" },
    ]}
    currentTab={currentTab}
    setCurrentTab={setCurrentTab}
    textSize={"text-[14px]"}
  />;
  const metrics = [
    {
      id: "1",
      label: "Spots Delivery",
      delivered: currentSite?.slotsDelivered || 0,
      promised: currentSite?.slotsPromisedTillDate || 1,
      colors: ["#EDEDED", "#FFAC26"],
    },
    {
      id: "2",
      label: "Hardware Performance",
      delivered: currentSite?.hardwarePerformanceDelivered?.toFixed(2) || 0,
      promised:
        currentSite?.hardwarePerformancePromisedTillDate?.toFixed(2) || 1,
      colors: ["#EDEDED", "#6982FF"],
      inPercentage: true,
    },
    {
      id: "3",
      label: "Impressions",
      delivered: currentSite?.impressionsDelivered || 0,
      promised: currentSite?.impressionsPromisedTillDate || 1,
      colors: ["#EDEDED", "#129BFF"],
    },
    {
      id: "4",
      label: "Cost Consumed",
      delivered: currentSite?.costConsumed || 0,
      promised: currentSite?.costTakenTillDate || 1,
      colors: ["#EDEDED", "#01A227"],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 font-inter">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-[80vh] w-[95%] p-4">
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5">
          <div className="flex gap-2 items-center">
            <h1 className="text-[#0E212E] font-semibold text-[20px] font-inter">
              Site Map View{" "}
              <span className="text-[#B0B0B0] text-[14px]">
                ({sitesDataMapViewData?.length || 0} Sites)
              </span>
            </h1>
          </div>

          <i
            className="fi fi-br-cross text-[14px] cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className={`h-[65vh] w-full flex rounded-[12px]`}>
          <div
            className={`${
              currentSite ? "w-2/3 rounded" : "w-full rounded"
            } h-full bg-[#F3F3F3] `}
          >
            <Map
              defaultCenter={viewState.center}
              defaultZoom={viewState.zoom}
              mapId="b10d18ff9dd84d5c"
              gestureHandling="greedy"
              disableDefaultUI={true}
              className="h-full w-full"
            >
              {sitesDataMapViewData.map((marker) => (
                <NewCustomMarker
                  key={marker.id}
                  marker={marker}
                  color="#00A0FA"
                  size={
                    marker.screenType === "Spectacular"
                      ? 60
                      : marker.screenType === "Large"
                      ? 44
                      : 36
                  }
                  action={setCurrentSite}
                />
              ))}
            </Map>
          </div>

          {currentSite && (
            <div className="w-1/3 bg-white border rounded-tr-[12px] rounded-br-[12px] shadow-md p-4 h-full overflow-auto">
              <SiteInfoHeader
                screenName={currentSite?.screenName}
                address={currentSite?.address}
                lastActive={currentSite?.lastActive}
                onClose={() => setCurrentSite(null)}
                images={currentSite?.images}
              />
              <div className="mt-2">
                <TabWithoutIcon
                  tabData={[
                    { id: "1", label: "Site Overview" },
                    { id: "2", label: "Monitoring Pic" },
                  ]}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  textSize={"text-[14px]"}
                />
              </div>
              {currentTab === "1" ? (
                <div className="flex flex-col mt-4">
                  {metrics.map((metric, i: any) => (
                    <MetricCard
                      key={i}
                      label={metric.label}
                      delivered={metric.delivered}
                      promised={metric.promised}
                      colors={metric?.colors}
                      inPercentage={metric?.inPercentage}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  <MonitoringPic
                    result={currentSite?.monitoringData || []}
                    className="grid-cols-2"
                    cardHeight="h-[200px]"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        <Legend />
      </div>
    </div>
  );
};
