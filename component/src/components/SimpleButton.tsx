import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils';

interface SimpleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 스타일링
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  
  // 상태
  loading?: boolean;
  
  // 레이아웃
  fullWidth?: boolean;
  
  // 아이콘
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  
  // 텍스트
  loadingText?: string;
}

const SimpleButton = forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({
    // 스타일링
    size = 'md',
    variant = 'primary',
    
    // 상태
    loading = false,
    
    // 레이아웃
    fullWidth = false,
    
    // 아이콘
    leftIcon,
    rightIcon,
    
    // 텍스트
    loadingText,
    
    children,
    disabled,
    className,
    ...props
  }, ref) => {
    // 스타일 정의
    const sizeClasses = {
      sm: {
        button: 'px-3 py-1.5 text-sm',
        icon: 'w-4 h-4',
        spinner: 'w-4 h-4'
      },
      md: {
        button: 'px-4 py-2 text-base',
        icon: 'w-5 h-5', 
        spinner: 'w-5 h-5'
      },
      lg: {
        button: 'px-6 py-3 text-lg',
        icon: 'w-6 h-6',
        spinner: 'w-6 h-6'
      }
    };
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      outline: 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500'
    };
    
    // 표시할 텍스트 결정
    const displayText = loading && loadingText ? loadingText : children;
    
    // 스피너 컴포넌트
    const Spinner = () => (
      <div 
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizeClasses[size].spinner
        )}
      />
    );
    
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 border rounded-md font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2',
          sizeClasses[size].button,
          variantClasses[variant],
          fullWidth && 'w-full',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {/* Left Icon or Loading Spinner */}
        {loading ? (
          <Spinner />
        ) : leftIcon ? (
          <span className={cn('flex-shrink-0', sizeClasses[size].icon)}>
            {leftIcon}
          </span>
        ) : null}
        
        {/* Button Text */}
        {displayText && (
          <span className="truncate">
            {displayText}
          </span>
        )}
        
        {/* Right Icon (not shown during loading) */}
        {!loading && rightIcon && (
          <span className={cn('flex-shrink-0', sizeClasses[size].icon)}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

SimpleButton.displayName = 'SimpleButton';

export default SimpleButton; 