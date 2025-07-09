import { useState } from 'react';
import './App.css';
import { 
  Input, 
  Label, 
  ErrorMessage, 
  HelperText, 
  LoadingSpinner, 
  InputGroup,
  Button,
  ButtonGroup,
  Text,
  TextGroup
} from './components';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const handleButtonClick = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Atomic Design Components</h1>
      
      {/* Text 컴포넌트 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Text Components</h2>
        
        {/* Text Atoms - 개별 사용 */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Text Atoms - 개별 사용</h3>
          
          <div className="space-y-6">
            {/* HTML 요소 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">HTML 요소 변형</h4>
              <div className="space-y-2">
                <Text as="h1" size="3xl" weight="bold">h1 - 메인 제목</Text>
                <Text as="h2" size="2xl" weight="semibold">h2 - 부제목</Text>
                <Text as="h3" size="xl" weight="medium">h3 - 소제목</Text>
                <Text as="p">p - 일반 문단 텍스트입니다.</Text>
                <Text as="span" color="secondary">span - 인라인 텍스트입니다.</Text>
                <Text as="strong" weight="bold">strong - 강조 텍스트</Text>
                <Text as="em" decoration="underline">em - 기울임 텍스트</Text>
                <Text as="small" size="sm" color="muted">small - 작은 텍스트</Text>
              </div>
            </div>

            {/* 크기 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">크기 변형</h4>
              <div className="space-y-1">
                <Text size="xs">XS - 매우 작은 텍스트</Text>
                <Text size="sm">SM - 작은 텍스트</Text>
                <Text size="base">Base - 기본 크기 텍스트</Text>
                <Text size="lg">LG - 큰 텍스트</Text>
                <Text size="xl">XL - 더 큰 텍스트</Text>
                <Text size="2xl">2XL - 매우 큰 텍스트</Text>
                <Text size="3xl">3XL - 거대한 텍스트</Text>
                <Text size="4xl">4XL - 초거대 텍스트</Text>
              </div>
            </div>

            {/* 굵기 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">굵기 변형</h4>
              <div className="space-y-1">
                <Text weight="thin">Thin - 매우 얇은 텍스트</Text>
                <Text weight="light">Light - 얇은 텍스트</Text>
                <Text weight="normal">Normal - 보통 텍스트</Text>
                <Text weight="medium">Medium - 중간 굵기 텍스트</Text>
                <Text weight="semibold">Semibold - 약간 굵은 텍스트</Text>
                <Text weight="bold">Bold - 굵은 텍스트</Text>
                <Text weight="extrabold">Extrabold - 매우 굵은 텍스트</Text>
              </div>
            </div>

            {/* 색상 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">색상 변형</h4>
              <div className="space-y-1">
                <Text color="primary">Primary - 기본 색상</Text>
                <Text color="secondary">Secondary - 보조 색상</Text>
                <Text color="muted">Muted - 흐릿한 색상</Text>
                <Text color="danger">Danger - 위험 색상</Text>
                <Text color="success">Success - 성공 색상</Text>
                <Text color="warning">Warning - 경고 색상</Text>
                <Text color="info">Info - 정보 색상</Text>
              </div>
            </div>

            {/* 정렬 및 스타일 */}
            <div>
              <h4 className="text-lg font-medium mb-2">정렬 및 스타일</h4>
              <div className="space-y-2">
                <Text align="left">왼쪽 정렬 텍스트</Text>
                <Text align="center">가운데 정렬 텍스트</Text>
                <Text align="right">오른쪽 정렬 텍스트</Text>
                <Text decoration="underline">밑줄 텍스트</Text>
                <Text decoration="line-through">취소선 텍스트</Text>
                <Text transform="uppercase">대문자 변환</Text>
                <Text transform="capitalize">첫글자 대문자</Text>
                <Text truncate className="w-48">
                  이것은 매우 긴 텍스트입니다. 이 텍스트는 truncate 속성에 의해 잘릴 것입니다.
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* TextGroup Molecules - 조합 사용 */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">TextGroup Molecules - 조합 사용</h3>
          
          <div className="space-y-6">
            {/* 기본 제목-설명 조합 */}
            <div>
              <h4 className="text-lg font-medium mb-2">제목-설명 조합</h4>
              <div className="space-y-4">
                <TextGroup
                  title="사용자 프로필"
                  description="개인정보와 계정 설정을 관리할 수 있습니다."
                />
                
                <TextGroup
                  title="알림 설정"
                  titleSize="base"
                  titleWeight="medium"
                  description="앱 알림과 이메일 알림을 설정하세요."
                  descriptionColor="muted"
                />
              </div>
            </div>

            {/* 다양한 HTML 요소 조합 */}
            <div>
              <h4 className="text-lg font-medium mb-2">다양한 HTML 요소</h4>
              <div className="space-y-4">
                <TextGroup
                  title="메인 섹션"
                  titleAs="h1"
                  titleSize="2xl"
                  description="이것은 h1 요소로 렌더링된 제목입니다."
                />
                
                <TextGroup
                  title="서브 섹션"
                  titleAs="h2"
                  titleSize="xl"
                  titleColor="secondary"
                  description="이것은 h2 요소로 렌더링된 제목입니다."
                />
              </div>
            </div>

            {/* 방향 및 정렬 */}
            <div>
              <h4 className="text-lg font-medium mb-2">방향 및 정렬</h4>
              <div className="space-y-4">
                <TextGroup
                  title="수직 정렬 (기본)"
                  description="제목과 설명이 세로로 배치됩니다."
                  direction="vertical"
                />
                
                <TextGroup
                  title="수평 정렬"
                  description="제목과 설명이 가로로 배치됩니다."
                  direction="horizontal"
                  spacing="relaxed"
                />
                
                <TextGroup
                  title="가운데 정렬"
                  description="모든 텍스트가 가운데 정렬됩니다."
                  align="center"
                />
              </div>
            </div>

            {/* 상태별 스타일 */}
            <div>
              <h4 className="text-lg font-medium mb-2">상태별 스타일</h4>
              <div className="space-y-4">
                <TextGroup
                  title="성공 상태"
                  titleColor="success"
                  description="작업이 성공적으로 완료되었습니다."
                  descriptionColor="success"
                />
                
                <TextGroup
                  title="오류 상태"
                  titleColor="danger"
                  description="오류가 발생했습니다. 다시 시도해주세요."
                  descriptionColor="danger"
                />
                
                <TextGroup
                  title="경고 상태"
                  titleColor="warning"
                  description="주의가 필요한 상황입니다."
                  descriptionColor="warning"
                />
              </div>
            </div>

            {/* 커스텀 콘텐츠 */}
            <div>
              <h4 className="text-lg font-medium mb-2">커스텀 콘텐츠</h4>
              <TextGroup
                title="고급 설정"
                description="추가 옵션을 설정할 수 있습니다."
              >
                <Text size="sm" color="muted" className="mt-2">
                  마지막 업데이트: 2024년 1월 15일
                </Text>
                <div className="mt-3 flex gap-2">
                  <Button size="small" variant="outline">편집</Button>
                  <Button size="small" variant="ghost">삭제</Button>
                </div>
              </TextGroup>
            </div>
          </div>
        </div>
      </section>

      {/* Button 컴포넌트 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Button Components</h2>
        
        {/* Button Atoms - 개별 사용 */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Button Atoms - 개별 사용</h3>
          
          <div className="space-y-6">
            {/* 크기 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">크기 변형</h4>
              <div className="flex items-center space-x-4">
                <Button size="small">Small Button</Button>
                <Button size="medium">Medium Button</Button>
                <Button size="large">Large Button</Button>
              </div>
            </div>

            {/* 스타일 변형 */}
            <div>
              <h4 className="text-lg font-medium mb-2">스타일 변형</h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </div>

            {/* 상태 */}
            <div>
              <h4 className="text-lg font-medium mb-2">상태</h4>
              <div className="flex items-center space-x-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        </div>

        {/* ButtonGroup Molecules - 조합 사용 */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">ButtonGroup Molecules - 조합 사용</h3>
          
          <div className="space-y-6">
            {/* 아이콘 포함 버튼 */}
            <div>
              <h4 className="text-lg font-medium mb-2">아이콘 포함</h4>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup
                  prefixIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                >
                  Add Item
                </ButtonGroup>
                
                <ButtonGroup
                  suffixIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  }
                  variant="outline"
                >
                  Next
                </ButtonGroup>
              </div>
            </div>

            {/* 로딩 상태 */}
            <div>
              <h4 className="text-lg font-medium mb-2">로딩 상태</h4>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup
                  loading={buttonLoading}
                  loadingText="Processing..."
                  onClick={handleButtonClick}
                >
                  Click to Load
                </ButtonGroup>
                
                <ButtonGroup
                  loading={buttonLoading}
                  variant="outline"
                  prefixIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  }
                >
                  {buttonLoading ? 'Uploading...' : 'Upload'}
                </ButtonGroup>
              </div>
            </div>

            {/* 다양한 조합 */}
            <div>
              <h4 className="text-lg font-medium mb-2">다양한 조합</h4>
              <div className="flex flex-wrap gap-4">
                <ButtonGroup
                  variant="danger"
                  prefixIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  }
                  size="small"
                >
                  Delete
                </ButtonGroup>
                
                <ButtonGroup
                  variant="success"
                  suffixIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                  size="large"
                >
                  Complete
                </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Input 컴포넌트 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Input Components</h2>
        
        {/* Atom 컴포넌트들을 개별적으로 사용하는 예시 */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Input Atoms - 개별 사용</h3>
          
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
        </div>

        {/* InputGroup molecule을 사용하는 예시 */}
        <div>
          <h3 className="text-xl font-medium mb-4">InputGroup Molecules - 조합 사용</h3>
          
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

            <div className="flex space-x-4">
              <ButtonGroup
                type="submit"
                loading={isLoading}
                loadingText="로그인 중..."
                prefixIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                }
              >
                로그인
              </ButtonGroup>
              
              <ButtonGroup
                type="button"
                variant="outline"
                onClick={() => {
                  setEmail('');
                  setPassword('');
                  setHasError(false);
                }}
                prefixIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              >
                초기화
              </ButtonGroup>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
