import { Link } from 'react-router-dom';
import { cn } from '../utils';

export default function Home() {
  const atomicComponents = [
    { name: 'Input', path: '/input', description: '기본 입력 필드 컴포넌트' },
    { name: 'Label', path: '/label', description: '레이블 컴포넌트' },
    { name: 'Button', path: '/button', description: '버튼 컴포넌트' },
    { name: 'Text', path: '/text', description: '텍스트 컴포넌트' },
  ];

  const moleculeComponents = [
    { name: 'InputGroup', path: '/input-group', description: '입력 필드 그룹 컴포넌트' },
  ];

  return (
    <div className={cn('min-h-screen bg-gray-50 p-8')}>
      <div className={cn('max-w-4xl mx-auto')}>
        <h1 className={cn('text-4xl font-bold text-gray-900 mb-2')}>
          Atomic Design Components
        </h1>
        <p className={cn('text-lg text-gray-600 mb-12')}>
          React와 TypeScript로 구현한 Atomic Design Pattern 컴포넌트들을 살펴보세요.
        </p>

        {/* Atoms Section */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            Atoms (원자)
          </h2>
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')}>
            {atomicComponents.map((component) => (
              <Link
                key={component.name}
                to={component.path}
                className={cn('block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300')}
              >
                <h3 className={cn('text-lg font-semibold text-gray-900 mb-2')}>
                  {component.name}
                </h3>
                <p className={cn('text-gray-600 text-sm')}>
                  {component.description}
                </p>
                <div className={cn('mt-4 text-blue-600 text-sm font-medium')}>
                  살펴보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Molecules Section */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            Molecules (분자)
          </h2>
          <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6')}>
            {moleculeComponents.map((component) => (
              <Link
                key={component.name}
                to={component.path}
                className={cn('block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-green-300')}
              >
                <h3 className={cn('text-lg font-semibold text-gray-900 mb-2')}>
                  {component.name}
                </h3>
                <p className={cn('text-gray-600 text-sm')}>
                  {component.description}
                </p>
                <div className={cn('mt-4 text-green-600 text-sm font-medium')}>
                  살펴보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>


        {/* Mentoring Benefits Section */}
        <section className={cn('bg-gradient-to-r from-green-50 to-yellow-50 p-8 rounded-lg border-2 border-green-200 mb-8')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-4')}>
            Atomic Design Pattern의 장점
          </h2>
          <p className={cn('text-gray-600 mb-6')}>
            왜 아토믹 디자인 패턴을 선택하는지, 실무 관점에서 알아보세요.
          </p>
          <Link
            to="/mentoring-benefits"
            className={cn('inline-flex items-center px-6 py-3 bg-green-200 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium')}>
            기존 구조의 장점 →
          </Link>
        </section>

        {/* Alternative Patterns Section */}
        <section className={cn('bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border-2 border-purple-200 mb-8')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-4')}>
            🔄 대안적 패턴들
          </h2>
          <p className={cn('text-gray-600 mb-6')}>
            기존 구조의 문제점을 해결하는 다른 패턴들을 비교해보세요.
          </p>
          <Link
            to="/alternative-patterns"
            className={cn('inline-flex items-center px-6 py-3 bg-purple-200 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium')}>
            대안적 패턴 살펴보기 →
          </Link>
        </section>

      </div>
    </div>
  );
} 