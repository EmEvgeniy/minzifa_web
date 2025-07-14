'use client';

import { Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import { useFavoriteStore } from './store';
import { useLocale, useTranslations } from 'next-intl';
import BestSellersPackagesCard from '../BestSellersPackagesCard/BestSellersPackagesCard';
import { BestSellersPackagesCardType } from '../BestSellersPackagesCard/_types';
import Link from 'next/link';

import { IoMdCloseCircle } from 'react-icons/io';

function FavoriteMenu() {
  const t = useTranslations();
  const { setActive, tours, active } = useFavoriteStore((state) => state);
  const locale = useLocale();

  const toggleDrawer = (newOpen: boolean) => () => {
    setActive(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 450,
        backgroundColor: '#16372D',
        height: '100%',
        padding: '20px 10px',
      }}
      role="presentation"
      className="max-[1024px]:!w-[350px]"
    >
      <Link href={`/${locale}/favorites`} className="text-white underline  text-2xl">
        {t('favoriteBtn')}
      </Link>
      <span
        className="hidden fixed top-5 right-4 max-[550px]:block cursor-pointer hover:scale-110 active:scale-95 transition-all"
        onClick={() => {
          toggleDrawer(false)();
        }}
      >
        <IoMdCloseCircle className="text-white text-[28px]" />
      </span>
      <List
        className="text-white   !p-0 !w-full overflow-y-scroll h-full max-h-[90svh] !mt-5"
        sx={{ marginTop: 2 }}
      >
        {tours.length
          ? tours.map((text: BestSellersPackagesCardType, i) => (
              <ListItem key={i} className="!w-full !p-0">
                <ListItemButton
                  onClick={() => {
                    toggleDrawer(false)();
                  }}
                >
                  {
                    <BestSellersPackagesCard
                      slide={text}
                      locale={locale}
                      days={t('all_tours.days')}
                      from={t('all_tours.from')}
                      view_itinerary={t('all_tours.view_itinerary')}
                      byRequest={t('all_tours.byRequest')}
                    />
                  }
                </ListItemButton>
              </ListItem>
            ))
          : null}
      </List>
    </Box>
  );
  return (
    <Drawer anchor="right" open={tours?.length ? active : false} onClose={toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
}

export default FavoriteMenu;
