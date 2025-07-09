import { forwardRef, type LabelHTMLAttributes } from 'react';
import { cn } from '../utils';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  // 필수 입력 표시
  required?: boolean;
  // 에러 상태 (스타일링 목적)
  error?: boolean;
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
}

// 크기별 스타일 정의
const sizeStyles = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({
    required = false,
    error = false,
    size = 'medium',
    className = '',
    children,
    ...props
  }, ref) => {
    // 기본 스타일 클래스 조합
    const baseStyles = 'block font-medium mb-1';
    const sizeClass = sizeStyles[size];
    const colorClass = error ? 'text-red-600' : 'text-gray-700';
    
    // 최종 클래스 조합
    const labelClasses = cn(baseStyles, sizeClass, colorClass, className);

    return (
      <label
        ref={ref}
        className={labelClasses}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label; 