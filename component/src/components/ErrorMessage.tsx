import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils';

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 에러 메시지가 있을 때만 렌더링
  show?: boolean;
}

// 크기별 스타일 정의
const sizeStyles = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  ({
    size = 'medium',
    show = true,
    className = '',
    children,
    ...props
  }, ref) => {
    // children이 없거나 show가 false면 렌더링하지 않음
    if (!children || !show) {
      return null;
    }

    // 기본 스타일 클래스 조합
    const baseStyles = 'mt-1 text-red-600';
    const sizeClass = sizeStyles[size];
    
    // 최종 클래스 조합
    const errorClasses = cn(baseStyles, sizeClass, className);

    return (
      <p
        ref={ref}
        className={errorClasses}
        role="alert"
        {...props}
      >
        {children}
      </p>
    );
  }
);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage; 