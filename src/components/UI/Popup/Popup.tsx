'use client';
import { cn } from '@/utils/utils';
import { Breakpoint, Dialog, DialogContent, IconButton, Slide, styled } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { FC, ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(0),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type PopupType = {
  open: boolean;
  handleClose: () => void;
  content: ReactNode;
  maxWidth?: Breakpoint;
  className?: string;
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

export const Popup: FC<PopupType> = ({ open, handleClose, content, maxWidth = "lg", className = "" }) => {
  return (
    <>
      <CustomDialog
        open={open}
        slots={{
          transition: Transition,
        }}
        fullWidth
        maxWidth={maxWidth}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        className={cn(className)}
      >
        <div className='relative w-full h-full md:absolute md:top-0 md:right-0 md:w-fit md:h-fit bg-white flex justify-end p-2'>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>{content}</DialogContent>
      </CustomDialog>
    </>
  );
};
