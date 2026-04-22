import NotFoundContent from '@/components/Parts/NotFound/NotFoundContent';
import TopNav from '@/components/Parts/Header/TopNav';
import Footer from '@/components/Parts/Footer/Footer';
import { getLocale } from 'next-intl/server';

export default async function NotFoundPage() {
  const locale = await getLocale();

  return (
    <div className="flex flex-col h-full min-h-screen w-full relative font-text">
      <TopNav />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
