import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  icon,
  className = '',
  required,
  id,
  ...props
}) => {
  const inputId = id || 'input-' + label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full text-left">
      <label htmlFor={inputId} className="block text-xs font-semibold text-stone-600 mb-1.5 tracking-wide">
        {label} {required && <span className="text-blush-500">*</span>}
      </label>
      <div className="relative rounded-2xl">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          required={required}
          className={`w-full rounded-2xl bg-white/90 border transition-all duration-200 text-sm py-2.5 ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${
            error
              ? 'border-red-300 text-red-900 focus:ring-red-400 focus:border-red-400'
              : 'border-stone-200 text-stone-800 placeholder-stone-400 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-200/60'
          } outline-none ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-stone-400">{helperText}</p>
      ) : null}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  required,
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = id || 'textarea-' + label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full text-left">
      <label htmlFor={textareaId} className="block text-xs font-semibold text-stone-600 mb-1.5 tracking-wide">
        {label} {required && <span className="text-blush-500">*</span>}
      </label>
      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={`w-full rounded-2xl bg-white/90 border transition-all duration-200 text-sm px-4 py-2.5 ${
          error
            ? 'border-red-300 text-red-900 focus:ring-red-400 focus:border-red-400'
            : 'border-stone-200 text-stone-800 placeholder-stone-400 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-200/60'
        } outline-none resize-none ${className}`}
        {...props}
      />
      {error ? (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-stone-400">{helperText}</p>
      ) : null}
    </div>
  );
};
