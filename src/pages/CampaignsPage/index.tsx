import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { MiddleArea } from './MiddleArea';
import { RightSidebar } from './RightSidebar';

export const CampaignsPage: React.FC = () => {
  const [left, setLeft] = useState<any>("1");
  const [right, setRight] = useState<any>("1");
  return (
    <div className="w-full h-full grid grid-cols-12">
      <div className={`col-span-1 flex justify-start ml-2`}>
        <LeftSidebar setWidth={setLeft}/>
      </div>
      <div className={`col-span-10 h-full`}>
        <MiddleArea />
      </div>
      <div className={`col-span-1 flex justify-end pr-2`}>
        <RightSidebar setWidth={setRight}/>
      </div>
    </div>
  );
};
