import { axiosInstance } from "../axiosInstance";
import { addLanguageColumnPayload, editKeywordPayload, editLanguagePayload, fetchLanguageKeywordsWithTranslationPayload, getLanguageDataFromStatusIdPayload, translateAllKeywordsPayload, translateOneKeywordPayload } from './languageInterface';

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

// Translate All Keywords:---
export const translateAllKeywords = async (payload: translateAllKeywordsPayload) => {
  const response = await axiosInstance.post("/api/translateAllKeywords", payload);
  return response.data;
};

// Edit Language:---
export const editLanguage = async (payload: editLanguagePayload) => {
  const response = await axiosInstance.post("/api/editLanguage", payload);
  return response.data;
};

// Translate One Keyword:---
export const translateOneKeyword = async (payload: translateOneKeywordPayload) => {
  const response = await axiosInstance.post("/api/translateoneKeywords", payload);
  return response.data;
};

// Fetch Language Keyword With Translation:---
export const fetchLanguageKeywordsWithTranslation = async (payload: fetchLanguageKeywordsWithTranslationPayload) => {
  const response = await axiosInstance.post("/api/fetchLanguageKeywordsWithTranslation", payload);
  return response.data;
};

// Edit Keyword:---
export const editKeyword = async (payload: editKeywordPayload) => {
  const response = await axiosInstance.post("/api/editKeyword", payload);
  return response.data;
};