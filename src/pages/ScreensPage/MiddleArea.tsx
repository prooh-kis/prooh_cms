import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_SCREENS_LIST } from "../../constants/localStorageConstants";
import { getTimeDifferenceInMin } from "../../utils/dateAndTimeUtils";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [selectedCard, setSelectedCard] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector((state: any) => state.allScreensDataGet);
  const {
    loading, error, data: allScreens
  } = allScreensDataGet;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    dispatch(getAllScreensDetailsAction({userId: userInfo._id}));
  },[dispatch, userInfo]);


  // Handle card click, setting the clicked card's index
  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex gap-4 items-center flex-wrap">
            {getDataFromLocalStorage(ALL_SCREENS_LIST)?.list?.map((data: any, index: any) => (
                <div key={index} className="">
                  <ScreenListThumbnail isSelected={data._id === selectedCard} color={""} handleCardClick={() => handleCardClick(data._id)} navigate={() => navigate(`/screens-details/${data._id}`)} data={data}/>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
