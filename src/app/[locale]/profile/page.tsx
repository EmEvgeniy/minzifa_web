import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export default async function ProfilePage() {
  const t = await getTranslations('profile');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
              <p className="mt-1 text-gray-900">John Doe</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
              <p className="mt-1 text-gray-900">john.doe@example.com</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('phone')}</label>
              <p className="mt-1 text-gray-900">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-6">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              {t('editProfile')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
