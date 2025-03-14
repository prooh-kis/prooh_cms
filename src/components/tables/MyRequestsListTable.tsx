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
    <div>
      <div className="overflow-y-scroll no-scrollbar h-[80vh] rounded-[4px] bg-gray-100 pr-2">
        {requestsList?.map((campaign: any, i: any) => (
          <div
            key={i}
            className="pointer-cursor"
            onClick={() => {
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
