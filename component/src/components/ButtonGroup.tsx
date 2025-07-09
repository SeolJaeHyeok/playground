import { forwardRef, type ButtonHTMLAttributes } from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

interface ButtonGroupProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 스타일 변형
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  // 전체 너비 사용 여부
  fullWidth?: boolean;
  // 로딩 상태
  loading?: boolean;
  // 로딩 텍스트
  loadingText?: string;
  // prefix 아이콘
  prefixIcon?: React.ReactNode;
  // suffix 아이콘
  suffixIcon?: React.ReactNode;
  // 아이콘과 텍스트 사이의 간격
  iconSpacing?: 'small' | 'medium' | 'large';
}

// 아이콘 간격별 스타일 정의
const iconSpacingStyles = {
  small: 'gap-1',
  medium: 'gap-2',
  large: 'gap-3',
};

const ButtonGroup = forwardRef<HTMLButtonElement, ButtonGroupProps>(
  ({
    size = 'medium',
    variant = 'primary',
    fullWidth = false,
    loading = false,
    loadingText,
    prefixIcon,
    suffixIcon,
    iconSpacing = 'medium',
    className = '',
    children,
    disabled,
    ...props
  }, ref) => {
    // 로딩 상태에 따른 텍스트 결정
    const displayText = loading && loadingText ? loadingText : children;
    
    // 아이콘 간격 클래스
    const spacingClass = iconSpacingStyles[iconSpacing];
    
    // 아이콘이나 로딩 스피너가 있을 때 간격 추가
    const hasIcon = prefixIcon || suffixIcon || loading;
    const contentClasses = hasIcon ? spacingClass : '';

    return (
      <Button
        ref={ref}
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        loading={loading}
        disabled={disabled}
        className={`${contentClasses} ${className}`}
        {...props}
      >
        {/* Prefix 아이콘 */}
        {prefixIcon && !loading && (
          <span className="flex-shrink-0">
            {prefixIcon}
          </span>
        )}
        
        {/* 로딩 스피너 */}
        {loading && (
          <LoadingSpinner 
            size={size === 'large' ? 'medium' : 'small'}
            color={variant === 'outline' || variant === 'ghost' ? 'gray' : 'primary'}
          />
        )}
        
        {/* 버튼 텍스트 */}
        {displayText && (
          <span>
            {displayText}
          </span>
        )}
        
        {/* Suffix 아이콘 */}
        {suffixIcon && !loading && (
          <span className="flex-shrink-0">
            {suffixIcon}
          </span>
        )}
      </Button>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup; 