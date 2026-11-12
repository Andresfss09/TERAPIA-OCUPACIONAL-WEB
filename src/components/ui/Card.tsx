import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glass = true,
  padding = 'lg'
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-10'
  };

  return (
    <div
      className={`rounded-3xl transition-all duration-300 relative ${
        glass
          ? 'glass-card border border-white/70 shadow-soft'
          : 'bg-white border border-stone-100 shadow-soft'
      } ${
        hoverEffect
          ? 'hover:shadow-soft-hover hover:-translate-y-1 hover:border-lavender-200'
          : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};
