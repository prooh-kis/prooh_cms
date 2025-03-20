import {
  convertDateIntoDateMonthYear,
} from "../../utils/dateAndTimeUtils";
import { formatNumber } from "../../utils/formatValue";

export const VendorConfirmationBasicTable = ({
  vendorConfirmationData,
}: any) => {
  return (
    <div className="w-full py-1 px-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Campaign Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">{vendorConfirmationData?.name}</h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Total Cost</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
                &#8377;
                {
                  formatNumber(Number(vendorConfirmationData.screenWiseSlotDetails?.map((d: any) => {
                    return d.pricePerSlot * d.slotsPerDay * vendorConfirmationData?.duration
                  })?.reduce((acc: any, val: any) => acc + val, 0)).toFixed(0))
                }
                {/* {formatNumber(
                  Number(vendorConfirmationData?.totalCampaignBudget)
                )} */}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Campaign Type</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.campaignType?.replace(/([A-Z])/g, ' $1').trim()}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Trigger</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
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
              <h1 className="text-[14px]">Planner Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">{vendorConfirmationData?.campaignPlannerName == "vinciis" ? "test user" : vendorConfirmationData?.campaignPlannerName?.toUpperCase()}</h1>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Start Date</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {convertDateIntoDateMonthYear(
                  vendorConfirmationData?.startDate
                )}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">End Date</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {convertDateIntoDateMonthYear(vendorConfirmationData?.endDate)}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Duration</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.duration}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Client Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.clientName}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7]">
              <h1 className="text-[14px]">Brand Name</h1>
            </div>
            <div className="border py-1 px-4">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.brandName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
