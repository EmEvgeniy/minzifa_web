'use client';

import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Filter } from '../MainSection/Filter';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Filter_alt } from '@/assets/icons';
import { FaChevronLeft } from 'react-icons/fa6';
import { DestinationDataResponse, TourTypeDataResponse } from '../MainSection/_types';

export default function MobileMenu({
  tourTypesData,
  destinationsData,
}: {
  tourTypesData: TourTypeDataResponse;
  destinationsData: DestinationDataResponse;
}) {
  const [state, setState] = useState(false);
  const t = useTranslations();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div className="block md:hidden">
      <Button
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          borderRadius: 8,
          minHeight: 45,
          padding: '8px 25px',
        }}
        variant="contained"
        onClick={toggleDrawer(true)}
        startIcon={<Image src={Filter_alt} alt="btn icon" width={30} height={30} />}
      >
        {t('Filters')}
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            height: '90vh', // Set height to 90% of viewport height
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            overflowX: 'hidden',
          },
        }}
        anchor={'bottom'}
        open={state}
        onClose={toggleDrawer(false)}
      >
        <div className="p-2.5 w-full  relative h-screen">
          <div className="w-full px-[10px] py-[20px] border-b-1 flex items-center sticky top-0 z-20 bg-white">
            <FaChevronLeft className="text-[]" onClick={toggleDrawer(false)} />
            <p className="text-center w-full text-[18px] font-semibold">{t('Filters')}</p>
          </div>
          <div className=" overflow-y-scroll h-screen py-[10px]">
            <Filter tourTypesData={tourTypesData} destinationsData={destinationsData} />
          </div>
        </div>
      </Drawer>
    </div>
  );
}
