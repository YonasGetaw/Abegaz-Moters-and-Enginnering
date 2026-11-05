import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'brand' | 'orange' | 'secondary' | 'outline' | 'outline-white' | 'telegram' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-btn transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "h-9 px-3.5 text-xs",
    md: "h-11 sm:h-12 px-6 text-sm",
    lg: "h-13 sm:h-14 px-8 text-base"
  };

  const variantStyles = {
    primary: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm font-black",
    brand: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm font-black",
    orange: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm font-black",
    secondary: "bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-600 focus:ring-blue-500 font-extrabold",
    outline: "bg-transparent text-blue-700 border-2 border-blue-600 hover:bg-blue-50 focus:ring-blue-500 font-extrabold",
    'outline-white': "bg-transparent text-white border-2 border-white hover:bg-white/10 focus:ring-white font-extrabold",
    telegram: "bg-[#229ED9] text-white hover:bg-[#1D8BC0] focus:ring-[#229ED9] shadow-sm font-extrabold",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 font-black",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>በሂደት ላይ...</span>
        </span>
      ) : children}
    </button>
  );
};
