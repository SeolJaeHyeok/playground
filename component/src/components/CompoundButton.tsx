import { 
  createContext, 
  useContext, 
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode 
} from 'react';
import { cn } from '../utils';

// Context 타입 정의
interface ButtonContextValue {
  size: 'sm' | 'md' | 'lg';
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
}

// Context 생성
const ButtonContext = createContext<ButtonContextValue | null>(null);

// Hook for consuming context
const useButtonContext = () => {
  const context = useContext(ButtonContext);
  if (!context) {
    throw new Error('Button compound components must be used within Button.Root');
  }
  return context;
};

// Root 컴포넌트 Props
interface RootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  loading?: boolean;
  fullWidth?: boolean;
}

// Root 컴포넌트
const Root = forwardRef<HTMLButtonElement, RootProps>(
  ({ 
    children, 
    size = 'md', 
    variant = 'primary', 
    loading = false, 
    fullWidth = false,
    disabled,
    className,
    ...props 
  }, ref) => {
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white border-gray-600 hover:bg-gray-700 focus:ring-gray-500',
      outline: 'bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-500',
      danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 focus:ring-red-500'
    };
    
    return (
      <ButtonContext.Provider value={{ size, variant, disabled: disabled || loading, loading }}>
        <button
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            'inline-flex items-center justify-center gap-2 border rounded-md font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2',
            sizeClasses[size],
            variantClasses[variant],
            fullWidth && 'w-full',
            (disabled || loading) && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        >
          {children}
        </button>
      </ButtonContext.Provider>
    );
  }
);

// Icon 컴포넌트
interface IconProps {
  children: ReactNode;
  className?: string;
}

const Icon = ({ children, className }: IconProps) => {
  const { size } = useButtonContext();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  };
  
  return (
    <span className={cn('flex-shrink-0', sizeClasses[size], className)}>
      {children}
    </span>
  );
};

// Text 컴포넌트
interface TextProps {
  children: ReactNode;
  className?: string;
}

const Text = ({ children, className }: TextProps) => {
  return (
    <span className={cn('truncate', className)}>
      {children}
    </span>
  );
};

// Loading 컴포넌트
interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  const { size, loading } = useButtonContext();
  
  if (!loading) return null;
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };
  
  return (
    <div 
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  );
};

// displayName 설정
Root.displayName = 'CompoundButton.Root';
Icon.displayName = 'CompoundButton.Icon';
Text.displayName = 'CompoundButton.Text';
Loading.displayName = 'CompoundButton.Loading';

// 컴포넌트들을 하나로 합치기
const CompoundButton = {
  Root,
  Icon,
  Text,
  Loading
};

export default CompoundButton; 