export interface ContactUsRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactUsResponse {
  success: boolean;
  message: string;
}
