import { message } from "antd";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";


export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [isSelected, setIsSelected] = useState<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector((state: any) => state.allScreensDataGet);
  const {
    loading, error, data: allScreens
  } = allScreensDataGet;

  const data =     {
    _id: '66f7bb44d2829e146ff82aec',
    screenName: 'CyberCityBig_(10x1_6000x588)',
    location: 'Building 8ABC',
    city: 'Gurgaon',
    campaigns: 27,
    images: [
      'https://www.xtreme-media.com/wp-content/uploads/2018/11/digital_billboard_mobile_before.jpg'
    ],
    lastActive: 'Thu Sep 12 2024 12:29:19 GMT+0000 (Coordinated Universal Time)'
  }

  
  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!")
    }
    // dispatch(getAllScreensDetailsAction({userId: userInfo._id}));
  },[dispatch, userInfo]);
  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* {allScreens?.map((screen: any, index: any) => (
          <div key={index} className="border p-2">
            {screen.screenName}
            <img className="h-20" src={screen.images[0]} alt={screen._id} />
          </div>
        ))} */}
       {/* <ScreenListThumbnail color={""} isSelected={} handleCardClick={} navigate={} data={data}/> */}
      </div>
    </div>
  );
};
