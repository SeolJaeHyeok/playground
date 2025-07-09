import { Label } from '../components';

export default function LabelPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Label Component</h1>
        <p className="text-lg text-gray-600 mb-8">
          폼 필드를 위한 레이블 컴포넌트의 다양한 사용법을 살펴보세요.
        </p>

        {/* Basic Examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">기본 사용법</h2>
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <Label htmlFor="basic">기본 레이블</Label>
              <input id="basic" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <Label htmlFor="required" required>필수 필드 레이블</Label>
              <input id="required" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">크기 변형</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <Label size="small" htmlFor="small">Small 레이블</Label>
              <input id="small" className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md" />
            </div>
            <div>
              <Label size="medium" htmlFor="medium">Medium 레이블</Label>
              <input id="medium" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <Label size="large" htmlFor="large">Large 레이블</Label>
              <input id="large" className="mt-1 block w-full px-4 py-3 text-lg border border-gray-300 rounded-md" />
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">에러 상태</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <Label htmlFor="error" error>에러가 있는 레이블</Label>
              <input id="error" className="mt-1 block w-full px-3 py-2 border border-red-500 rounded-md" />
            </div>
            
            <div>
              <Label htmlFor="error-required" error required>에러가 있는 필수 레이블</Label>
              <input id="error-required" className="mt-1 block w-full px-3 py-2 border border-red-500 rounded-md" />
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">코드 예시</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { Label } from './components';

// 기본 사용법
<Label htmlFor="username">사용자명</Label>

// 필수 필드
<Label htmlFor="email" required>이메일</Label>

// 크기 변형
<Label size="small" htmlFor="small">Small</Label>
<Label size="medium" htmlFor="medium">Medium</Label>
<Label size="large" htmlFor="large">Large</Label>

// 에러 상태
<Label htmlFor="password" error>비밀번호</Label>

// 조합 사용
<Label 
  htmlFor="confirm" 
  required 
  error 
  size="large"
>
  비밀번호 확인
</Label>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 