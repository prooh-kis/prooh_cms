import { convertIntoDateAndTime } from "../../utils/dateAndTimeUtils";
import ButtonInput from "../../components/atoms/ButtonInput";
import { NoDataView } from "../../components/index";
import { Loading } from "../../components/Loading";
import RadioGroupInput from "../../components/atoms/RadioGroupInput";
import { useRef } from "react";

// Reusable Panel Component
export const Panel = ({
  title,
  children,
  className = "",
  isShow = false,
  onClick,
  buttonTitle = "Save",
  loading = false,
  isShowRadio = false,
  filterScreenType = "All",
  setFilterScreenType,
  filterCampaignType = "All",
  setFilterCampaignType,
  isForCampaignType = true,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  buttonTitle?: string;
  onClick?: () => void;
  isShow?: boolean;
  loading?: boolean;
  isForCampaignType?: boolean;
  isShowRadio?: boolean;
  filterScreenType?: string;
  setFilterScreenType?: (value: string) => void;
  filterCampaignType?: string;
  setFilterCampaignType?: (value: string) => void;
}) => (
  <div className={`bg-white h-[85vh] ${className}`}>
    <div className="w-full px-4 mb-2">
      <div className="flex justify-between items-center border-b">
        <h1 className="text-[16px] font-semibold py-4 ">{title}</h1>
        {isShowRadio && (
          <RadioGroupInput
            initialValues={[
              { label: "Active", value: "Active" },
              { label: "All", value: "All" },
              { label: "Completed", value: "Completed" },
            ]}
            value={isForCampaignType ? filterCampaignType : filterScreenType}
            setValue={(value) => {
              if (isForCampaignType && setFilterCampaignType) {
                setFilterCampaignType(value);
              } else if (!isForCampaignType && setFilterScreenType) {
                setFilterScreenType(value);
              }
            }}
            className="flex items-center gap-2"
          ></RadioGroupInput>
        )}
        {isShow && (
          <ButtonInput loading={loading} onClick={onClick}>
            {loading ? "Uploading..." : buttonTitle}
          </ButtonInput>
        )}
      </div>
      {children}
    </div>
  </div>
);

// Reusable List Component
export const List = ({
  items,
  loading,
  renderItem,
  emptyView = <NoDataView />,
  className = "",
}: {
  items: any[];
  loading: boolean;
  renderItem: (item: any, index: number) => React.ReactNode;
  emptyView?: React.ReactNode;
  className?: string;
}) => {
  if (loading) return <Loading />;

  return (
    <div
      className={`p-1 overflow-y-auto scrollbar-minimal h-[70vh] bg-white ${className}`}
    >
      {items?.length > 0 ? items.map(renderItem) : emptyView}
    </div>
  );
};

// Reusable List Item Component
export const ListItem = ({
  item,
  isActive,
  onClick,
  icon,
  text,
}: {
  item: any;
  isActive: boolean;
  onClick: (item: any) => void;
  icon: string;
  text: string;
}) => (
  <div
    onClick={() => onClick(item)}
    className={`flex gap-2 border-b border-gray-100 py-2 px-2 text-[16px]  hover:text-[#129BFF90] cursor-pointer rounded-lg ${
      isActive ? "text-[#129BFF] bg-[#E7F5FF]" : "text-[##363636]"
    }`}
  >
    <i className={`fi fi-rr-${icon} flex items-center`}></i>
    <h1>{text}</h1>
  </div>
);

export const ShowUploadedCard = ({
  fileData,
  handleRemoveFile,
  index,
  dummyData,
  monitoringType,
}: any) => {
  return (
    <div className="relative border rounded-lg shadow-sm hover:shadow-md transition-shadow max-h-[180px]">
      <div className="relative group h-32 bg-gray-100 rounded-lg">
        {fileData?.fileType?.includes("image") ? (
          <img
            src={fileData?.url || fileData?.awsUrl}
            alt={fileData?.file?.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <video
              src={fileData?.url || fileData?.awsUrl}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/30 rounded-full p-2">
                <i className="fi fi-sr-play-circle text-white text-xl"></i>
              </div>
            </div>
          </>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <i
            className="fi fi-rr-cross-circle cursor-pointer text-[#FF0000]"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile(index);
            }}
          ></i>
        </div>
      </div>
      <div className="p-2 bg-gray-50 border-t">
        <div className="flex gap-2 text-[14px]">
          {dummyData?.find((d: any) => d?.value === monitoringType)?.icon}
          <h1 className="text-[#2B2B2B] text-[12.84px] font-medium font-inter">
            {dummyData?.find((d: any) => d?.value === monitoringType)?.label}
          </h1>
        </div>
        <p className="text-[11.84px] font-normal text-[#6F7F8E] truncate">
          {convertIntoDateAndTime(fileData?.uploadedDate?.toString())}
        </p>
      </div>
    </div>
  );
};

export const ShowUploadedCardV2 = ({
  fileData,
  handleRemoveFile,
  index,
  dummyData,
}: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative border rounded-lg shadow-sm hover:shadow-md transition-shadow max-h-[180px]">
      <div className="relative group h-32 bg-gray-100 rounded-lg">
        {fileData?.fileType?.includes("image") ? (
          <img
            src={fileData?.url || fileData?.awsUrl}
            alt={fileData?.file?.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <video ref={videoRef} className="h-full w-full rounded-t-lg" controls>
            <source
              src={fileData?.url || fileData?.awsUrl}
              type={fileData.fileType}
            />
          </video>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <i
            className="fi fi-sr-trash cursor-pointer text-[#FF0000] text-xl hover:text-[#cc0000] transition-colors flex-items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveFile(fileData);
            }}
          ></i>
        </div>
      </div>
      <div className="p-2 bg-gray-50 border-t">
        <div className="flex gap-2 text-[14px]">
          {
            dummyData?.find((d: any) => d?.value === fileData.monitoringType)
              ?.icon
          }
          <h1 className="text-[#2B2B2B] text-[12.84px] font-medium font-inter">
            {
              dummyData?.find((d: any) => d?.value === fileData.monitoringType)
                ?.label
            }
          </h1>
        </div>
        <p className="text-[11.84px] font-normal text-[#6F7F8E] truncate">
          {convertIntoDateAndTime(fileData?.uploadedDate?.toString())}
        </p>
      </div>
    </div>
  );
};
