import { axiosInstance } from "../axiosInstance";
import { updateStatusPayload, addKeyPayload } from './otherInterface';

// update Status:---
export const updateStatus = async (payload: updateStatusPayload) => {
  const response = await axiosInstance.post("/api/updateStatus", payload);
  return response.data;
};

// Add Key:---
export const addKey = async (payload: addKeyPayload) => {
  const response = await axiosInstance.post("/api/addKey", payload);
  return response.data;
};

// user Delete:---
export const userDelete = async () => {
  const response = await axiosInstance.post(
    "/api/user_delete"
  );
  return response.data;
};



// user Blocklist :---
export const userBlocklist = async () => {
  const response = await axiosInstance.post("/api/user_blocklist");
  return response.data;
};



// Explore:---
export const explore = async () => {
  const response = await axiosInstance.post("/api/explore");
  return response.data;
};

// Import-json:---
export const importJson = async () => {
  const response = await axiosInstance.post("/api/import-json");
  return response.data;
};

// Upload_firebasecredentials:---
export const uploadFirebaseCredentials = async () => {
  const response = await axiosInstance.post("/api/upload_firebasecredentials");
  return response.data;
};

// Check Extension:---
export const checkExtensions = async () => {
  const response = await axiosInstance.get("/api/check-extensions");
  return response.data;
};

// Save Bucket:---
export const saveBucket = async () => {
  const response = await axiosInstance.post("/api/save-bucket");
  return response.data;
};

// get Privacy Policy:---
export const getPrivacyPolicy = async () => {
  const response = await axiosInstance.post("/api/get_privacy_policy");
  return response.data;
};

// get All Settings:---
export const getAllSettings = async () => {
  const response = await axiosInstance.post("/api/get_all_settings");
  return response.data;
};


// fetch Admin Boost History:---
export const fetchAdminBoostHistory = async () => {
  const response = await axiosInstance.post("/api/fetch_adminboost_history");
  return response.data;
};

