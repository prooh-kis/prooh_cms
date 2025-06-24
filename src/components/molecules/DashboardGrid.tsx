import { calculateDaysPlayed } from "../../utils/dateAndTimeUtils";
import { LinearBar } from "./linearbar";
import { MultiColorLinearBar2 } from "./MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";
import { Tooltip } from "antd";

interface BarChartProps {
  campaignDetails?: {
    startDate: string;
    endDate: string;
  };
  type: string;
  screenLevelData?: {
    durationDelivered: number;
    durationPromised: number;
    impressionsDelivered: number;
    impressionsPromised: number;
    impressionsPromisedTillDate: number;
    slotsDelivered: number;
    slotsPromised: number;
    slotsPromisedTillDate: number;
    costConsumed: number;
    costTaken: number;
    costTakenTillDate: number;
    hardwarePerformancePromised?: any;
    hardwarePerformanceDelivered?: any;
    hardwarePerformancePromisedTillDate?: any;
    result?: {
      totalData?: {
        screenPerformance: number;
      };
    };
  };
}

interface SectionHeaderProps {
  iconClass: string;
  title: string;
  bgColor: string;
  dataValue?: any;
  subHeading?: any;
}

interface ValueDisplayProps {
  left: string | number;
  right: string | number;
  isPositive?: boolean;
  value?: number;
  textSize?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  iconClass,
  title,
  bgColor,
  dataValue,
  subHeading,
}) => (
  <div className="flex items-center gap-2 pb-2 truncate">
    <div className={`rounded-full p-2 ${bgColor}`}>
      <i
        className={`fi ${iconClass} text-[12px] text-white flex items-center justify-center`}
      ></i>
    </div>
    <div className="truncate w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className="text-[12px] text-[#0E212E] leading-[16.94px] truncate ">
            {title}
          </h1>
          <Tooltip title="">
            <i className="fi fi-br-info text-[12px] text-[#b2c1ca] flex justify-center items-center"></i>
          </Tooltip>
        </div>
        {dataValue && (
          <div className="flex items-center truncate">{dataValue}</div>
        )}
      </div>
      {subHeading && <p className="text-[9px] truncate">{subHeading}</p>}
    </div>
  </div>
);

const ValueAboveGraph: React.FC<
  Omit<ValueDisplayProps, "isPositive" | "value">
> = ({ left, right }) => (
  <div className="mt-1">
    <h1 className="text-[20px] font-bold text-[#9bb3c9]">
      <span className="text-[#0E212E]">{left}</span> / {right}
    </h1>
  </div>
);

const ValueBelowGraph: React.FC<ValueDisplayProps> = ({
  left,
  right,
  isPositive = true,
  value,
  textSize = "text-[14px]",
}) => (
  <div className="mt-1">
    <h1 className={`${textSize} font-medium leading-[32.68px] text-[#9bb3c9]`}>
      <span className="text-[#0E212E]">{left}</span> / {right}
      {value !== undefined && (
        <span className={isPositive ? "text-[#2A892D]" : "text-[#FF4747]"}>
          {` (${value}%)`}
          <i
            className={`fi ${
              isPositive ? "fi-rr-arrow-up" : "fi-rr-arrow-down"
            }`}
          ></i>
        </span>
      )}
    </h1>
  </div>
);

const getPercentageDifference = (
  delivered: number,
  promised: number,
  totalDays: number
): number => {
  const difference = delivered - promised;
  return Number(((difference / promised) * 100).toFixed(2));
};

export const DashboardGrid: React.FC<BarChartProps> = ({
  campaignDetails,
  type,
  screenLevelData,
}) => {
  const getDaysPlayed = (): number => {
    const days = calculateDaysPlayed(
      campaignDetails?.startDate,
      campaignDetails?.endDate
    );
    return days === 0 ? 1 : days;
  };

  const daysPlayed = getDaysPlayed();
  const durationPromised = screenLevelData?.durationPromised || 0;

  const renderDurationSection = () => (
    <>
      <SectionHeader
        iconClass="fi-sr-calendar-clock"
        title="Campaign Duration"
        bgColor=" bg-[#DC6700]"
      />
      <div className="mt-1">
        <h1 className="text-[20px] font-bold leading-[32.68px] text-[#9bb3c9]">
          <span className="text-[#0E212E]">
            {screenLevelData?.durationDelivered || 1}
          </span>
          /{durationPromised} <span>Days</span>
        </h1>
      </div>
      <div className="mt-1">
        <LinearBar
          value={screenLevelData?.durationDelivered || 1}
          colors={["#D1E5F7", "#DC6700"]}
          highest={durationPromised}
          percent={false}
        />
      </div>
      <div className="mt-1">
        <h1 className="text-[#9BB3C9] text-[14px] font-medium">
          <span className="text-[#3B8518]">
            {Math.round(
              ((screenLevelData?.durationDelivered || 0) / durationPromised) *
                100
            )}
            %{"  "}
          </span>
          Duration Completed
        </h1>
      </div>
    </>
  );

  const renderAudienceSection = () => {
    const impressionsDelivered = screenLevelData?.impressionsDelivered || 0;
    const impressionsPromised = screenLevelData?.impressionsPromised || 0;
    const impressionsTillDate =
      screenLevelData?.impressionsPromisedTillDate || 0;
    const percentage = getPercentageDifference(
      impressionsDelivered,
      impressionsTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi fi-sr-users"
          title="Audience Impressions"
          bgColor="bg-[#129BFF]"
        />
        <ValueAboveGraph
          left={formatNumber(impressionsDelivered?.toFixed(0))}
          right={formatNumber(impressionsPromised?.toFixed(0))}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={impressionsDelivered}
            expected={(impressionsPromised * daysPlayed) / durationPromised}
            total={impressionsPromised}
            deliveredColor="bg-[#129BFF]"
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(impressionsDelivered?.toFixed(0))}
          right={formatNumber(impressionsTillDate?.toFixed(0))}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderScreenSection = () => {
    const screenPerformance =
      screenLevelData?.hardwarePerformanceDelivered || 0;
    const percentage = Number(
      getPercentageDifference(
        screenPerformance,
        screenLevelData?.hardwarePerformancePromisedTillDate,
        screenLevelData?.durationDelivered || 0
      ).toFixed(0)
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-sr-dashboard"
          title="Hardware Performance"
          bgColor=" bg-[#6982FF]"
        />
        <ValueAboveGraph
          left={`${formatNumber(
            screenLevelData?.hardwarePerformanceDelivered?.toFixed(0)
          )}%`}
          right="100%"
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={screenLevelData?.hardwarePerformanceDelivered?.toFixed(
              0
            )}
            expected={screenLevelData?.hardwarePerformancePromisedTillDate?.toFixed(
              0
            )}
            total={screenLevelData?.hardwarePerformancePromised?.toFixed(0)}
            deliveredColor="bg-[#6982FF]"
          />
        </div>
        <ValueBelowGraph
          left={`${formatNumber(
            screenLevelData?.hardwarePerformanceDelivered?.toFixed(0)
          )}%`}
          right={`${formatNumber(
            screenLevelData?.hardwarePerformancePromisedTillDate?.toFixed(0)
          )}%`}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderSpotSection = () => {
    const slotsDelivered = screenLevelData?.slotsDelivered || 0;
    const slotsPromised = screenLevelData?.slotsPromised || 0;
    const slotsTillDate = screenLevelData?.slotsPromisedTillDate || 0;
    const percentage = getPercentageDifference(
      slotsDelivered,
      slotsTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-ss-screen"
          title="Spot Delivery"
          bgColor="bg-[#77BFEF]"
        />
        <ValueAboveGraph
          left={formatNumber(slotsDelivered)}
          right={formatNumber(slotsPromised)}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={slotsDelivered}
            expected={(slotsPromised * daysPlayed) / durationPromised}
            total={slotsPromised}
            deliveredColor="bg-[#77BFEF]"
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(slotsDelivered)}
          right={formatNumber(slotsTillDate)}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  const renderCostSection = () => {
    const costConsumed = screenLevelData?.costConsumed || 0;
    const costTaken = screenLevelData?.costTaken || 0;
    const costTillDate = screenLevelData?.costTakenTillDate || 0;
    const percentage = getPercentageDifference(
      costConsumed,
      costTillDate,
      screenLevelData?.durationDelivered || 0
    );

    return (
      <>
        <SectionHeader
          iconClass="fi-ss-sack"
          title="Cost Consumed"
          bgColor="bg-[#6DBC48]"
        />
        <ValueAboveGraph
          left={formatNumber(costConsumed)}
          right={formatNumber(costTaken)}
        />
        <div className="mt-1">
          <MultiColorLinearBar2
            delivered={costConsumed}
            expected={(costTaken * daysPlayed) / durationPromised}
            total={costTaken}
            deliveredColor="bg-[#6DBC48]"
          />
        </div>
        <ValueBelowGraph
          left={formatNumber(costConsumed)}
          right={formatNumber(costTillDate)}
          value={percentage}
          isPositive={percentage > 0}
        />
      </>
    );
  };

  return (
    <div className="w-full">
      {type === "duration" && renderDurationSection()}
      {type === "audience" && renderAudienceSection()}
      {type === "screen" && renderScreenSection()}
      {type === "spot" && renderSpotSection()}
      {type === "cost" && renderCostSection()}
    </div>
  );
};
