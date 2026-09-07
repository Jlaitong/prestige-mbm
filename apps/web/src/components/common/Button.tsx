import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-brand font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none min-h-[44px]';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4 text-sm',
  };

  const variantStyles = {
    primary:
      'bg-[#121212] text-[#e8e8e6] hover:bg-[#262626] hover:shadow-lg hover:-translate-y-0.5',
    secondary:
      'bg-[#ffffff] text-[#121212] border border-[rgba(18,18,18,0.12)] hover:bg-[#f3f3f1] hover:border-[#121212]',
    outline:
      'bg-transparent text-[#121212] border border-[#121212]/30 hover:bg-[#121212] hover:text-[#e8e8e6]',
    whatsapp:
      'bg-[#121212] text-[#e8e8e6] border border-white/20 hover:bg-[#0d0d0d] hover:scale-105 shadow-float',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
