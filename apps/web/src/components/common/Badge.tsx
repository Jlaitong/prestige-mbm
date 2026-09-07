import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'dark' | 'green' | 'outline' | 'subtle';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'dark',
  className = '',
}) => {
  const variantStyles = {
    dark: 'bg-[#121212] text-[#e8e8e6] border-transparent',
    green: 'bg-[#1b7a42] text-white border-transparent',
    outline: 'bg-transparent border-[#121212]/15 text-[#121212]',
    subtle: 'bg-[#ffffff]/80 text-[#121212] border-[rgba(18,18,18,0.08)]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-brand font-bold uppercase tracking-wider border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
