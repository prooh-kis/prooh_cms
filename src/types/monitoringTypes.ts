export interface MonitoringUrlData {
    url?: string;
    awsUrl?: string;
    file?: File;
    fileType: string;
    uploadedDate: string;
    _id?: string;
}

export interface MonitoringUrlData2 {
    url?: string;
    awsUrl?: string;
    file?: File;
    fileType: string;
    uploadedDate: string;
    monitoringType: string;
    campaignId: string;
    _id?: string;
}

export interface MonitoringTypeWiseData {
    monitoringType: string;
    monitoringUrls: MonitoringUrlData[];
}

export interface MonitoringData {
    date: string;
    dateType: string;
    monitoringTypeWiseData: MonitoringTypeWiseData[];
}

export interface MonitoringDataContainer {
    monitoringData: MonitoringData[];
}