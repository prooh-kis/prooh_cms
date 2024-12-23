import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getAllScreensDetailsAction } from "../../actions/screenAction";
import { ScreenListThumbnail } from "../../components/molecules/ScreenListThumbnail";
import { Loading } from "../../components/Loading";
import { ReloadButton, SearchInputField } from "../../components";

export const MiddleArea: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");

  const [selectedCard, setSelectedCard] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allScreensDataGet = useSelector(
    (state: any) => state.allScreensDataGet
  );
  const { loading, error, data: allScreens } = allScreensDataGet;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      message.error("Not a screen owner!!!");
    }

    if (!userInfo) {
      navigate("/auth");
    }

    if (!allScreens)
      dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
  }, [dispatch, userInfo]);

  // Handle card click, setting the clicked card's index
  const handleCardClick = (id: any) => {
    if (userInfo && userInfo?.isMaster && userInfo?.userRole === "primary") {
      setSelectedCard(id);
      navigate(`/screens-details/${id}`);
    }
  };

  const reLoad = () => {
      dispatch(getAllScreensDetailsAction({ userId: userInfo?.primaryUserId }));
  };

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : (
          <div className="">
            <div className="flex gap-4 w-[70vw] pb-4">
              <SearchInputField
                value={searchText}
                onChange={setSearchText}
                placeholder="Search by screen name"
              />
              <ReloadButton onClick={reLoad} />
            </div>
            <div className="flex gap-8 items-center flex-wrap">
              {allScreens
                ?.filter((screen: any) =>
                  screen.screenName
                    .toLowerCase()
                    .includes(searchText?.toLowerCase())
                )
                ?.map((data: any, index: any) => (
                  <div key={index} className="">
                    <ScreenListThumbnail
                      isSelected={data._id === selectedCard}
                      color={""}
                      handleCardClick={() => handleCardClick(data._id)}
                      // navigate={() => navigate(`/screens-details/${data._id}`)}
                      data={data}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
