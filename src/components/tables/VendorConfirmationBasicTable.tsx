import { convertDateIntoDateMonthYear } from "../../utils/dateAndTimeUtils";

export const VendorConfirmationBasicTable = ({
  vendorConfirmationData,
}: any) => {
  return (
    <div className="flex flex-col justify-between rounded p-4 mb-1 w-full bg-white">
      <h1 className="text-[14px] font-semibold text-[#0E212E] leading-[100%] pb-4">
        Campaign details
      </h1>
      <div className="grid grid-cols-3 gap-4 text-[12px]">
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Brand Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">{vendorConfirmationData?.brandName}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Start Date</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="">
                {convertDateIntoDateMonthYear(
                  vendorConfirmationData?.startDate
                )}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">End Date</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="">
                {convertDateIntoDateMonthYear(vendorConfirmationData?.endDate)}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Duration</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">{vendorConfirmationData?.duration} Days</h1>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Campaign Type</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">
                {vendorConfirmationData?.campaignType
                  ?.replace(/([A-Z])/g, " $1")
                  .trim()}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Trigger</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">
                {vendorConfirmationData?.trigger === "weatherTriggers"
                  ? "Weather Trigger"
                  : vendorConfirmationData?.trigger === "sportsTriggers"
                  ? "Sports Trigger"
                  : vendorConfirmationData?.trigger === "vacantSlots"
                  ? "Fill Vacancy"
                  : "None"}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">SOV</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">{vendorConfirmationData?.sov}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">SOV Type</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">{vendorConfirmationData?.sovType}</h1>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Total screen selected</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">{vendorConfirmationData?.screenIds?.length}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Monitoring Dated</h1>
            </div>
            <div className="border py-1 px-4 text-[10px]">
              <h1 className="">
                {vendorConfirmationData?.monitoringDates?.length > 0
                  ? vendorConfirmationData?.monitoringDates?.join(", ")
                  : "N/A"}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Creative type</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">
                {vendorConfirmationData?.creativeTypes?.length > 0
                  ? vendorConfirmationData?.creativeTypes?.join(", ")
                  : "N/A"}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="">Planner Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="">
                {vendorConfirmationData?.campaignPlannerName == "vinciis"
                  ? "test user"
                  : vendorConfirmationData?.campaignPlannerName?.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
