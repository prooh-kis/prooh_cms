import { useEffect, useState } from "react";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { Tooltip } from "antd";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";

export const VendorConfirmationStatusTable = ({
  campaignId,
  userInfo,
  statusTableData = [],
  selectedCampaignIds,
  setSelectedCampaignIds,
  handleOpenStatusModel,
  handleOpenMediaModel,
  campaignsList,
}: any) => {
  const [openShowMediaPopup, setOpenShowMediaPopup] = useState<any>(false);
  const [creativesToShow, setCreativesToShow] = useState<any>({
    screenName: "",
    screenId: "",
    creatives: [],
  });

  const handleRowCheckboxChange = (e: boolean, campaignId: string) => {
    let updatedIds = [...selectedCampaignIds];
    if (e) {
      // Add campaignId if row checkbox is checked
      updatedIds = [...selectedCampaignIds, campaignId];
    } else {
      // Remove campaignId if row checkbox is unchecked
      updatedIds = updatedIds.filter((id) => id !== campaignId);
    }
    setSelectedCampaignIds(updatedIds); // Update the state with the new selection
  };

  useEffect(() => {
    var campaignIds : any = []
    for ( const campaign of campaignsList ){
      if ( campaign?.campaignCreationId === statusTableData?._id )
        campaignIds.push(campaign._id.toString())
    }
    setSelectedCampaignIds(campaignIds);
  }, [setSelectedCampaignIds, statusTableData, campaignsList]);

  return (
    <div className="w-full h-[60vh] overflow-scroll no-scrollbar p-2">
      <ShowMediaPopup
        showDelete={false}
        openShowMedia={openShowMediaPopup}
        onClose={() => {
          setOpenShowMediaPopup(false);
          setCreativesToShow({ screenName: "", screenId: "", creatives: [] });
        }}
        screenName={creativesToShow?.screenName}
        media={creativesToShow?.creatives?.flatMap((item: any) => [
          ...(item.standardDayTimeCreatives || []),
          ...(item.standardNightTimeCreatives || []),
          ...(item.triggerCreatives || []),

        ])}
      />
      <table className="w-full ">
        <thead className="bg-[#EBF6FF]">
          <tr>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Sl No.
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                Screen Name
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                Media Type
                <Tooltip title="Connected media type will have real time campaign delivery updates and monitoring.">
                  <i
                    className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                    onClick={handleOpenMediaModel}
                  ></i>
                </Tooltip>
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                Cost
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                SOV
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                Creative
              </div>
            </th>
            <th className="py-2 px-1">
              <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[#129BFF]">
                Status
                <Tooltip title="Connected media type will have real time campaign delivery updates and monitoring.">
                  <i
                    className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"
                    onClick={handleOpenStatusModel}
                  ></i>
                </Tooltip>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {statusTableData?.screenWiseSlotDetails?.filter((screen: any) => {
            return statusTableData?.screenIds.includes(screen.screenId)
          })
            ?.map((status: any, i: number) => (
              <tr key={i} className="border-b hover:bg-gray-200">
                <td className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                    {i+1}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                  {status.screenName}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                    {status.mediaType || "Connected"}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                    &#8377;{Number(status.pricePerSlot * status.slotsPerDay * statusTableData?.duration).toFixed(0)}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                    {statusTableData?.sov}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]"
                    onClick={() => {
                      console.log(statusTableData);
                      setCreativesToShow({
                        screenName: status.screenName,
                        screenId: status.screenId,
                        creatives: statusTableData.creatives,
                      });
                      setOpenShowMediaPopup(true);
                    }}
                  >
                    <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-start gap-1 truncate text-[12px] text-[]">
                  {status.status === "PleaRequestBudgetSent"
                      ? "Budget Approval Pending"
                      : status.status === "PleaRequestBudgetAccepted"
                      ? "Budget Approved"
                      : status.status === "PleaRequestBudgetRejected"
                      ? "Budget Rejected"
                      : status.status === "PleaRequestScreenApprovalSent"
                      ? "Screen Approval Pending"
                      : status.status === "PleaRequestScreenApprovalAccepted"
                      ? "Screen Approved"
                      : status.status === "PleaRequestScreenApprovalRejected"
                      ? "Screen Rejected"
                      : status.status === "PleaRequestFinalApprovalSent"
                      ? "Final Aprroval Pending"
                      : status.status === "PleaRequestFinalApprovalAccepted"
                      ? "Final Approved"
                      : status.status === "PleaRequestFinalApprovalRejected"
                      ? "Final Rejected"
                      : status.status === "Pending"
                      ? "Approved"
                      : "Approved"}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
