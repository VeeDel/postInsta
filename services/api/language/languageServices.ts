import { axiosInstance } from "../axiosInstance";
import { addLanguageColumnPayload, getLanguageDataFromStatusIdPayload } from './languageInterface';

// Add Language Column:---
export const addLanguageColumn = async (payload: addLanguageColumnPayload) => {
  const response = await axiosInstance.post("/api/addLanguageColumn", payload);
  return response.data;
};

// get Language Data From Status Id:---
export const getLanguageDataFromStatusId = async (payload: getLanguageDataFromStatusIdPayload) => {
  const response = await axiosInstance.post("/api/getLanguageDataFromStatusId", payload);
  return response.data;
};