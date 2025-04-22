export interface MonitoringUrlData {
    url?: string;
    awsUrl?: string;
    file?: File;
    fileType: string;
    uploadedDate: string;
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