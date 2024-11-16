import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { CampaignListThumbnail } from "../../components/molecules/CampaignListThumbnail";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_CAMPAIGNS_LIST } from "../../constants/localStorageConstants";
import { getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";
import { getAllCampaignsDetailsAction } from "../../actions/campaignAction";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [selectedCard, setSelectedCard] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allCampaignsDataGet = useSelector((state: any) => state.allCampaignsDataGet);
  const {
    loading, error, data: allCampaigns
  } = allCampaignsDataGet;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    dispatch(getAllCampaignsDetailsAction({userId: userInfo._id}));
  },[dispatch, userInfo]);

  // Handle card click, setting the clicked card's index
  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };
  console.log(allCampaigns);

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="flex items-center justify-center">
        {loading ? (
          <div className="w-full h-full">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-wrap">
            {getDataFromLocalStorage(ALL_CAMPAIGNS_LIST)?.list?.map((data: any, index: any) => (
                <div key={index} className="">
                  <CampaignListThumbnail isSelected={data._id === selectedCard} color={""} handleCardClick={() => handleCardClick(data._id)} navigate={() => navigate(`/campaigns-details/${data._id}`)} data={data}/>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
