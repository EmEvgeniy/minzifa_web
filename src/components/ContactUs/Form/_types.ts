export interface ContactUsRequest {
  data: { name: string; email: string; phone: string; message: string };
}

export interface ContactUsResponse {
  success: boolean;
  message: string;
}
