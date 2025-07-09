import { forwardRef, type HTMLAttributes, type ElementType, type ReactNode } from 'react';
import { cn } from '../utils';

// 가능한 HTML 요소들
type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em' | 'small';

interface TextProps extends HTMLAttributes<HTMLElement> {
  // 렌더링할 HTML 요소
  as?: TextElement;
  // 크기 변형
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  // 굵기
  weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  // 색상 변형
  color?: 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning' | 'info';
  // 정렬
  align?: 'left' | 'center' | 'right' | 'justify';
  // 줄 높이
  leading?: 'tight' | 'normal' | 'relaxed' | 'loose';
  // 텍스트 장식
  decoration?: 'underline' | 'line-through' | 'none';
  // 대소문자 변환
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
  // 줄바꿈 처리
  truncate?: boolean;
  // children
  children?: ReactNode;
}

// 크기별 스타일 정의
const sizeStyles = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

// 굵기별 스타일 정의
const weightStyles = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

// 색상별 스타일 정의
const colorStyles = {
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-500',
  danger: 'text-red-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
};

// 정렬별 스타일 정의
const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

// 줄 높이별 스타일 정의
const leadingStyles = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
};

// 텍스트 장식별 스타일 정의
const decorationStyles = {
  underline: 'underline',
  'line-through': 'line-through',
  none: 'no-underline',
};

// 대소문자 변환별 스타일 정의
const transformStyles = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  'normal-case': 'normal-case',
};

const Text = forwardRef<HTMLElement, TextProps>(
  ({
    as = 'p',
    size = 'base',
    weight = 'normal',
    color = 'primary',
    align = 'left',
    leading = 'normal',
    decoration = 'none',
    transform = 'normal-case',
    truncate = false,
    className = '',
    children,
    ...props
  }, ref) => {
    // 스타일 클래스 조합
    const sizeClass = sizeStyles[size];
    const weightClass = weightStyles[weight];
    const colorClass = colorStyles[color];
    const alignClass = alignStyles[align];
    const leadingClass = leadingStyles[leading];
    const decorationClass = decorationStyles[decoration];
    const transformClass = transformStyles[transform];
    const truncateClass = truncate ? 'truncate' : '';
    
    // 최종 클래스 조합
    const textClasses = cn(
      sizeClass,
      weightClass,
      colorClass,
      alignClass,
      leadingClass,
      decorationClass,
      transformClass,
      truncateClass,
      className
    );

    // 동적으로 HTML 요소 생성
    const Component = as as ElementType;

    return (
      <Component
        ref={ref}
        className={textClasses}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export default Text; 