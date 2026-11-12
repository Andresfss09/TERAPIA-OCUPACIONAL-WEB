import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'secondary' | 'sage' | 'terracotta' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'group inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2 gap-1.5 tracking-wide',
    md: 'text-xs sm:text-sm px-6 py-3 gap-2 tracking-wide',
    lg: 'text-sm sm:text-base px-8 py-4 gap-2.5 tracking-wide',
  };

  const variantClasses = {
    primary:
      'bg-blush-500 hover:bg-blush-600 text-white shadow-soft hover:shadow-soft-hover focus:ring-blush-400 hover:-translate-y-0.5',
    dark:
      'bg-stone-900 hover:bg-stone-800 text-white shadow-soft hover:shadow-soft-hover focus:ring-stone-700 hover:-translate-y-0.5',
    secondary:
      'bg-blush-100 hover:bg-blush-200 text-blush-600 focus:ring-blush-300',
    sage:
      'bg-sage-600 hover:bg-sage-700 text-white shadow-soft focus:ring-sage-500 hover:-translate-y-0.5',
    terracotta:
      'bg-terracotta-500 hover:bg-terracotta-600 text-white focus:ring-terracotta-400 hover:-translate-y-0.5',
    outline:
      'bg-white hover:bg-cream-100 text-stone-800 border border-stone-300 hover:border-stone-400 shadow-xs hover:-translate-y-0.5',
    ghost:
      'bg-transparent hover:bg-stone-100 text-stone-700 hover:text-stone-900',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </button>
  );
};
