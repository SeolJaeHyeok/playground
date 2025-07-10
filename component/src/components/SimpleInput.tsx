import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils';

interface SimpleInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // 기본 속성
  label?: string;
  helperText?: string;
  errorMessage?: string;
  
  // 스타일링
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
  
  // 상태
  error?: boolean;
  loading?: boolean;
  
  // 레이아웃
  fullWidth?: boolean;
  
  // 아이콘
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  
  // 기타
  required?: boolean;
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputProps>(
  ({
    // 기본 속성
    label,
    helperText,
    errorMessage,
    
    // 스타일링
    size = 'md',
    variant = 'outlined',
    
    // 상태  
    error = false,
    loading = false,
    
    // 레이아웃
    fullWidth = false,
    
    // 아이콘
    leftIcon,
    rightIcon,
    
    // 기타
    required = false,
    className,
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    
    // 스타일 정의
    const sizeClasses = {
      sm: {
        input: 'px-2 py-1 text-sm',
        label: 'text-xs',
        text: 'text-xs',
        icon: 'w-4 h-4'
      },
      md: {
        input: 'px-3 py-2 text-base', 
        label: 'text-sm',
        text: 'text-sm',
        icon: 'w-5 h-5'
      },
      lg: {
        input: 'px-4 py-3 text-lg',
        label: 'text-base', 
        text: 'text-base',
        icon: 'w-6 h-6'
      }
    };
    
    const variantClasses = {
      outlined: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100 focus:bg-white'
    };
    
    // aria-describedby 생성
    const getAriaDescribedBy = () => {
      const describedBy = [];
      if (error && errorMessage) describedBy.push(errorId);
      if (!error && helperText) describedBy.push(helperId);
      return describedBy.length > 0 ? describedBy.join(' ') : undefined;
    };
    
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block font-medium mb-1',
              sizeClasses[size].label,
              error ? 'text-red-600' : 'text-gray-700'
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <div className={sizeClasses[size].icon}>
                {leftIcon}
              </div>
            </div>
          )}
          
          {/* Input Field */}
          <input
            ref={ref}
            id={id}
            disabled={disabled || loading}
            className={cn(
              'w-full rounded-md transition-all duration-200 outline-none',
              sizeClasses[size].input,
              variantClasses[variant],
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
              (disabled || loading) && 'opacity-50 cursor-not-allowed',
              leftIcon && 'pl-10',
              (rightIcon || loading) && 'pr-10',
              className
            )}
            aria-describedby={getAriaDescribedBy()}
            aria-invalid={error}
            {...props}
          />
          
          {/* Right Icon or Loading */}
          {(rightIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {loading ? (
                <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-blue-600', sizeClasses[size].icon)} />
              ) : (
                <div className={sizeClasses[size].icon}>
                  {rightIcon}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Error Message */}
        {error && errorMessage && (
          <p
            id={errorId}
            className={cn('mt-1 text-red-600', sizeClasses[size].text)}
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        
        {/* Helper Text */}
        {!error && helperText && (
          <p
            id={helperId}
            className={cn('mt-1 text-gray-500', sizeClasses[size].text)}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

SimpleInput.displayName = 'SimpleInput';

export default SimpleInput; 