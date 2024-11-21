import { generateColorFromAlphabet } from "../../utils/colorUtils";

export function BrandCampaignScreenDetails({showIcons, brandName, campaigns, allTabs, currentTab, setCampaignIds, campaignIds}: any) {
  return (
    <div className="group relative my-1">
      <div className={`${campaignIds?.includes(campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][brandName]._id) ? "border border-red-500 rounded" : ""} flex p-2 gap-4 hover:bg-gray-100 hover:rounded`}>
        <div className={`border rounded flex justify-center items-center w-20 bg-[${generateColorFromAlphabet(brandName.split("")[0], 0) || "#D7D7D750"}]`}>
          <h1 className="text-[40px] text-gray-400 font-black">{brandName.split("")[0]}</h1>
        </div>
        <div className="truncate">
          <h1 className="text-[20px] font-semibold truncate">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][brandName].name}</h1>
          <p className="text-[12px] truncate">{brandName}</p>
          <p className="text-[12px] truncate">{campaigns?.[allTabs?.filter((t: any) => t.id === currentTab)[0]?.value][brandName].campaignDuration} sec</p>

        </div>
      </div>
      {showIcons && (
        <div className="absolute px-2 top-1/2 right-4 transform -translate-y-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-gray-500 hover:text-red-500">
            <i className="fi fi-sr-eye"></i>
          </div>
        </div>
      )}
    </div>
  );
}