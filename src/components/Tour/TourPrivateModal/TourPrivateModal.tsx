'use client';

import { Popup } from '@/components/UI/Popup/Popup';
import { Content } from './Content';
import { usePrivateTourFormStore } from '@/store/privateTourFormStore';
import { Tour } from '../_types';

type Props = {
  locale: string;
  tour: Tour;
};

export default function TourPrivateModal({ locale, tour }: Props) {
  const { popup, setPopup } = usePrivateTourFormStore();

  return (
    <Popup
      open={popup}
      handleClose={() => setPopup(false)}
      locale={locale}
      content={<Content tour={tour} />}
      showTimesButton={false}
    />
  );
}
