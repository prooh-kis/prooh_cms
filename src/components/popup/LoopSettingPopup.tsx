import { BrandCampaignScreenDetails } from "../../components/molecules/BrandCampaignScreenDetails";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useEffect, useState } from "react";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { useDispatch } from "react-redux";
import { setCampaignsLoopForScreenAction } from "../../actions/screenAction";

interface Campaign {
  _id: string;
  name: string;
  brandName: string;
  atIndex: any;
  campaignDuration: string;
  creative: any;
  currentIndex: number;
}

interface LoopSettingPopupProps {
  openLoopSetting?: boolean;
  campaigns?: any;
  onClose?: any;
  screenId?: any;
}

export function LoopSettingPopup({
  openLoopSetting,
  campaigns,
  onClose,
  screenId,
}: LoopSettingPopupProps) {
  const dispatch = useDispatch<any>();

  const [campaignName, setCampaignName] = useState<string>("");
  const [totalSlots] = useState<number[]>(
    Array.from({ length: 18 }, (_, index) => index + 1)
  );
  const [slots, setSlots] = useState<Campaign[][]>(Array(18).fill([]));

  const initializeSlots = () => {
    if (!campaigns) return;

    const campaignData: Campaign[] = campaigns;
    const updatedSlots: Campaign[][] = Array(18).fill([]);

    campaignData.forEach((campaign) => {
      if (Array.isArray(campaign.atIndex)) {
        campaign.atIndex.forEach((index) => {
          if (index > 0 && index <= 18) {
            // Subtract 1 because array indices start at 0
            updatedSlots[index - 1] = [
              ...updatedSlots[index - 1],
              { ...campaign, currentIndex: index },
            ];
          }
        });
      }
    });

    setSlots(updatedSlots);
  };

  const getStandardCreativesWithCampaignNames = (
    campaignData: any
  ): Campaign[] => {
    const result: Campaign[] = [];
    if (!campaignData) return result;

    for (const campaign of campaignData) {
      const { standardDayTimeCreatives } = campaign.creatives;
      const { _id, name, campaignDuration, atIndex } = campaign;
      standardDayTimeCreatives.forEach((creative: any) => {
        result.push({
          _id,
          name,
          brandName: campaign.brandName,
          atIndex,
          campaignDuration,
          creative,
          currentIndex: 0,
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
    campaign.atIndex = [slotIndex + 1];

    setSlots((prevSlots: any) => {
      const updatedSlots = prevSlots.map((slot: any, index: any) => {
        if (index === slotIndex) {
          if (slot != undefined && slot?.length == 0) {
            return [{ ...campaign, currentIndex: index + 1 }];
          } else return slot;
        } else return slot;
      });
      return updatedSlots;
    });
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow drop
  };

  const handleRemoveCampaign = (slotIndex: number, campaignIndex: number) => {
    setSlots((prevSlots) => {
      const updatedSlots = prevSlots.map((slot, index) => {
        if (index === slotIndex) {
          // const updatedSlot = [...slot];
          // updatedSlot.splice(campaignIndex, 1); // Remove the campaign at the specific index
          // return updatedSlot;
          return [];
        }
        return slot;
      });
      return updatedSlots;
    });
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

  // console.log(slots)

  const handleLoopSetting = () => {
    const formattedData: any = slots
      .flat() // Flatten the nested arrays
      .filter((item: any) => item && item._id && item.atIndex) // Filter out empty or invalid entries
      .map((item: any) => ({
        campaignId: item._id,
        atIndex: [item.currentIndex],
      }))
      .reduce((acc: any[], curr: any) => {
        const existing = acc.find(
          (item) => item.campaignId === curr.campaignId
        );
        if (existing) {
          existing.atIndex = [...existing.atIndex, ...curr.atIndex];
        } else {
          acc.push({ ...curr });
        }
        return acc;
      }, []);

    dispatch(
      setCampaignsLoopForScreenAction({
        screeId: screenId,
        data: formattedData,
      })
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4">
        <div className="flex justify-between p-4 border-b">
          <h1 className="text-[16px] font-bold">Loop Setting</h1>
          <div className="flex gap-2 items-center">
            <PrimaryButton
              title="Set Loop"
              height="h-8"
              width="w-28"
              textSize="text-[12px]"
              rounded="rounded-full"
              action={handleLoopSetting}
            />
            <div
              className="relative inset-0 flex items-center justify-end gap-4 p-3"
              onClick={() => onClose(false)}
            >
              <i className="fi fi-br-circle-xmark"></i>
            </div>
          </div>
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
                getStandardCreativesWithCampaignNames(campaigns)?.map(
                  (camp: Campaign, i: number) => (
                    <div
                      key={i}
                      className="flex gap-2 p-2 cursor-pointer"
                      draggable
                      onDragStart={handleDragStart(camp)}
                    >
                      <h1 className="text-[14px] font-semibold pt-2">
                        {i + 1}.
                      </h1>
                      <div>
                        <BrandCampaignScreenDetails
                          brandName={camp.brandName}
                          campaign={camp}
                          showIcons={false}
                        />
                      </div>
                    </div>
                  )
                )}
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
                {slots[j].length === 0 && (
                  <div className="w-full py-2 text-gray-500">Drop here</div>
                )}

                <div className="w-full py-1">
                  {slots[j]?.map((camp, k) => (
                    <div
                      key={k}
                      className="w-full"
                      onDoubleClick={() => {
                        handleRemoveCampaign(j, k);
                      }}
                    >
                      <BrandCampaignScreenDetails
                        campaignIds={[]}
                        brandName={camp?.brandName}
                        campaign={camp}
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
