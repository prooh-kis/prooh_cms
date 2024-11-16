import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

interface Campaign {
  campaignName: string;
  brandName: string;
  atIndex: any;
  campaignDuration: string;
  creative: any;
}

interface LoopSettingPopupProps {
  openLoopSetting?: boolean;
  campaigns?: { [key: string]: any };
  allTabs?: any;
}

export function LoopSettingPopup({
  openLoopSetting,
  campaigns,
  allTabs,
}: LoopSettingPopupProps) {
  const [campaignName, setCampaignName] = useState<string>("");
  const [totalSlots] = useState<number[]>(Array.from({ length: 18 }, (_, index) => index + 1));
  const [slots, setSlots] = useState<Campaign[][]>(Array(18).fill([]));

  const initializeSlots = () => {
    if (!campaigns || !campaigns["Active"]) return;

    const campaignData: Campaign[] = Object.values(campaigns["Active"]);
    const updatedSlots: Campaign[][] = Array(18).fill([]);

    campaignData.forEach((campaign) => {
      if (Array.isArray(campaign.atIndex)) {
        campaign.atIndex.forEach((index) => {
          if (index > 0 && index <= 18) {
            // Subtract 1 because array indices start at 0
            updatedSlots[index - 1] = [...updatedSlots[index - 1], campaign];
          }
        });
      }
    });

    setSlots(updatedSlots);
  };

  const getStandardCreativesWithCampaignNames = (campaignData: any): Campaign[] => {
    const result: Campaign[] = [];
    if (!campaignData) return result;

    for (const brandName in campaignData) {
      const brandEntries = campaignData[brandName];
      const { standardDayTimeCreatives } = brandEntries.creatives;
      const { name: campaignName, campaignDuration, atIndex } = brandEntries;

      standardDayTimeCreatives.forEach((creative: any) => {
        result.push({
          campaignName,
          brandName,
          atIndex,
          campaignDuration,
          creative,
        });
      });
    }
    return result;
  };

  const handleDragStart = (campaign: Campaign) => (event: React.DragEvent) => {
    event.dataTransfer.setData("campaign", JSON.stringify(campaign));
  };

  const handleDrop = (slotIndex: number) => (event: React.DragEvent) => {
    event.preventDefault();

    const campaignData = event.dataTransfer.getData("campaign");
    const campaign = JSON.parse(campaignData) as Campaign;

    setSlots((prevSlots) => {
      const updatedSlots = prevSlots.map((slot, index) =>
        index === slotIndex ? [...slot, campaign] : slot
      );
      return updatedSlots;
    });
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow drop
  };

  useEffect(() => {
    initializeSlots();
  }, [campaigns]);

  useEffect(() => {
    if (openLoopSetting) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openLoopSetting]);

  if (!openLoopSetting) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4">
        <div className="flex justify-between p-4 border-b">
          <h1 className="text-[16px] font-bold">Loop Setting</h1>
          <PrimaryButton
            title="Auto Set"
            height="h-8"
            width="w-28"
            textSize="text-[12px]"
            rounded="rounded-full"
          />
        </div>
        <div className="grid grid-cols-12 h-[60vh]">
          {/* Left Section */}
          <div className="col-span-4 border-r p-2">
            <div className="pl-2">
              <PrimaryInput
                inputType="text"
                placeholder="Campaign Name"
                height="h-8"
                value={campaignName}
                action={setCampaignName}
              />
            </div>
            <div className="my-2 h-[58vh] overflow-scroll">
              {campaigns &&
                getStandardCreativesWithCampaignNames(campaigns?.["Active"])?.map((camp: Campaign, i: number) => (
                  <div
                    key={i}
                    className="flex gap-2 p-2 cursor-pointer"
                    draggable
                    onDragStart={handleDragStart(camp)}
                  >
                    <h1 className="text-[14px] font-semibold pt-2">{i + 1}.</h1>
                    <div>
                      <BrandCampaignScreenDetails
                        brandName={camp.brandName}
                        campaigns={campaigns}
                        allTabs={allTabs}
                        currentTab={"1"}
                        showIcons={false}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-8 px-8 mt-8 h-[60vh] overflow-scroll">
            {totalSlots.map((_, j) => (
              <div
                key={j}
                className="flex h-auto border rounded gap-2 my-2 p-2"
                onDrop={handleDrop(j)}
                onDragOver={handleDragOver}
              >
                <h1 className="text-[14px] font-semibold pt-2">{j + 1}.</h1>
                {slots[j].length === 0 && <div className="w-full py-2 text-gray-500">Drop here</div>}
                
                <div className="w-full py-1">
                  {slots[j]?.map((camp, k) => (
                    <div key={k} className="w-full">
                      <BrandCampaignScreenDetails
                        brandName={camp?.brandName}
                        campaigns={campaigns}
                        allTabs={allTabs}
                        currentTab={"1"}
                        showIcons={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
