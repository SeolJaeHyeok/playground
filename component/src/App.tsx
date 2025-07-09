import { useState } from 'react';
import './App.css';
import { 
  Input, 
  Label, 
  ErrorMessage, 
  HelperText, 
  LoadingSpinner, 
  InputGroup 
} from './components';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 간단한 유효성 검사
    setTimeout(() => {
      if (!email.includes('@')) {
        setHasError(true);
      } else {
        setHasError(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Atomic Design Input Components</h1>
      
      {/* Atom 컴포넌트들을 개별적으로 사용하는 예시 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Atoms - 개별 사용</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="basic-input" required>기본 Input</Label>
            <Input 
              id="basic-input"
              placeholder="기본 input atom"
              className="w-full"
            />
            <HelperText>이것은 도움말 텍스트입니다.</HelperText>
          </div>

          <div>
            <Label htmlFor="error-input" error>에러 상태 Input</Label>
            <Input 
              id="error-input"
              error
              placeholder="에러 상태 input"
              className="w-full"
            />
            <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>
          </div>

          <div>
            <Label htmlFor="sizes">크기 변형</Label>
            <div className="space-y-2">
              <Input size="small" placeholder="Small input" className="w-full" />
              <Input size="medium" placeholder="Medium input" className="w-full" />
              <Input size="large" placeholder="Large input" className="w-full" />
            </div>
          </div>

          <div>
            <Label htmlFor="variants">스타일 변형</Label>
            <div className="space-y-2">
              <Input variant="outlined" placeholder="Outlined input" className="w-full" />
              <Input variant="filled" placeholder="Filled input" className="w-full" />
            </div>
          </div>

          <div>
            <Label>로딩 스피너</Label>
            <div className="flex items-center space-x-4">
              <LoadingSpinner size="small" />
              <LoadingSpinner size="medium" />
              <LoadingSpinner size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* InputGroup molecule을 사용하는 예시 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Molecule - 조합 사용</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputGroup
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            required
            fullWidth
            error={hasError}
            errorMessage={hasError ? "올바른 이메일 형식을 입력해주세요" : undefined}
            helperText={!hasError ? "로그인에 사용할 이메일을 입력하세요" : undefined}
            prefixIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
          />

          <InputGroup
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
            fullWidth
            helperText="8자 이상의 비밀번호를 입력하세요"
            prefixIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          <InputGroup
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
            fullWidth
            error={true}
            errorMessage="비밀번호가 일치하지 않습니다."
            prefixIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          />

          <InputGroup
            label="로딩 상태 예시"
            placeholder="로딩 중..."
            loading={isLoading}
            fullWidth
            helperText="로딩 상태를 시뮬레이션합니다"
          />

        
        </form>
      </section>
    </div>
  );
}

export default App;
