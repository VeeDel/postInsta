import { axiosInstance } from "../axiosInstance";
import { updatePaymentGatewayPayload } from "./paymentInterface";

// my Story Delete:---
export const updatePaymentGateway = async (payload: updatePaymentGatewayPayload) => {
  const response = await axiosInstance.post("/api/update_payment_gateway", payload);
  return response.data;
};

// my Story Delete:---
export const allPaymentGetewayKey = async () => {
  const response = await axiosInstance.get("/api/all_payment_gateway_key");
  return response.data;
};
