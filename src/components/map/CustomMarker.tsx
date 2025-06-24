import React, {FunctionComponent, useState} from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';


interface Props {
  marker?: any;
  color?: any;
  size?: any;
  action?: any;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  marker,
  color,
  size,
  action,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: marker.lat,
    lng: marker.lng
  };

  const renderCustomPin = () => {
    return (
      <div>
        <div className={`h-full w-full rounded-full`}>
          {hovered && (
            <h1>{marker?.screenType}</h1>
          )}
          <i className={`
            ${hovered ? `${marker?.screenType === "Spectacular" ? "fi fi-sr-circle-i text-[36px]" : 
              marker?.screenType === "Large" ? "fi fi-sr-circle-l text-[32px]" : "fi fi-sr-circle-s text-[28px]"} `: 
              `${marker?.screenType === "Spectacular" ? "fi fi-ss-circle text-[32px]" : 
              marker?.screenType === "Large" ? "fi fi-ss-circle text-[28px]" : "fi fi-ss-circle text-[24px]"} `}
            flex items-center justify-center text-[${color}]`}></i>
        </div>  
      </div>
      
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer relative transition-transform"
        onClick={() => {
          action(marker);
          console.log(marker);
          setClicked(!clicked);
        }}>
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  );
};