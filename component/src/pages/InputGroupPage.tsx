import { useState } from 'react';
import { Button, InputGroup, LoadingSpinner } from '../components';
import { cn } from '../utils';

export default function InputGroupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    search: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // 에러 상태 초기화
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // 간단한 유효성 검사 시뮬레이션
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
    if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setTimeout(() => {
      setLoading(false);
      setErrors(newErrors);
    }, 1000);
  };

  // 아이콘 컴포넌트들
  const EmailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  return (
    <div className={cn('p-8')}>
      <div className={cn('max-w-4xl mx-auto')}>
        <h1 className={cn('text-3xl font-bold text-gray-900 mb-2')}>InputGroup Component</h1>
        <p className={cn('text-lg text-gray-600 mb-8')}>
          레이블, 입력 필드, 에러 메시지, 도움말을 포함한 완전한 입력 그룹 컴포넌트를 살펴보세요.
        </p>

        {/* Basic Examples */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>기본 예시</h2>
          <div className={cn('space-y-6 bg-white p-6 rounded-lg shadow-sm')}>
            <InputGroup
              label="이메일"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              helperText="이메일 주소를 입력하세요"
            />
            
            <InputGroup
              label="필수 입력"
              placeholder="필수 필드입니다"
              required
              helperText="이 필드는 필수입니다"
            />
            
            <InputGroup
              label="에러 상태"
              placeholder="잘못된 값"
              error
              errorMessage="올바른 형식으로 입력해주세요"
            />
          </div>
        </section>

        {/* Size Variants */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>크기 변형</h2>
          <div className={cn('space-y-6 bg-white p-6 rounded-lg shadow-sm')}>
            <InputGroup
              label="Small Size"
              placeholder="Small input"
              size="small"
              helperText="작은 크기의 입력 필드"
            />
            
            <InputGroup
              label="Medium Size"
              placeholder="Medium input"
              size="medium"
              helperText="중간 크기의 입력 필드"
            />
            
            <InputGroup
              label="Large Size"
              placeholder="Large input"
              size="large"
              helperText="큰 크기의 입력 필드"
            />
          </div>
        </section>

        {/* Variant Styles */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>스타일 변형</h2>
          <div className={cn('space-y-6 bg-white p-6 rounded-lg shadow-sm')}>
            <InputGroup
              label="Outlined (기본)"
              placeholder="Outlined input"
              variant="outlined"
              helperText="테두리가 있는 스타일"
            />
            
            <InputGroup
              label="Filled"
              placeholder="Filled input"
              variant="filled"
              helperText="배경이 채워진 스타일"
            />
          </div>
        </section>

        {/* With Icons */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>아이콘 포함</h2>
          <div className={cn('space-y-6 bg-white p-6 rounded-lg shadow-sm')}>
            <InputGroup
              label="이메일"
              placeholder="example@email.com"
              prefixIcon={<EmailIcon />}
              helperText="이메일 주소를 입력하세요"
            />
            
            <InputGroup
              label="검색"
              placeholder="검색어를 입력하세요"
              prefixIcon={<SearchIcon />}
              value={formData.search}
              onChange={handleInputChange('search')}
            />
            
            <InputGroup
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              prefixIcon={<LockIcon />}
              suffixIcon={<EyeIcon />}
              helperText="8자 이상의 비밀번호를 입력하세요"
            />
            <InputGroup
              label="로딩"
              prefixIcon={<SearchIcon />}
              placeholder="로딩 중..."
              loading
              helperText="로딩 중..."
            />
          </div>
        </section>

        {/* Full Width */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>전체 너비</h2>
          <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
            <InputGroup
              label="전체 너비 입력 필드"
              placeholder="부모 컨테이너의 전체 너비를 사용합니다"
              fullWidth
              helperText="fullWidth 속성을 사용하면 부모 요소의 전체 너비를 사용합니다"
            />
          </div>
        </section>

        {/* Form Example */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>폼 예시</h2>
          <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
            <form className={cn('space-y-6')}>
              <InputGroup
                label="이메일"
                type="email"
                placeholder="example@email.com"
                prefixIcon={<EmailIcon />}
                suffixIcon={<EyeIcon />}
                value={formData.email}
                onChange={handleInputChange('email')}
                error={!!errors.email}
                errorMessage={errors.email}
                required
                fullWidth
              />
              
              <InputGroup
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                prefixIcon={<LockIcon />}
                value={formData.password}
                onChange={handleInputChange('password')}
                error={!!errors.password}
                errorMessage={errors.password}
                required
                fullWidth
                helperText="8자 이상의 비밀번호를 입력하세요"
              />
              
              <InputGroup
                label="비밀번호 확인"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                prefixIcon={<LockIcon />}
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                required
                fullWidth
              />
              
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <LoadingSpinner /> : '제출'}
              </Button>
            </form>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>코드 예시</h2>
          <div className={cn('bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto')}>
            <pre className={cn('text-sm')}>
{`import { InputGroup } from './components';

// 기본 사용법
<InputGroup
  label="이메일"
  placeholder="example@email.com"
  helperText="이메일 주소를 입력하세요"
/>

// 에러 상태
<InputGroup
  label="이메일"
  placeholder="example@email.com"
  error
  errorMessage="올바른 이메일 형식이 아닙니다"
/>

// 아이콘 포함
<InputGroup
  label="검색"
  placeholder="검색어를 입력하세요"
  prefixIcon={<SearchIcon />}
  suffixIcon={<FilterIcon />}
/>

// 크기와 스타일 변형
<InputGroup
  label="입력 필드"
  placeholder="내용을 입력하세요"
  size="large"
  variant="filled"
  fullWidth
/>

// 로딩 상태
<InputGroup
  label="처리 중"
  placeholder="잠시만 기다려주세요"
  loading
  helperText="데이터를 처리하고 있습니다"
/>

// 필수 입력
<InputGroup
  label="필수 필드"
  placeholder="필수 입력 사항"
  required
  helperText="이 필드는 반드시 입력해야 합니다"
/>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 