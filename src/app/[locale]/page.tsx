import {
  Adventure,
  Articles,
  BestSellers,
  ContactUs,
  CreateYourTrip,
  Destinations,
  Hero,
  HowToBook,
  Info,
} from '@/components';

export default function Home() {
  return (
    <>
      <Hero />
      <Info />
      <BestSellers />
      <Destinations />
      <HowToBook />
      <Adventure />
      <CreateYourTrip />
      <ContactUs />
      <Articles />
    </>
  );
}
