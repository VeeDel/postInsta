export interface updatePaymentGatewayPayload {
  id: string;
  text: string;
  public_key:string;
  secret_key:string;
  mode:string;
  status:string;
  country_code:string;
  currency_code:string;
}
