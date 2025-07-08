import { Tour } from '@/components/Tour/_types';

export default function BookingHeader({ tourData }: { tourData: Tour }) {
  return (
    <section className="block w-full max-[1024px]:hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10">
        <h1 className="text-custom-green-900 col-span-1 text-4xl md:col-span-2 font-title">
          {tourData?.name}
        </h1>
      </div>
    </section>
  );
}
