import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProfilePage from '@/components/Auth/Profile/ProfilePage';

export const metadata: Metadata = {
  title: 'User Profile - Minzifa Travel',
  description: 'Manage your personal account settings, view booking history and preferences.',
  keywords: 'user profile, account settings, booking history, travel preferences',
  alternates: {
    canonical: 'https://minzifatravel.com/profile',
  },
  openGraph: {
    title: 'User Profile - Minzifa Travel',
    description: 'Manage your personal account settings, view booking history and preferences.',
    url: 'https://minzifatravel.com/profile',
    siteName: 'Minzifa Travel',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'User Profile - Minzifa Travel',
    description: 'Manage your personal account settings, view booking history and preferences.',
  },
};

export default async function ProfilePageWrapper() {
  return <ProfilePage />;
}
