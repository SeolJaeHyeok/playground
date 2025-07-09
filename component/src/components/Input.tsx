import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../utils';

// 기본 HTML input 속성을 확장하는 인터페이스 (size 속성 제외)
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // 에러 상태 (스타일링 목적)
  error?: boolean;
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 스타일 변형
  variant?: 'outlined' | 'filled';
  // 전체 너비 사용 여부
  fullWidth?: boolean;
}

// 크기별 스타일 정의
const sizeStyles = {
  small: 'px-2 py-1 text-sm',
  medium: 'px-3 py-2 text-base',
  large: 'px-4 py-3 text-lg',
};

// 변형별 스타일 정의
const variantStyles = {
  outlined: 'border border-gray-300 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
};

// forwardRef를 사용하여 ref를 전달할 수 있도록 구현
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    error = false,
    size = 'medium',
    variant = 'outlined',
    fullWidth = false,
    className = '',
    disabled,
    ...props
  }, ref) => {
    // 기본 스타일 클래스 조합
    const baseStyles = 'rounded-md transition-all duration-200 outline-none';
    const sizeClass = sizeStyles[size];
    const variantClass = variantStyles[variant];
    const widthClass = fullWidth ? 'w-full' : '';
    const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
    
    const inputClasses = cn(baseStyles, sizeClass, variantClass, widthClass, errorClass, disabledClass, className);

    return (
      <input
        ref={ref}
        disabled={disabled}
        className={inputClasses}
        aria-invalid={error}
        {...props}
      />
    );
  }
);

// 컴포넌트 이름 설정 (디버깅을 위해)
Input.displayName = 'Input';

export default Input;