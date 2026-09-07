import React from 'react';

interface PriceProps {
  amount: number;
  compareAtAmount?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  compareAtAmount,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl md:text-4xl',
  };

  return (
    <div className={`flex items-baseline gap-2.5 ${className}`}>
      <span className={`font-brand font-black text-[#121212] ${sizeClasses[size]}`}>
        ${amount.toLocaleString('es-CO')} COP
      </span>
      {compareAtAmount && compareAtAmount > amount && (
        <span className="text-xs line-through text-[#888] font-normal">
          ${compareAtAmount.toLocaleString('es-CO')}
        </span>
      )}
    </div>
  );
};
