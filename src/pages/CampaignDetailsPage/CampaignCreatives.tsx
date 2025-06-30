import { PrimaryButton } from "../../components/index";
import { ShowMediaFile } from "../../components/molecules/ShowMediaFIle";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { Tooltip } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MY_CREATIVES } from "../../routes/routes";

const CampaignCreatives = ({
  currentTab,
  setCurrentTab,
  creativeTypeTab,
  getAllCreatives,
  campaignCreated,
}: any) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded my-1 p-4 bg-white">
      <div className="flex justify-between">
        <h1 className="text-[#092A41] text-[16px] font-semibold mt-2 px-1">
          Campaign Creatives
        </h1>
        <PrimaryButton
          action={() => navigate(MY_CREATIVES)}
          title="+ Creatives"
          rounded="rounded-full"
          height="h-10"
          width="w-28"
          textSize="text-[12px] font-semibold"
          reverse={true}
          loading={false}
          loadingText="Saving..."
        />
      </div>
      <div className="border-b">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={creativeTypeTab}
        />
      </div>
      <div className="h-[50vh] w-full overflow-y-auto no-scrollbar pr-2">
        {Object.entries(
          getAllCreatives(
            campaignCreated?.campaigns?.map((c: any) => c.creatives)
          )
        )?.map(([key, entry]: any) => (
          <div key={key} className="py-4 w-full">
            {key === currentTab && (
              <div className="flex items-center justify-start gap-8 w-full flex-wrap">
                {entry?.map((cs: any, j: any) => (
                  <div className="" key={j}>
                    <ShowMediaFile
                      url={cs.url}
                      mediaType={cs.type.split("/")[0]}
                    />
                    <Tooltip
                      title={`${
                        cs.url?.split("_")[cs.url?.split("_")?.length - 1]
                      }`}
                    >
                      <h1 className="text-[12px] text-gray-500 truncate">
                        {cs.url?.split("_")[cs.url?.split("_")?.length - 1]}
                      </h1>
                    </Tooltip>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignCreatives;
