import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../utils';

interface LoadingSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 색상 변형
  color?: 'primary' | 'secondary' | 'gray';
  // 너비
  width?: number;
}

// 크기별 스타일 정의
const sizeStyles = {
  small: 'h-3 w-3 border',
  medium: 'h-4 w-4 border-2',
  large: 'h-6 w-6 border-2',
};

// 색상별 스타일 정의
const colorStyles = {
  primary: 'border-gray-300 border-t-blue-500',
  secondary: 'border-gray-300 border-t-green-500',
  gray: 'border-gray-300 border-t-gray-500',
};

const LoadingSpinner = forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({
    size = 'medium',
    color = 'primary',
    className = '',
    ...props
  }, ref) => {
    // 기본 스타일 클래스 조합 - 부모의 전체 영역을 차지하면서 중앙 정렬
    const baseStyles = 'w-full h-full flex items-center justify-center bg-white bg-opacity-90';
    const sizeClass = sizeStyles[size];
    const colorClass = colorStyles[color];
    
    // 실제 스피너 스타일
    const spinnerStyles = 'animate-spin rounded-full';
    
    // 최종 클래스 조합
    const containerClasses = cn(baseStyles, className);
    const spinnerClasses = cn(spinnerStyles, sizeClass, colorClass);

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <div className={spinnerClasses} />
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner; 