import { ALL_CAMPAIGNS_LIST, ALL_SCREENS_FOR_CAMPAIGN_CREATION_SCREEN_OWNER, ALL_SCREENS_LIST, CAMPAIGN_CREATIVES_TO_UPLOAD, FULL_CAMPAIGN_PLAN, SCREEN_CAMPAIGN_MONITORING_PICS, UPLOAD_CREATIVE_SCREEN_DATA } from "../constants/localStorageConstants";

export const saveDataOnLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getAllLocalStorageData = () => {
  const allData: any = {};

  // Loop through all keys in localStorage
  for (let i: number = 0; i < localStorage.length; i++) {
    const key: any = localStorage.key(i); // Get key by index
    const value = localStorage.getItem(key); // Get corresponding value
    allData[key] = value; // Store key-value pair in an object
  }

  return allData;
};

export const getDataFromLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(key);
  if (data !== undefined || data !== null || JSON.stringify(data) !== JSON.stringify("undefined")) {
    return data !== null ? JSON.parse(data) : null;

  } else {
    return null;
  }
};

export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const removeAllKeyFromLocalStorage = () => {
  window.localStorage.clear();
};
