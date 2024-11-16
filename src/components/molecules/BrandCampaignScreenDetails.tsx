import { generateColorFromAlphabet } from "../../utils/colorUtils";

export function BrandCampaignScreenDetails({showIcons, brandName, campaigns, allTabs, currentTab}: any) {
  return (
    <div className="group relative">
      <div className="flex p-2 gap-4 hover:bg-gray-100 hover:rounded">
        <div className={`rounded px-6 bg-[${generateColorFromAlphabet(brandName.split("")[0], 0)}]`}>
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
          <div className="text-gray-500 hover:text-blue-500">
            <i className="fi fi-sr-play-circle"></i>
          </div>
          <div className="text-gray-500 hover:text-green-500">
            <i className="fi fi-sr-trash"></i>
          </div>
          <div className="text-gray-500 hover:text-red-500">
            <i className="fi fi-sr-eye"></i>
          </div>
        </div>
      )}
    </div>
  );
}