'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';

const defaultTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      light: '#194D3D',
      main: '#16372D',
      dark: '#1B3C32',
      contrastText: '#fff',
    },
    secondary: {
      light: '#27A430',
      main: '#27A430',
      dark: '#208B28',
      contrastText: '#fff',
    },
  },
});
export const ThemeProviderWrap = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
