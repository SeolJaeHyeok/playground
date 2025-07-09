import { useState } from 'react';
import { Button, LoadingSpinner } from '../components';

export default function ButtonPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Button Component</h1>
        <p className="text-lg text-gray-600 mb-8">
          다양한 스타일과 상태를 가진 버튼 컴포넌트를 살펴보세요.
        </p>

        {/* Style Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">스타일 변형</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Primary</h3>
              <Button variant="primary">Primary</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Secondary</h3>
              <Button variant="secondary">Secondary</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Outline</h3>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Ghost</h3>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Danger</h3>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Success</h3>
              <Button variant="success">Success</Button>
            </div>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">크기 변형</h2>
          <div className="flex flex-wrap items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Small</h3>
              <Button size="small">Small</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Medium</h3>
              <Button size="medium">Medium</Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Large</h3>
              <Button size="large">Large</Button>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">상태</h2>
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">기본 상태</h3>
              <div className="flex gap-4">
                <Button>Normal</Button>
                <Button variant="secondary">Hover me</Button>
                <Button variant="outline">Focus me</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">비활성화</h3>
              <div className="flex gap-4">
                <Button disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="outline" disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">로딩 상태</h3>
              <div className="flex gap-4">
                <Button 
                  onClick={handleLoadingClick}
                  disabled={isLoading}
                >
                  {isLoading ? <LoadingSpinner /> : 'Click to Load'}
                </Button>
                <Button variant="secondary" disabled>
                  <LoadingSpinner />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Full Width */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">전체 너비</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Full Width Button</h3>
            <Button fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Button Types */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">버튼 타입</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form className="space-y-4">
              <div className="flex gap-4">
                <Button type="button">Button</Button>
                <Button type="submit" variant="primary">Submit</Button>
                <Button type="reset" variant="outline">Reset</Button>
              </div>
            </form>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">코드 예시</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { Button } from './components';

// 기본 사용법
<Button>기본 버튼</Button>

// 스타일 변형
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

// 크기 변형
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// 상태
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>

// 타입
<Button type="button">Button</Button>
<Button type="submit">Submit</Button>
<Button type="reset">Reset</Button>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 