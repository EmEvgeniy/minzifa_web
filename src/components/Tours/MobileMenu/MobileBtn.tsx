'use client';
import { Filter_alt } from '@/assets/icons';
import Image from 'next/image';
import { useMobFilterStore } from './store';

function MobileBtn({ btn }: { btn: string }) {
  const { setOpen } = useMobFilterStore((s) => s);

  return (
    <button
      className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#27A430] hover:bg-[#1f8a26] text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center gap-3"
      onClick={() => setOpen(true)}
    >
      <Image src={Filter_alt} alt="btn icon" width={20} height={20} />
      {btn}
    </button>
  );
}

export default MobileBtn;
