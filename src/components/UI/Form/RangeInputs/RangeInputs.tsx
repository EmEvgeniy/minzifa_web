import React, { ReactNode } from 'react';

interface RangeInputsProps {
  minValue: number;
  maxValue: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  minLabel?: string | undefined;
  maxLabel?: string | undefined;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  icon?: ReactNode | string;
}

const RangeInputs: React.FC<RangeInputsProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minLabel,
  maxLabel,
  icon = '',
}) => {
  return (
    <div className="grid grid-cols-2 border-2 border-gray-200 rounded-lg">
      <div className="flex flex-col border-r-2 border-gray-200 p-2.5">
        <label htmlFor="range_min" className="text-sm text-black/50">
          {minLabel}
        </label>
        <div className="relative flex items-center gap-1">
          {icon && <span className="text-gray-500">{icon}</span>}
          <input
            id="range_min"
            type={'text'}
            min={0}
            value={minValue}
            onChange={(e) => onMinChange(Number(e.target.value))}
            className="block w-full text-lg focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col p-2.5 justify-end">
        <label htmlFor="range_max" className="text-sm text-black/50">
          {maxLabel}
        </label>
        <div className="relative flex items-center gap-1">
          {icon && <span className="text-gray-500">{icon}</span>}
          <input
            id="range_max"
            type={'text'}
            min={0}
            value={maxValue}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            className="block w-full text-lg focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export { RangeInputs };
