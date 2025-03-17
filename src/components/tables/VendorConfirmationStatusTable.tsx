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
  const [allCampaignsIds, setAllCampaignsIds] = useState<any>([]);

  const handleRowCheckboxChange = (e: boolean, campaignId: string) => {
    let updatedIds = [...selectedCampaignIds];
    if (e) {
      if (!updatedIds.includes(campaignId)) {
        updatedIds = [...selectedCampaignIds, campaignId];
      }
      // Add campaignId if row checkbox is checked
    } else {
      // Remove campaignId if row checkbox is unchecked
      if (updatedIds.includes(campaignId)) {
        updatedIds = updatedIds.filter((id) => id !== campaignId);
      }
    }
    setSelectedCampaignIds(updatedIds); // Update the state with the new selection
  };

  const handleHeaderRowCheckBoxChange = (e: boolean) => {
    for ( const campaign of campaignsList ){
      if ( campaign?.campaignCreationId === statusTableData?._id )
      handleRowCheckboxChange(e, campaign?._id.toString())
    }
  }

  useEffect(() => {
    var campaignIds : any = []
    for ( const campaign of campaignsList ){
      if ( campaign?.campaignCreationId === statusTableData?._id )
        campaignIds.push(campaign?._id.toString())
    }
    setSelectedCampaignIds(campaignIds);
  }, [setSelectedCampaignIds, statusTableData, campaignsList]);

  // console.log(selectedCampaignIds)
  // console.log(statusTableData?.screenWiseSlotDetails?.map((s: any) => s.screenId));
  // console.log(campaignsList?.filter((c: any) => statusTableData?.screenWiseSlotDetails?.map((s: any) => s._id).includes(c.campaignCreationId)));
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
            <th>
              <div className="flex items-center justify-center gap-1">
                <CheckboxInput
                  label=""
                  textSize="12px"
                  color="#129BFF"
                  onChange={(e) => handleHeaderRowCheckBoxChange(e)}
                  checked={selectedCampaignIds?.length === statusTableData?.screenWiseSlotDetails?.filter((screen: any) => {
                    return statusTableData?.screenIds.includes(screen.screenId)
                  })?.length ? true : false}
                  // disabled={loading}
                />
              </div>
            </th>
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
                <td>
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[#129BFF]">
                    <CheckboxInput
                      label=""
                      textSize="12px"
                      color="#129BFF"
                      onChange={(e) => {
                        handleRowCheckboxChange(e, campaignsList?.filter((c: any) => c.campaignCreationId == statusTableData?._id && c.screenId == status.screenId)[0]?._id);
                      }}
                      checked={
                        selectedCampaignIds?.includes(campaignsList?.filter((c: any) => c.campaignCreationId == statusTableData?._id && c.screenId == status.screenId)[0]?._id)
                          ? true
                          : false
                      }
                    />
                  </div>
                </td>
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
                  {status.campaignStatus === "PleaRequestBudgetSent"
                      ? "Budget Approval Pending"
                      : status.campaignStatus === "PleaRequestBudgetAccepted"
                      ? "Budget Approved"
                      : status.campaignStatus === "PleaRequestBudgetRejected"
                      ? "Budget Rejected"
                      : status.campaignStatus === "PleaRequestScreenApprovalSent"
                      ? "Screen Approval Pending"
                      : status.campaignStatus === "PleaRequestScreenApprovalAccepted"
                      ? "Screen Approved"
                      : status.campaignStatus === "PleaRequestScreenApprovalRejected"
                      ? "Screen Rejected"
                      : status.campaignStatus === "PleaRequestFinalApprovalSent"
                      ? "Final Approval Pending"
                      : status.campaignStatus === "PleaRequestFinalApprovalAccepted"
                      ? "Final Approved"
                      : status.campaignStatus === "PleaRequestFinalApprovalRejected"
                      ? "Final Rejected"
                      : status.campaignStatus === "Pending"
                      ? "Approved"
                      : "Pending"}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
