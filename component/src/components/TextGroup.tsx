import { forwardRef, type HTMLAttributes } from 'react';
import Text from './Text';

interface TextGroupProps extends HTMLAttributes<HTMLDivElement> {
  // 제목
  title?: string;
  // 제목 크기
  titleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  // 제목 굵기
  titleWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  // 제목 색상
  titleColor?: 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning' | 'info';
  // 제목 HTML 요소
  titleAs?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  // 설명
  description?: string;
  // 설명 크기
  descriptionSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  // 설명 색상
  descriptionColor?: 'primary' | 'secondary' | 'muted' | 'danger' | 'success' | 'warning' | 'info';
  
  // 간격
  spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  // 정렬
  align?: 'left' | 'center' | 'right';
  // 방향
  direction?: 'vertical' | 'horizontal';
}

// 간격별 스타일 정의
const spacingStyles = {
  tight: 'gap-1',
  normal: 'gap-2',
  relaxed: 'gap-4',
  loose: 'gap-6',
};

// 정렬별 스타일 정의
const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// 방향별 스타일 정의
const directionStyles = {
  vertical: 'flex flex-col',
  horizontal: 'flex flex-row items-center',
};

const TextGroup = forwardRef<HTMLDivElement, TextGroupProps>(
  ({
    title,
    titleSize = 'lg',
    titleWeight = 'semibold',
    titleColor = 'primary',
    titleAs = 'h3',
    description,
    descriptionSize = 'base',
    descriptionColor = 'secondary',
    spacing = 'normal',
    align = 'left',
    direction = 'vertical',
    className = '',
    children,
    ...props
  }, ref) => {
    // 스타일 클래스 조합
    const spacingClass = spacingStyles[spacing];
    const alignClass = alignStyles[align];
    const directionClass = directionStyles[direction];
    
    // 최종 클래스 조합
    const groupClasses = [
      directionClass,
      spacingClass,
      alignClass,
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={groupClasses}
        {...props}
      >
        {/* 제목 */}
        {title && (
          <Text
            as={titleAs}
            size={titleSize}
            weight={titleWeight}
            color={titleColor}
          >
            {title}
          </Text>
        )}
        
        {/* 설명 */}
        {description && (
          <Text
            size={descriptionSize}
            color={descriptionColor}
          >
            {description}
          </Text>
        )}
        
        {/* 추가 콘텐츠 */}
        {children}
      </div>
    );
  }
);

TextGroup.displayName = 'TextGroup';

export default TextGroup; 