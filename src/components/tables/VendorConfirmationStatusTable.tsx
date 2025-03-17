import { useEffect, useState } from "react";
import { CheckboxInput } from "../atoms/CheckboxInput";
import { Tooltip } from "antd";
import { ShowMediaPopup } from "../../components/popup/ShowMediaPopup";

export const VendorConfirmationStatusTable = ({
  campaignCreationStatusTableData = [],
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
      if ( campaign?.campaignCreationId === campaignCreationStatusTableData?._id )
      handleRowCheckboxChange(e, campaign?._id.toString())
    }
  }

  useEffect(() => {
    var campaignIds : any = []
    for ( const campaign of campaignsList ){
      if ( campaign?.campaignCreationId === campaignCreationStatusTableData?._id ) {
        campaignIds.push(campaign?._id.toString())
      }
    }

    setSelectedCampaignIds(campaignIds);
  }, [setSelectedCampaignIds, campaignCreationStatusTableData, campaignsList]);

  // console.log(selectedCampaignIds);
  // console.log(campaignCreationStatusTableData?.screenWiseSlotDetails?.filter((screen: any) => {
  //   return campaignCreationStatusTableData?.screenIds.includes(screen.screenId)
  // })?.length);
  // console.log(campaignsList?.filter((c: any) => campaignCreationStatusTableData?.screenWiseSlotDetails?.map((s: any) => s._id).includes(c.campaignCreationId)));
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
                  checked={selectedCampaignIds?.length === campaignCreationStatusTableData?.screenWiseSlotDetails?.filter((screen: any) => {
                    return campaignCreationStatusTableData?.screenIds.includes(screen.screenId)
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
          {campaignCreationStatusTableData?.screenWiseSlotDetails?.filter((screen: any) => {
            return campaignCreationStatusTableData?.screenIds.includes(screen.screenId)
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
                        console.log(selectedCampaignIds?.includes(campaignsList?.filter((c: any) => c.campaignCreationId == campaignCreationStatusTableData?._id && c.screenId == status.screenId)[0]?._id))
                        handleRowCheckboxChange(e, campaignsList?.filter((c: any) => c.campaignCreationId == campaignCreationStatusTableData?._id && c.screenId == status.screenId)[0]?._id);
                      }}
                      checked={
                        selectedCampaignIds?.includes(campaignsList?.filter((c: any) => c.campaignCreationId == campaignCreationStatusTableData?._id && c.screenId == status.screenId)[0]?._id)
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
                    &#8377;{Number(status.pricePerSlot * status.slotsPerDay * campaignCreationStatusTableData?.duration).toFixed(0)}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]">
                    {campaignCreationStatusTableData?.sov}
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-center gap-1 truncate text-[12px] text-[]"
                    onClick={() => {
                      console.log(campaignCreationStatusTableData);
                      setCreativesToShow({
                        screenName: status.screenName,
                        screenId: status.screenId,
                        creatives: campaignCreationStatusTableData.creatives,
                      });
                      setOpenShowMediaPopup(true);
                    }}
                  >
                    <i className="fi fi-sr-photo-video text-[20px] text-violet-500 flex justify-center"></i>
                  </div>
                </td>
                <td className="py-2 px-1">
                  <div className="flex items-center justify-start">
                    <h1 className=" truncate text-[12px]">
                      {status.campaignStatus === "PleaRequestBudgetSent"
                        ? "Budget Approval Pending"
                        : status.campaignStatus === "PleaRequestBudgetAccepted"
                        ? "Budget Approved"
                        : status.campaignStatus === "PleaRequestBudgetRejected"
                        ? "Budget Rejected"
                        : status.campaignStatus === "PleaRequestScreenApprovalSent"
                        ? "Screen Pending"
                        : status.campaignStatus === "PleaRequestScreenApprovalAccepted"
                        ? "Screen Approved"
                        : status.campaignStatus === "PleaRequestScreenApprovalRejected"
                        ? "Screen Rejected"
                        : status.campaignStatus === "PleaRequestFinalApprovalSent"
                        ? "Final Pending"
                        : status.campaignStatus === "PleaRequestFinalApprovalAccepted"
                        ? "Final Approved"
                        : status.campaignStatus === "PleaRequestFinalApprovalRejected"
                        ? "Final Rejected"
                        : status.campaignStatus === "Pending"
                        ? "Approved"
                        : "Pending"}
                    </h1>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
