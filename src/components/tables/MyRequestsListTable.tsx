import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils/formatValue";
import { useState } from "react";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";

interface MyRequestsListTableProps {
  requestsList?: any;
  setShowDetails?: any;
  showDetails?: any;
}

export const MyRequestsListTable = ({
  requestsList,
  setShowDetails,
  showDetails,
}: MyRequestsListTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-full">
      <div className="rounded-[4px] bg-gray-100">
        {requestsList?.map((campaign: any, i: any) => (
          <div
            key={i}
            className="pointer-cursor"
            onClick={() => {
              console.log("campaign data", campaign);
              setShowDetails({
                show: !showDetails.show,
                data: campaign
              })
            }}
          >
            <CampaignsListModel
              index={i}
              data={{ ...campaign }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
