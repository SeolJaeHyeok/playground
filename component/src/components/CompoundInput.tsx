import { 
  createContext, 
  useContext, 
  forwardRef, 
  useId,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type HTMLAttributes,
  type ReactNode 
} from 'react';
import { cn } from '../utils';

// Context 타입 정의
interface InputContextValue {
  id: string;
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Context 생성
const InputContext = createContext<InputContextValue | null>(null);

// Hook for consuming context
const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('Input compound components must be used within Input.Root');
  }
  return context;
};

// Root 컴포넌트 Props
interface RootProps {
  children: ReactNode;
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Root 컴포넌트
const Root = ({ children, error, disabled, size = 'md', className }: RootProps) => {
  const id = useId();
  
  return (
    <InputContext.Provider value={{ id, error, disabled, size }}>
      <div className={cn('space-y-1', className)}>
        {children}
      </div>
    </InputContext.Provider>
  );
};

// Label 컴포넌트
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, className, ...props }, ref) => {
    const { id, error, size = 'md' } = useInputContext();
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm', 
      lg: 'text-base'
    };
    
    return (
      <label
        ref={ref}
        htmlFor={id}
        className={cn(
          'block font-medium',
          error ? 'text-red-600' : 'text-gray-700',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

// Field 컴포넌트 
interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'outlined' | 'filled';
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ variant = 'outlined', className, ...props }, ref) => {
    const { id, error, disabled, size = 'md' } = useInputContext();
    
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg'
    };
    
    const variantClasses = {
      outlined: 'border border-gray-300 bg-white',
      filled: 'border-0 bg-gray-100'
    };
    
    return (
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        className={cn(
          'w-full rounded-md transition-all duration-200 outline-none',
          sizeClasses[size],
          variantClasses[variant],
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
            : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

// Error 컴포넌트
interface ErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

const Error = forwardRef<HTMLParagraphElement, ErrorProps>(
  ({ children, className, ...props }, ref) => {
    const { size = 'md' } = useInputContext();
    
    if (!children) return null;
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    
    return (
      <p
        ref={ref}
        className={cn('text-red-600', sizeClasses[size], className)}
        role="alert"
        {...props}
      >
        {children}
      </p>
    );
  }
);

// Helper 컴포넌트
interface HelperProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

const Helper = forwardRef<HTMLParagraphElement, HelperProps>(
  ({ children, className, ...props }, ref) => {
    const { size = 'md' } = useInputContext();
    
    if (!children) return null;
    
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm', 
      lg: 'text-base'
    };
    
    return (
      <p
        ref={ref}
        className={cn('text-gray-500', sizeClasses[size], className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);

// displayName 설정
Root.displayName = 'CompoundInput.Root';
Label.displayName = 'CompoundInput.Label';
Field.displayName = 'CompoundInput.Field';
Error.displayName = 'CompoundInput.Error';
Helper.displayName = 'CompoundInput.Helper';

// 컴포넌트들을 하나로 합치기
const CompoundInput = {
  Root,
  Label,
  Field, 
  Error,
  Helper
};

export default CompoundInput; 