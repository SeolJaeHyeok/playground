import { Link } from 'react-router-dom';

export default function Home() {
  const atomicComponents = [
    { name: 'Input', path: '/input', description: '기본 입력 필드 컴포넌트' },
    { name: 'Label', path: '/label', description: '레이블 컴포넌트' },
    { name: 'Button', path: '/button', description: '버튼 컴포넌트' },
    { name: 'Text', path: '/text', description: '텍스트 컴포넌트' },
  ];

  const moleculeComponents = [
    { name: 'InputGroup', path: '/input-group', description: '입력 필드 그룹 컴포넌트' },
    { name: 'ButtonGroup', path: '/button-group', description: '버튼 그룹 컴포넌트' },
    { name: 'TextGroup', path: '/text-group', description: '텍스트 그룹 컴포넌트' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Atomic Design Components
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          React와 TypeScript로 구현한 Atomic Design Pattern 컴포넌트들을 살펴보세요.
        </p>

        {/* Atoms Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Atoms (원자)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atomicComponents.map((component) => (
              <Link
                key={component.name}
                to={component.path}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {component.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {component.description}
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium">
                  살펴보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Molecules Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Molecules (분자)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moleculeComponents.map((component) => (
              <Link
                key={component.name}
                to={component.path}
                className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-green-300"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {component.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {component.description}
                </p>
                <div className="mt-4 text-green-600 text-sm font-medium">
                  살펴보기 →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 