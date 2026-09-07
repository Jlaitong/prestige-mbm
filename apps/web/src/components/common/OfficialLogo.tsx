import React from 'react';

interface OfficialLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showHorse?: boolean;
}

export const OfficialLogo: React.FC<OfficialLogoProps> = ({
  className = '',
  size = 'md',
  showHorse = true,
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-56 h-56',
    xl: 'w-72 h-72',
    hero: 'w-80 sm:w-96 h-80 sm:h-96',
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      <img
        src="/assets/branding/prestige-official-logo.svg"
        alt="PRESTIGE MBM Logo Oficial"
        className="w-full h-full object-contain filter drop-shadow-md"
        loading="eager"
      />
    </div>
  );
};
