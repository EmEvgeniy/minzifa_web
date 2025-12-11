import { getApiUrl } from '@/utils/config';

export const AUTH_COOKIE_NAME = 'XSRF-TOKEN';

export const BASE_API_PATH = getApiUrl();

export enum FormNameEnum {
  FREE_CONSULTATION = 'Free consultation',
  SUBSCRIBES = 'Subscribes',
  CREATE_MY_TRIP = 'Create My Trip',
  CONTACT_US = 'Contact us',
  BOOKING = 'Booking',
  CREATE_MY_TRIP_QUIZ = 'Create My Trip Quiz',
  CONSULTATION_QUIZ = 'Consultation Quiz',
  QUIZ_FORM = 'Quiz Form',
  CHAT_POPUP = 'Chat Popup',
  PRIVATE_TOUR_FORM = 'Private tour form',
}

export const PROTECTED_ROUTES = [
  /^\/(en|ru)\/dashboard(\/.*)?$/,
  /^\/(en|ru)\/profile(\/.*)?$/,
  /^\/(en|ru)\/chats(\/.*)?$/,
  /^\/(en|ru)\/orders(\/.*)?$/,
];
