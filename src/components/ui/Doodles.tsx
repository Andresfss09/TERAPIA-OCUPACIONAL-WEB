import React from 'react';

export const WavyUnderline: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-full h-3',
  color = '#E59A8E',
}) => (
  <svg
    viewBox="0 0 220 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M3 11.5C45.5 3.5 92.5 14.5 138 6.5C169.5 1 196.5 11.5 217 7.5"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

export const HeartDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#D47668',
}) => (
  <svg viewBox="0 0 36 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M18.2 29.8C18.2 29.8 4.5 21.2 3.2 11.4C2.1 3.6 9.8 1.2 14.8 4.8C16.8 6.2 17.9 8.2 18.2 9.1C18.6 7.8 20.3 5.2 23.1 4.1C28.6 1.9 33.8 6.2 32.5 13.1C30.8 21.8 18.2 29.8 18.2 29.8Z"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={color}
      fillOpacity="0.2"
    />
  </svg>
);

export const FlowerDoodle: React.FC<{ className?: string; color?: string; centerColor?: string }> = ({
  className = 'w-8 h-8',
  color = '#E59A8E',
  centerColor = '#E2B75B',
}) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M24 6C27 6 29 11 27 16C31 12 37 13 38 17C39 21 34 24 29 24C34 26 37 31 34 35C31 39 26 36 24 31C22 36 17 39 14 35C11 31 14 26 19 24C14 24 9 21 10 17C11 13 17 12 21 16C19 11 21 6 24 6Z"
      fill={color}
      fillOpacity="0.28"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="24" cy="23" r="4.5" fill={centerColor} stroke="#423330" strokeWidth="1.5" />
  </svg>
);

export const SparkleDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#9B72CF',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 3C16.8 9.8 19.2 12.2 26 13C19.2 13.8 16.8 16.2 16 23C15.2 16.2 12.8 13.8 6 13C12.8 12.2 15.2 9.8 16 3Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="25" cy="24" r="2" fill={color} />
    <circle cx="7" cy="6" r="1.5" fill={color} />
  </svg>
);

export const SproutDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#6E9464',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 27V14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path
      d="M16 18C10 18 6 13 7 8C12 7 16 11 16 18Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M16 15C21 14 25 9 24 5C19 5 16 9 16 15Z"
      fill={color}
      fillOpacity="0.25"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const PinDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#D47668',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 28C16 28 25 20.2 25 13C25 8 21 4 16 4C11 4 7 8 7 13C7 20.2 16 28 16 28Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="13" r="3.2" fill="#FFFDFB" stroke={color} strokeWidth="2" />
  </svg>
);

export const ToyBlocksDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#D47668',
}) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect
      x="13"
      y="6"
      width="16"
      height="15"
      rx="4"
      fill="#F8DCD7"
      stroke={color}
      strokeWidth="2.2"
    />
    <rect
      x="6"
      y="23"
      width="15"
      height="15"
      rx="4"
      fill="#E8DCF8"
      stroke="#8054B8"
      strokeWidth="2.2"
    />
    <rect
      x="23"
      y="23"
      width="15"
      height="15"
      rx="4"
      fill="#D4E3D0"
      stroke="#55774C"
      strokeWidth="2.2"
    />
    <path d="M21 11.5L22.5 14.5L25.5 15L23.2 17L23.8 20L21 18.5L18.2 20L18.8 17L16.5 15L19.5 14.5L21 11.5Z" fill={color} />
  </svg>
);

export const CaringHandsDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#55774C',
}) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M22 23C22 23 14 17.5 13 11.5C12.3 7 17 5.5 20 8C21.2 9 21.8 10.2 22 10.8C22.2 10 23.2 8.4 25 7.6C28.3 6.2 31.6 9 30.8 13.2C29.7 18.5 22 23 22 23Z"
      fill="#F8DCD7"
      stroke="#D47668"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M7 26C9 24 12 25 15 28L20 32C22 33.5 25 33.5 27 32L35 25C36.8 23.5 39 25 37.5 27.5L30 36C27 39 22 39.5 18 37L9 31C6.5 29.2 5.5 27.5 7 26Z"
      fill="#D4E3D0"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TeaCupDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#8054B8',
}) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M16 12C15 9.5 17 8 16 5.5" stroke="#D47668" strokeWidth="2" strokeLinecap="round" />
    <path d="M23 11C22 8.5 24 7 23 4.5" stroke="#D47668" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M9 17H30V26C30 31.5 25.5 36 20 36H19C13.5 36 9 31.5 9 26V17Z"
      fill="#E8DCF8"
      stroke={color}
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M30 19H33.5C36 19 37.5 21 37.5 23.5C37.5 26 35.5 28 33 28H29.5"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M7 36H33" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const SunFlourishDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-8 h-8',
  color = '#C99836',
}) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="22" cy="22" r="9" fill="#F6E6BD" stroke={color} strokeWidth="2.2" />
    <path d="M22 6V10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M22 34V38" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M6 22H10" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M34 22H38" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M10.5 10.5L13.5 13.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M30.5 30.5L33.5 33.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M33.5 10.5L30.5 13.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    <path d="M13.5 30.5L10.5 33.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const ClockDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#D47668',
}) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="18" cy="18" r="13" fill="#FCEEEB" stroke={color} strokeWidth="2.2" />
    <path d="M18 11V18L22.5 20.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LoveLetterDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#D47668',
}) => (
  <svg viewBox="0 0 40 34" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3" y="5" width="34" height="24" rx="4" fill="#FCEEEB" stroke={color} strokeWidth="2.2" />
    <path d="M4 7L20 19L36 7" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="18" r="3.5" fill={color} />
  </svg>
);

export const RibbonBadgeDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-5 h-5',
  color = '#6E9464',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="16" cy="13" r="8" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2.2" />
    <path d="M12 20L10 28L16 25L22 28L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HandDrawnArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-14 h-14',
  color = '#BA5A4C',
}) => (
  <svg viewBox="0 0 70 55" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M6 10C18 4 38 6 44 21C48 31 36 37 31 30C26 23 39 15 51 24C59 30 61 40 62 47"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M54 42L62.5 48.5L66.5 39"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BotanicalSprig: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-12 h-12',
  color = '#6E9464',
}) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M14 54C20 40 32 24 50 12"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path
      d="M24 39C18 36 14 28 19 23C24 18 30 27 24 39Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M35 26C30 22 28 14 33 11C38 8 42 17 35 26Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M27 41C34 42 42 39 43 33C44 27 34 30 27 41Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M39 28C46 28 53 25 53 19C53 13 44 18 39 28Z"
      fill={color}
      fillOpacity="0.22"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export const WavyDivider: React.FC<{ fill?: string; flip?: boolean }> = ({
  fill = '#FFFDFB',
  flip = false,
}) => (
  <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${flip ? 'rotate-180' : ''}`}>
    <svg
      viewBox="0 0 1440 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-7 sm:h-11"
      preserveAspectRatio="none"
    >
      <path
        d="M0 24C120 44 240 4 360 18C480 32 600 52 720 36C840 20 960 2 1080 18C1200 34 1320 48 1440 24V54H0V24Z"
        fill={fill}
      />
    </svg>
  </div>
);
