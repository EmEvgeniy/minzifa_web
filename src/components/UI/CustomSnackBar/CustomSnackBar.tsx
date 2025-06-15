'use client';
import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useSnackStore } from './store';

export const CustomSnackBar = () => {
  const { message, setMessage, error, setError } = useSnackStore((state) => state);

  const handleClose = () => {
    if (error) {
      setError(null);
    } else if (message) {
      setMessage(null);
    }
  };

  const content = error
    ? { text: error, severity: 'error' as const }
    : message
    ? { text: message, severity: 'success' as const }
    : null;

  if (!content) return null; // 🔧 Не рендерим вообще ничего

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={true}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={content.severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {content.text}
      </Alert>
    </Snackbar>
  );
};
