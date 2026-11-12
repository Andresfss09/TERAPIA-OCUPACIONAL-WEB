import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lavender' | 'sage' | 'blush' | 'terracotta' | 'gold' | 'cream';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'lavender',
  size = 'md',
  icon,
  className = ''
}) => {
  const variantStyles = {
    lavender: 'bg-lavender-100 text-lavender-700 border border-lavender-200/80',
    sage: 'bg-sage-100 text-sage-700 border border-sage-200/80',
    blush: 'bg-blush-100 text-blush-600 border border-blush-200/80',
    terracotta: 'bg-terracotta-100 text-terracotta-700 border border-terracotta-200/80',
    gold: 'bg-gold-100 text-gold-600 border border-gold-300/80',
    cream: 'bg-white/90 text-stone-600 border border-stone-200/80'
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5 font-medium',
    md: 'text-xs md:text-sm px-3.5 py-1.5 gap-2 font-medium tracking-wide'
  };

  return (
    <span className={`inline-flex items-center rounded-full shadow-xs ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
