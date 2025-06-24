import React, { FunctionComponent, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { LinearBar } from "../../components/molecules/linearbar";

interface Props {
  marker?: any;
  color?: any;
  size?: any;
  action?: any;
}

export const NewCustomMarker: FunctionComponent<Props> = ({
  marker,
  color,
  size,
  action,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: marker.lat,
    lng: marker.lng,
  };

  const renderCustomPin = (marker: any) => {
    const getPercentage = (delivered: number, promised: number) => {
      return ((delivered / promised) * 100).toFixed(0);
    };
    return (
      <div>
        <div className={`h-full w-[105px] rounded-full`}>
          <div className="p-2 bg-[#FFFFFF] rounded-[8px]">
            {/* hardware performance not Completed */}
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.hardwarePerformanceDelivered?.toFixed(2)}
                colors={["#BDC8FF", "#6982FF"]}
                highest={marker?.hardwarePerformancePromisedTillDate?.toFixed(
                  2
                )}
                percent={false}
              />
              <p>
                {getPercentage(
                  marker?.hardwarePerformanceDelivered,
                  marker?.hardwarePerformancePromisedTillDate
                )}
                %
              </p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.slotsDelivered}
                colors={["#FFC3C3", "#FF0000"]}
                highest={marker?.slotsPromisedTillDate}
                percent={false}
              />
              <p>
                {getPercentage(
                  marker?.slotsDelivered,
                  marker?.slotsPromisedTillDate
                )}
                %
              </p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.slotsDeliveredToday}
                colors={["#FFF2C3", "#FFDB5D"]}
                highest={marker?.slotsPromisedToday}
                percent={false}
              />
              <p>
                {getPercentage(
                  marker?.slotsDeliveredToday,
                  marker?.slotsPromisedToday
                )}
                %
              </p>
            </div>
          </div>

          <h1
            className={`
            ${
              marker?.screenType === "Spectacular"
                ? "h-6 w-6 "
                : marker?.screenType === "Large"
                ? "h-5 w-5"
                : "h-4 w-4"
            }
            flex items-center justify-center bg-[#129BFF] text-[#FFFFFF] rounded-full `}
          >
            {/* {marker?.screenType === "Spectacular"
              ? "I"
              : marker?.screenType === "Large"
              ? "B"
              : "S"} */}
          </h1>
        </div>
      </div>
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer relative transition-transform"
        onClick={() => {
          action(marker);
          setClicked(!clicked);
        }}
      >
        {renderCustomPin(marker)}
      </AdvancedMarker>
    </>
  );
};
