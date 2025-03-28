import { downloadExcel } from "../../utils/ExcelUtils";

export const DownLoadCampaignLogReport = ({ campaignLog, campaign }: any) => {
  const handleClick = () => {
    downloadExcel({ campaignLog, campaign });
  };

  return (
    <div className="py-4">
      <button
        className="border border-1 py-2 px-4  bg-[#129BFF] text-white hover:bg-[#129BFF] w-full text-center"
        onClick={handleClick}
      >
        <i className="fi fi-sr-file-download pr-4"></i>
        Download Logs
      </button>
    </div>
  );
};
