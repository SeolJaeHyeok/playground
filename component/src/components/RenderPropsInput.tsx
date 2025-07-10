import React, { useState, useCallback } from 'react';

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface InputState {
  value: string;
  touched: boolean;
  validation: ValidationResult;
}

interface RenderPropsInputProps {
  initialValue?: string;
  validator?: (value: string) => ValidationResult;
  children: (state: InputState, handlers: {
    onChange: (value: string) => void;
    onBlur: () => void;
    reset: () => void;
  }) => React.ReactNode;
}

// Render Props 패턴: 상태 관리와 validation 로직을 캡슐화
export default function RenderPropsInput({ 
  initialValue = '', 
  validator,
  children 
}: RenderPropsInputProps) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const validation = validator ? validator(value) : { isValid: true };

  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const onBlur = useCallback(() => {
    setTouched(true);
  }, []);

  const reset = useCallback(() => {
    setValue(initialValue);
    setTouched(false);
  }, [initialValue]);

  const state: InputState = {
    value,
    touched,
    validation
  };

  const handlers = {
    onChange,
    onBlur,
    reset
  };

  return <>{children(state, handlers)}</>;
}

// 사용 예시를 위한 기본 Input 렌더러
interface BasicInputRendererProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export function BasicInputRenderer({ label, placeholder, type = 'text' }: BasicInputRendererProps) {
  return (
    <RenderPropsInput
      validator={(value) => {
        if (!value.trim()) {
          return { isValid: false, errorMessage: '필수 입력 항목입니다.' };
        }
        if (type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          return { isValid: false, errorMessage: '올바른 이메일 형식이 아닙니다.' };
        }
        return { isValid: true };
      }}
    >
      {(state, handlers) => (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <input
            type={type}
            value={state.value}
            onChange={(e) => handlers.onChange(e.target.value)}
            onBlur={handlers.onBlur}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              state.touched && !state.validation.isValid
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200'
            }`}
          />
          {state.touched && !state.validation.isValid && (
            <p className="mt-1 text-sm text-red-600">
              {state.validation.errorMessage}
            </p>
          )}
          <div className="mt-2">
            <button
              type="button"
              onClick={handlers.reset}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              초기화
            </button>
          </div>
        </div>
      )}
    </RenderPropsInput>
  );
} 