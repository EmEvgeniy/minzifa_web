import { getApiUrl } from '@/utils/config';

export const AUTH_COOKIE_NAME = 'XSRF-TOKEN';

export const BASE_API_PATH = getApiUrl();

export const PROTECTED_ROUTES = [
  /^\/(en|ru)\/dashboard(\/.*)?$/,
  /^\/(en|ru)\/profile(\/.*)?$/,
  /^\/(en|ru)\/chats(\/.*)?$/,
  /^\/(en|ru)\/orders(\/.*)?$/,
];
