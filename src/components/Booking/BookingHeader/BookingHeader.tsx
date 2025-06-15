import { useBookingStore } from '@/store/bookingStore';

export const BookingHeader = () => {
  const { tour } = useBookingStore((state) => state);
  return (
    <section className="block w-full max-[1024px]:hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 mb-10">
        <h1 className="text-custom-green-900 col-span-1 text-4xl md:col-span-2">{tour?.name}</h1>
      </div>
    </section>
  );
};
