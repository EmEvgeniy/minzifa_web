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
    (set, get) => ({
      // Initial state
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

        // Apply cookies based on preferences
        applyCookiePreferences(allAccepted);
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

        // Apply cookies based on preferences
        applyCookiePreferences(declined);
      },

      reset: () => {
        set(defaultState);
        // Clear cookie consent from localStorage
        localStorage.removeItem('cookieConsent');
      },

      initialize: () => {
        // This method can be used to initialize cookie settings on app start
        const { preferences } = get();
        applyCookiePreferences(preferences);
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

// Helper function to apply cookie preferences
function applyCookiePreferences(preferences: CookiePreferences) {
  // Essential cookies are always allowed
  // Here you would typically initialize your analytics and marketing services
  // based on the user's preferences

  if (preferences.analytics) {
    // Initialize analytics (Google Analytics, Yandex Metrika, etc.)
    console.log('Analytics cookies enabled');
  }

  if (preferences.marketing) {
    // Initialize marketing cookies (Facebook Pixel, etc.)
    console.log('Marketing cookies enabled');
  }
}
