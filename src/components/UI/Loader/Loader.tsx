type LoaderProps = {
  size?: number;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  text?: string;
  className?: string;
};

export default function Loader({
  size = 10,
  color = 'border-t-green-800',
  borderColor = 'border-gray-200',
  borderWidth = 4,
  text,
  className = '',
}: LoaderProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`
                    w-${size}
                    h-${size}
                    border-${borderWidth}
                    rounded-full 
                    animate-spin 
                    mx-auto
                    ${color} 
                    ${borderColor}
                `}
      />

      {text && (
        <p className="mt-3 text-sm text-gray-600 text-center">
          {text}
        </p>
      )}
    </div>
  );
}
