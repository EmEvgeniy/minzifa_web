import { cn } from '@/utils';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';

interface StatItem {
  value: string;
  label: string;
  description: string;
}

export default async function Info({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'home' });

  const stats = (t.raw('stats.items') as StatItem[]) || [];

  return (
    <section className={cn('max-w-[1100px] px-2.5 py-16 mb-[45px]', 'md:mb-[64px] md:mx-auto md:p-0')}>
      <div className="flex flex-col gap-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className="font-title text-[42px] [@media(max-width:768px)]:text-[28px] font-semibold text-[#16372D] mb-2">
                  {stat.value}
                </div>
                <div className="text-[13px] text-[#16372D]/80 font-medium leading-tight">
                  <div>{stat.label}</div>
                  <div className="text-[12px] text-[#16372D]/60">{stat.description}</div>
                </div>
              </div>
              {index === 1 && (
                <hr className="w-full border border-foreground/12 col-span-2 block md:hidden" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
