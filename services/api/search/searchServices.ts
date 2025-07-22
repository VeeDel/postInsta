import { axiosInstance } from "../axiosInstance";
import { searchUsernameAddPayload, searchUsernamePayload } from "./searchInterface";


//search Username:----
export const searchUsername = async (payload: searchUsernamePayload) => {
  const response = await axiosInstance.post("/api/search_username", payload);
  return response.data;
};

//search Username Add:----
export const searchUsernameAdd = async (payload: searchUsernameAddPayload) => {
  const response = await axiosInstance.post("/api/search_username_add", payload);
  return response.data;
};

//search UserList:----
export const searchUserList = async () => {
  const response = await axiosInstance.post("/api/search_userlist");
  return response.data;
};

//delete Search Item:----
export const deleteSerchItem = async () => {
  const response = await axiosInstance.post("/api/delete_search_item");
  return response.data;
};

// user Notification List:---
export const userNotificationList = async () => {
  const response = await axiosInstance.post(
    "/api/user_notification_list"
  );
  return response.data;
};

// user Read Count:---
export const userReadCount = async () => {
  const response = await axiosInstance.post(
    "/api/user_read_count"
  );
  return response.data;
};