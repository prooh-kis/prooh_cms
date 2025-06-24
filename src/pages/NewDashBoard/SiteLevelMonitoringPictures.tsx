import { MonitoringPictures } from '../../components/segments/MonitoringPictures'
import React from 'react'

export function SiteLevelMonitoringPictures({monitoringTime, monitoringPics, handleDownload}: any) {
  return (
    <div className="h-auto pt-2">
      <div className="flex items-center gap-2">
      <i className="fi fi-rs-calendar flex items-center"></i>
      <h1>{}</h1>
      </div>
      <div className="w-full">
        <MonitoringPictures
          isUsedForShow={true}
          handleUploadClick={() => {}}
          time={monitoringTime}
          setMonitoringMedia={() => {}}
          setMonitoringTime={() => {}}
          monitoringData={monitoringPics}
          screenId={monitoringPics?.screenId}
          campaignId={monitoringPics?.campaignId}
          setFileType={() => {}}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  )
}
