import type { IMediaData } from './common';

export interface ITourist {
  id: number;
  name: string | null;
  email: string | null;
  emailVerifiedAt: string | null;
  phone: string | null;
  avatar: IMediaData | null;
  telegram_chat_id: number | null;
}

export interface LoginFormData {
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  recaptchaToken?: string;
}

export interface AuthResponse {
  data: ITourist;
  message: string;
}

export type AuthActionResult =
  | { success: true; data: ITourist }
  | { success: false; error: string };
