'use client';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { NavItemType } from './_types';
import Image from 'next/image';
import { logo } from '@/assets/icons';

import { useRouter } from 'next/navigation';
import SocialMedia from '../UI/SocialMedia/SocialMedia';

export const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const menu = t.raw('navigation.nav') as NavItemType[];
  const locale = useLocale();
  const router = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#16372D',
        height: '100%',
        padding: '20px 10px',
      }}
      role="presentation"
    >
      <Image src={logo} alt="mobile logo" width={200} height={76} className="px-[10px]" />
      <List className="text-white " sx={{ marginTop: 2 }}>
        {menu.map((text) => (
          <ListItem key={text.link} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(`/${locale}/${text.link}`);
                toggleDrawer(false)();
              }}
            >
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <SocialMedia className="px-[10px] pt-[10px]" />
    </Box>
  );

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} aria-label="delete">
        <MenuIcon className="text-white" />
      </IconButton>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};
