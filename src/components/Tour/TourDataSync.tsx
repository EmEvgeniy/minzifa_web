'use client';

import { useEffect } from 'react';
import { useOrderTourDetailStore } from '@/store/orderTourDetailStore';
import type { Tour as TourData } from './_types';

export function TourDataSync({ tourData }: { tourData: TourData }) {
  const { setAdditionalFormData } = useOrderTourDetailStore();

  useEffect(() => {
    if (tourData?.id) {
      setAdditionalFormData({
        tour_id: tourData.id,
        tour_name: tourData.name,
      });
    }
  }, [tourData?.id, tourData?.name, setAdditionalFormData]);

  return null;
}
