import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsent {
  preferences: CookiePreferences;
  hasConsented: boolean;
  consentDate: string | null;
}

export interface CookieState extends CookieConsent {
  // Actions
  acceptAll: () => void;
  declineAll: () => void;
  reset: () => void;
  initialize: () => void;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const defaultState: CookieConsent = {
  preferences: defaultPreferences,
  hasConsented: false,
  consentDate: null,
};

export const useCookieStore = create<CookieState>()(
  persist(
    (set) => ({
      ...defaultState,

      // Actions
      acceptAll: () => {
        const allAccepted = {
          essential: true,
          analytics: true,
          marketing: true,
        };

        set({
          preferences: allAccepted,
          hasConsented: true,
          consentDate: new Date().toISOString(),
        });
      },

      declineAll: () => {
        const declined = {
          essential: true,
          analytics: false,
          marketing: false,
        };

        set({
          preferences: declined,
          hasConsented: true,
          consentDate: new Date().toISOString(),
        });
      },

      reset: () => {
        set(defaultState);
        // Clear cookie consent from localStorage
        localStorage.removeItem('cookieConsent');
      },

      initialize: () => {
        const cookieConsent = localStorage.getItem('cookieConsent');
        if (cookieConsent) {
          set(JSON.parse(cookieConsent));
        }
      },
    }),
    {
      name: 'cookie-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        hasConsented: state.hasConsented,
        consentDate: state.consentDate,
      }),
    },
  ),
);
