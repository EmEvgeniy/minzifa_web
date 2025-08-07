'use client';
import { Filter_alt } from '@/assets/icons';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useMobFilterStore } from './store';

function MobileBtn({ btn }: { btn: string }) {
  const { setOpen } = useMobFilterStore((s) => s);

  return (
    <Button
      sx={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        borderRadius: 8,
        minHeight: 45,
        padding: '8px 25px',
      }}
      variant="contained"
      onClick={() => setOpen(true)}
      startIcon={<Image src={Filter_alt} alt="btn icon" width={30} height={30} />}
    >
      {btn}
    </Button>
  );
}

export default MobileBtn;
