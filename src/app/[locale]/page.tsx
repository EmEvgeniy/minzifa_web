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
import { Reviews } from '@/components/UI/Reviews/Reviews';

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
      <Reviews />
      <Articles />
    </>
  );
}
