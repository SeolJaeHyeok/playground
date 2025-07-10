import React from 'react';
import { cn } from '../utils';

// Children을 활용한 합성 패턴: 레이아웃과 스타일링만 제공
interface CompositionCardProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export default function CompositionCard({ 
  children, 
  title, 
  variant = 'default',
  size = 'md'
}: CompositionCardProps) {
  const baseClasses = "rounded-lg transition-all duration-200";
  
  const variantClasses = {
    default: "bg-white border border-gray-200",
    bordered: "bg-white border-2 border-gray-300",
    elevated: "bg-white shadow-lg border border-gray-100",
    gradient: "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200"
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {title && (
        <h3 className={cn('text-lg font-semibold text-gray-800 mb-4')}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

// 추가적인 합성 컴포넌트들
export function FormSection({ 
  children, 
  title, 
  description 
}: { 
  children: React.ReactNode; 
  title?: string; 
  description?: string; 
}) {
  return (
    <div className={cn('mb-6')}>
      {title && (
        <div className={cn('mb-4')}>
          <h4 className={cn('text-md font-medium text-gray-800')}>{title}</h4>
          {description && (
            <p className={cn('text-sm text-gray-600 mt-1')}>{description}</p>
          )}
        </div>
      )}
      <div className={cn('space-y-4')}>
        {children}
      </div>
    </div>
  );
}

export function FlexLayout({ 
  children, 
  direction = 'row',
  gap = 'md',
  align = 'start',
  justify = 'start'
}: {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
}) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={cn(
      'flex',
      directionClasses[direction],
      gapClasses[gap],
      alignClasses[align],
      justifyClasses[justify]
    )}>
      {children}
    </div>
  );
} 