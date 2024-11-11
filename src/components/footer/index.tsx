import { getAllLocalStorageData } from "../../utils/localStorageUtils";
import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";

export const Footer = ({
  handleSave,
  handleBack,
  isDisabled = false,
  campaignId,
}: any) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
  }, [dispatch]);
  return (
    <div className="py-4 z-10 flex justify-between">
      <div className="flex w-full justify-start items-center gap-4">

          <div className="animate-pulse flex w-full justify-start">
            <div className="w-full">
              <p className="text-[14px] font-semibold">
                Please wait while we calculate the cost of your desired plan...
              </p>
            </div>
            <div className="">
              <Loading height={20} width={100} />
            </div>
          </div>
      </div>
    </div>
  );
};
