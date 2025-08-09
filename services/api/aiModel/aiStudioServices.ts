import { axiosInstance } from "../axiosInstance";
import { img2ImgPayload, text2ImgPayload, uploadMediaPaylod } from './aiStudioInterface';



//text to img :----
export const text2Img = async (payload: text2ImgPayload) => {
  const response = await axiosInstance.post("https://modelslab.com/api/v6/realtime/text2img", payload);
  return response.data;
};

//IMG to img :----
export const img2Img = async (payload: img2ImgPayload) => {
  const response = await axiosInstance.post("https://modelslab.com/api/v6/images/img2img", payload);
  return response.data;
};

//IMG to url :----
export const uploadMedia = async (payload: uploadMediaPaylod) => {
  const response = await axiosInstance.post("/api/upload_media", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};