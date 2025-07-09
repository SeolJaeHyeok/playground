import { useState } from 'react';
import { Input } from '../components';

export default function InputPage() {
  const [inputValue, setInputValue] = useState('');
  const [errorInput, setErrorInput] = useState('');

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Input Component</h1>
        <p className="text-lg text-gray-600 mb-8">
          기본 입력 필드 컴포넌트의 다양한 변형과 상태를 살펴보세요.
        </p>

        {/* Basic Examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">기본 사용법</h2>
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">기본 Input</h3>
              <Input
                placeholder="텍스트를 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">비활성화된 Input</h3>
              <Input
                placeholder="비활성화된 입력 필드"
                disabled
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">읽기 전용 Input</h3>
              <Input
                value="읽기 전용 값"
                readOnly
              />
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">크기 변형</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
              <Input size="small" placeholder="작은 크기" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Medium (기본)</h3>
              <Input size="medium" placeholder="중간 크기" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
              <Input size="large" placeholder="큰 크기" />
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">에러 상태</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">에러가 있는 Input</h3>
              <Input
                error
                placeholder="에러 상태의 입력 필드"
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Full Width */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">전체 너비</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Full Width Input</h3>
            <Input
              fullWidth
              placeholder="전체 너비를 차지하는 입력 필드"
            />
          </div>
        </section>

        {/* Different Input Types */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">다양한 입력 타입</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">이메일</h3>
              <Input type="email" placeholder="email@example.com" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">비밀번호</h3>
              <Input type="password" placeholder="비밀번호" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">숫자</h3>
              <Input type="number" placeholder="숫자만 입력" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">전화번호</h3>
              <Input type="tel" placeholder="010-1234-5678" />
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">코드 예시</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { Input } from './components';

// 기본 사용법
<Input 
  placeholder="텍스트를 입력하세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// 크기 변형
<Input size="small" placeholder="작은 크기" />
<Input size="medium" placeholder="중간 크기" />
<Input size="large" placeholder="큰 크기" />

// 에러 상태
<Input error placeholder="에러 상태" />

// 전체 너비
<Input fullWidth placeholder="전체 너비" />

// 다양한 타입
<Input type="email" placeholder="이메일" />
<Input type="password" placeholder="비밀번호" />
<Input type="number" placeholder="숫자" />`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 