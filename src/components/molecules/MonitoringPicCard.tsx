import { format } from "date-fns";
import { FileTypeIcon } from "./FileTypeIcon";

interface MonitoringTypeConfig {
  label: string;
  value: string;
  iconType: string;
}

interface MonitoringPicCardProps {
  url: string;
  fileType: string;
  monitoringType: string;
  uploadedDate: string;
  colorCode: string;
  cardHeight?: string;
}

const MONITORING_TYPE_CONFIGS: MonitoringTypeConfig[] = [
  { label: "Day Shots", value: "dayShot", iconType: "fi-rs-brightness" },
  {
    label: "With Newspaper",
    value: "withNewspaper",
    iconType: "fi-rr-newspaper",
  },
  {
    label: "With Geo Tag",
    value: "withGeoTag",
    iconType: "fi-ss-map-marker-check",
  },
  {
    label: "Loop Video",
    value: "loopVideo",
    iconType: "fi-sr-video-camera-alt",
  },
  { label: "Night Shots", value: "nightShot", iconType: "fi-ss-moon" },
];

const MONITORING_TYPE_LABELS: Record<string, string> = {
  dayShot: "Day Shot",
  withNewspaper: "With Newspaper",
  loopVideo: "Loop Video",
  nightShot: "Night Shot",
  withGeoTag: "With Geo Tag",
};

export const MonitoringPicCard = ({
  url,
  fileType,
  monitoringType,
  uploadedDate,
  colorCode,
  cardHeight = "h-[200px]", // Increased default height
}: MonitoringPicCardProps) => {
  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");
  const formattedDate = format(new Date(uploadedDate), "yyyy-MM-dd");
  const iconType = MONITORING_TYPE_CONFIGS.find(
    (config) => config.value === monitoringType
  )?.iconType;
  const displayType = MONITORING_TYPE_LABELS[monitoringType] || monitoringType;

  const renderMedia = () => {
    if (isImage) {
      return (
        <img
          src={url}
          alt={displayType}
          className="w-full h-full object-cover rounded-t-[12px]"
          loading="lazy"
        />
      );
    }

    if (isVideo) {
      return (
        <video
          src={url}
          controls
          className="w-full h-full object-cover rounded-t-[12px]"
          aria-label={displayType}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <div className="p-4 text-center">
        <FileTypeIcon
          fileType={fileType}
          monitoringType={monitoringType}
          className="w-12 h-12 mx-auto"
        />
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Unsupported file type
        </p>
      </div>
    );
  };

  return (
    <div
      className={`relative flex flex-col rounded-[12px] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 ${cardHeight}`}
    >
      {/* Media container - takes about 70% of card height */}
      <div className="flex-1 relative h-[70%]">{renderMedia()}</div>

      {/* Info container - takes about 30% of card height */}
      <div className="p-2 h-[30%] ">
        <div className="flex items-center gap-2 ">
          {iconType && <i className={`fi ${colorCode} ${iconType} text-sm`} />}
          <span className="text-sm font-medium text-blue-800 dark:text-blue-200 line-clamp-1">
            {displayType}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 p-0 m-0">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
