import { formattedINR } from "../../utils/formatValue";
import { FirstCharForBrandName } from "../../components/molecules/FirstCharForBrandName";

export const Header = ({ campaignDetails }: any) => (
  <div className="flex flex-row justify-between rounded p-4 mb-1 w-full bg-white">
    <div className="flex gap-4 items-center">
      <FirstCharForBrandName
        brandName={campaignDetails?.name}
        size="xs"
        className="rounded-md"
      />
      <h1 className="text-[16px] font-semibold">{campaignDetails?.name}</h1>
    </div>
    <div className="flex gap-4 items-center">
      <span className="text-[#6F7F8E] text-[12px] font-bold ">
        Gross Income
      </span>
      <h1 className="text-[#0E212E] text-[20px] font-bold ">
        {formattedINR(campaignDetails?.totalCampaignBudget)}
      </h1>
    </div>
  </div>
);
