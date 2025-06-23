'use client';
import { Dialog, DialogContent, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC, ReactNode } from 'react';

type PopupType = {
  open: boolean;
  handleClose: () => void;
  content: ReactNode;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Popup: FC<PopupType> = ({ open, handleClose, content }) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      fullWidth
      maxWidth="lg"
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};
