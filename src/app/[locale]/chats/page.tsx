import { Metadata } from 'next';
import { ChatsClient } from '@/components/Chats';

export const metadata: Metadata = {
  title: 'Customer Support Chat - Minzifa Travel',
  description:
    'Contact our support team through live chat. Get instant help with your travel bookings and inquiries.',
  keywords: 'customer support, live chat, travel help, booking assistance',
  alternates: {
    canonical: 'https://minzifatravel.com/chats',
  },
  openGraph: {
    title: 'Customer Support Chat - Minzifa Travel',
    description:
      'Contact our support team through live chat. Get instant help with your travel bookings and inquiries.',
    url: 'https://minzifatravel.com/chats',
    siteName: 'Minzifa Travel',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Support Chat - Minzifa Travel',
    description:
      'Contact our support team through live chat. Get instant help with your travel bookings and inquiries.',
  },
};

export default function ChatsPage() {
  return <ChatsClient />;
}
