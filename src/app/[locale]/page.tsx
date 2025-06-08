import { BestSellers, Destinations, Hero, Info } from '@/components';

export default function Home() {
  return (
    <div className="w-full  min-h-[200vh]">
      <Hero />
      <Info />
      <BestSellers />
      <Destinations />
    </div>
  );
}
