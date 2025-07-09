import { forwardRef, type ButtonHTMLAttributes } from 'react';

// 기본 HTML button 속성을 확장하는 인터페이스
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 스타일 변형
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  // 전체 너비 사용 여부
  fullWidth?: boolean;
  // 로딩 상태 (스타일링 목적)
  loading?: boolean;
}

// 크기별 스타일 정의
const sizeStyles = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

// 변형별 스타일 정의
const variantStyles = {
  primary: 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 focus:ring-blue-500',
  secondary: 'bg-gray-500 text-white border-gray-500 hover:bg-gray-600 focus:ring-gray-500',
  outline: 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-50 focus:ring-blue-500',
  ghost: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100 focus:ring-gray-500',
  danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600 focus:ring-red-500',
  success: 'bg-green-500 text-white border-green-500 hover:bg-green-600 focus:ring-green-500',
};

// forwardRef를 사용하여 ref를 전달할 수 있도록 구현
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    size = 'medium',
    variant = 'primary',
    fullWidth = false,
    loading = false,
    className = '',
    disabled,
    children,
    ...props
  }, ref) => {
    // 기본 스타일 클래스 조합
    const baseStyles = 'inline-flex items-center justify-center border rounded-md font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2';
    const sizeClass = sizeStyles[size];
    const variantClass = variantStyles[variant];
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
    
    // 최종 클래스 조합
    const buttonClasses = [
      baseStyles,
      sizeClass,
      variantClass,
      widthClass,
      disabledClass,
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

// 컴포넌트 이름 설정 (디버깅을 위해)
Button.displayName = 'Button';

export default Button; 