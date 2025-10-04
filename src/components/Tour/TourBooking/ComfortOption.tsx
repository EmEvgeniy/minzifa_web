import { cn } from '@/utils/utils';
import { FormattedPrice } from '@/components/UI/FormattedPrice/FormattedPrice';

interface ComfortOptionProps {
  label: string;
  price?: number;
  currency: string;
  onSelect: (value: number | null) => void;
}

export default function ComfortOption({ label, price, currency, onSelect }: ComfortOptionProps) {
  const isAvailable = typeof price === 'number' && price > 0;

  return (
    <label
      className={cn(
        'flex items-center justify-between gap-3 border rounded-2xl p-4 cursor-pointer',
        isAvailable ? 'bg-white' : 'bg-gray-100 opacity-60 cursor-not-allowed',
      )}
      onClick={() => isAvailable && onSelect(price!)}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'w-5 h-5 rounded border flex items-center justify-center',
            isAvailable ? 'border-[#16372D]' : 'border-gray-300',
          )}
        >
          <span className="w-3 h-3 rounded bg-[#16372D]" />
        </span>
        <span className="text-[#16372D] font-medium">{label}</span>
      </div>
      <div className="text-[#16372D] font-semibold">
        {isAvailable ? (
          <FormattedPrice price={price!} currency={currency} as="span" minimumFractionDigits={0} />
        ) : (
          '-'
        )}
      </div>
    </label>
  );
}
