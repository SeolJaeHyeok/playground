import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import Input from './Input';
import Label from './Label';
import ErrorMessage from './ErrorMessage';
import HelperText from './HelperText';
import LoadingSpinner from './LoadingSpinner';

interface InputGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  // 레이블
  label?: string;
  // 에러 상태
  error?: boolean;
  // 에러 메시지
  errorMessage?: string;
  // 도움말 텍스트
  helperText?: string;
  // 크기 변형
  size?: 'small' | 'medium' | 'large';
  // 스타일 변형
  variant?: 'outlined' | 'filled';
  // 전체 너비 사용 여부
  fullWidth?: boolean;
  // 로딩 상태
  loading?: boolean;
  // 필수 입력 표시
  required?: boolean;
  // prefix 아이콘
  prefixIcon?: React.ReactNode;
  // suffix 아이콘
  suffixIcon?: React.ReactNode;
}

const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({
    label,
    error = false,
    errorMessage,
    helperText,
    size = 'medium',
    variant = 'outlined',
    fullWidth = false,
    loading = false,
    required = false,
    prefixIcon,
    suffixIcon,
    className = '',
    id,
    ...props
  }, ref) => {
    // 고유한 ID 생성 (접근성을 위해)
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // aria-describedby 속성 생성
    const getAriaDescribedBy = () => {
      const describedBy = [];
      if (error && errorMessage) describedBy.push(errorId);
      if (!error && helperText) describedBy.push(helperId);
      return describedBy.length > 0 ? describedBy.join(' ') : undefined;
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* 레이블 */}
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            error={error}
            size={size}
          >
            {label}
          </Label>
        )}
        
        {/* Input 래퍼 */}
        <div className="relative">
          {/* Prefix 아이콘 */}
          {prefixIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
              {prefixIcon}
            </div>
          )}
          
          {/* Input 요소 */}
          <Input
            ref={ref}
            id={inputId}
            error={error}
            size={size}
            variant={variant}
            fullWidth={fullWidth}
            disabled={props.disabled || loading}
            className={`${className} ${prefixIcon ? 'pl-10' : ''} ${suffixIcon || loading ? 'pr-10' : ''}`}
            aria-describedby={getAriaDescribedBy()}
            {...props}
          />
          
          {/* Suffix 아이콘 또는 로딩 스피너 */}
          {(suffixIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                suffixIcon
              )}
            </div>
          )}
        </div>
        
        {/* 에러 메시지 */}
        <ErrorMessage
          id={errorId}
          size={size}
          show={error && !!errorMessage}
        >
          {errorMessage}
        </ErrorMessage>
        
        {/* 도움말 텍스트 */}
        <HelperText
          id={helperId}
          size={size}
          show={!error && !!helperText}
        >
          {helperText}
        </HelperText>
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export default InputGroup; 