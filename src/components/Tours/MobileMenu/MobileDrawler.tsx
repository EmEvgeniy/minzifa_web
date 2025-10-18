'use client';
import { useMobFilterStore } from './store';
import { FaChevronLeft } from 'react-icons/fa6';
import { ReactNode } from 'react';

function MobileDrawler({ btn, elem }: { btn: string; elem: ReactNode }) {
  const { setOpen, open } = useMobFilterStore((s) => s);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
        />
      )}

      {/* Bottom Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="w-full px-4 py-5 border-b border-gray-200 flex items-center sticky top-0 bg-white rounded-t-2xl">
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaChevronLeft size={20} />
          </button>
          <p className="text-center w-full text-lg font-semibold text-gray-800">{btn}</p>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4">{elem}</div>
      </div>
    </>
  );
}

export default MobileDrawler;
