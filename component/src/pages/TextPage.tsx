import { Text } from '../components';

export default function TextPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Component</h1>
        <p className="text-lg text-gray-600 mb-8">
          다양한 HTML 요소와 스타일을 지원하는 텍스트 컴포넌트를 살펴보세요.
        </p>

        {/* HTML Elements */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">HTML 요소 변형</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <Text as="h1" size="2xl" weight="bold">h1 - 메인 제목</Text>
            <Text as="h2" size="xl" weight="semibold">h2 - 서브 제목</Text>
            <Text as="h3" size="lg" weight="medium">h3 - 섹션 제목</Text>
            <Text as="p" size="base">p - 일반 문단 텍스트입니다.</Text>
            <Text as="span" size="sm" color="muted">span - 인라인 텍스트</Text>
            <Text as="div" size="base">div - 블록 텍스트</Text>
            <Text as="small" size="xs" color="muted">small - 작은 텍스트</Text>
            <Text as="strong" weight="bold">strong - 강조 텍스트</Text>
            <Text as="em">em - 기울임꼴 텍스트</Text>
            <Text className="bg-yellow-200">mark - 하이라이트 텍스트</Text>
            <Text className="bg-gray-100 px-1 rounded font-mono">code - 코드 텍스트</Text>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">크기 변형</h2>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
            <Text size="xs">xs - 매우 작은 텍스트 (12px)</Text>
            <Text size="sm">sm - 작은 텍스트 (14px)</Text>
            <Text size="base">base - 기본 텍스트 (16px)</Text>
            <Text size="lg">lg - 큰 텍스트 (18px)</Text>
            <Text size="xl">xl - 매우 큰 텍스트 (20px)</Text>
            <Text size="2xl">2xl - 특대 텍스트 (24px)</Text>
            <Text size="3xl">3xl - 헤드라인 텍스트 (30px)</Text>
            <Text size="4xl">4xl - 대형 헤드라인 (36px)</Text>
          </div>
        </section>

        {/* Weight Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">폰트 굵기</h2>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
            <Text weight="thin">thin - 얇은 굵기 (100)</Text>
            <Text weight="light">light - 가벼운 굵기 (300)</Text>
            <Text weight="normal">normal - 기본 굵기 (400)</Text>
            <Text weight="medium">medium - 중간 굵기 (500)</Text>
            <Text weight="semibold">semibold - 반굵게 (600)</Text>
            <Text weight="bold">bold - 굵게 (700)</Text>
            <Text weight="extrabold">extrabold - 매우 굵게 (800)</Text>
          </div>
        </section>

        {/* Color Variants */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">색상 변형</h2>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
            <Text color="primary">primary - 기본 색상</Text>
            <Text color="secondary">secondary - 보조 색상</Text>
            <Text color="muted">muted - 흐린 색상</Text>
            <Text color="danger">danger - 에러 색상</Text>
            <Text color="warning">warning - 경고 색상</Text>
            <Text color="success">success - 성공 색상</Text>
            <Text color="info">info - 정보 색상</Text>
          </div>
        </section>

        {/* Alignment */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">텍스트 정렬</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <Text align="left">left - 왼쪽 정렬</Text>
            <Text align="center">center - 가운데 정렬</Text>
            <Text align="right">right - 오른쪽 정렬</Text>
            <Text align="justify">justify - 양쪽 정렬 - 이 텍스트는 양쪽 정렬을 보여주기 위한 긴 텍스트입니다. 양쪽 정렬은 텍스트가 컨테이너의 양쪽 끝에 맞춰지도록 단어 사이의 간격을 조정합니다.</Text>
          </div>
        </section>

        {/* Line Height */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">줄 높이</h2>
          <div className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <Text size="sm" color="muted">tight (1.25)</Text>
              <Text leading="tight">
                줄 높이가 좁은 텍스트입니다. 이는 여러 줄의 텍스트가 서로 가깝게 배치되는 모습을 보여줍니다.
              </Text>
            </div>
            <div>
              <Text size="sm" color="muted">normal (1.5)</Text>
              <Text leading="normal">
                줄 높이가 기본인 텍스트입니다. 이는 일반적으로 읽기 편한 줄 간격을 제공합니다.
              </Text>
            </div>
            <div>
              <Text size="sm" color="muted">relaxed (1.75)</Text>
              <Text leading="relaxed">
                줄 높이가 여유로운 텍스트입니다. 이는 더 넓은 줄 간격으로 읽기 편안함을 제공합니다.
              </Text>
            </div>
          </div>
        </section>

        {/* Text Decorations */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">텍스트 장식</h2>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
            <Text decoration="underline">underline - 밑줄</Text>
            <Text decoration="line-through">line-through - 취소선</Text>
            <Text decoration="none">none - 없음</Text>
          </div>
        </section>

        {/* Text Transform */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">텍스트 변환</h2>
          <div className="space-y-3 bg-white p-6 rounded-lg shadow-sm">
            <Text transform="uppercase">uppercase - 대문자 변환</Text>
            <Text transform="lowercase">LOWERCASE - 소문자 변환</Text>
            <Text transform="capitalize">capitalize - 첫글자 대문자</Text>
          </div>
        </section>

        {/* Combined Examples */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">조합 예시</h2>
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <Text 
              as="h2" 
              size="2xl" 
              weight="bold" 
              color="primary" 
              align="center"
            >
              메인 헤드라인
            </Text>
            
            <Text 
              as="p" 
              size="lg" 
              weight="medium" 
              color="secondary" 
              align="center" 
              leading="relaxed"
            >
              서브 헤드라인 - 부가 설명
            </Text>
            
            <Text 
              as="p" 
              size="base" 
              color="muted" 
              leading="relaxed" 
              align="justify"
            >
              본문 텍스트입니다. 이 텍스트는 다양한 속성들이 조합된 모습을 보여줍니다. 
              양쪽 정렬과 여유로운 줄 높이로 읽기 편안한 텍스트를 만들었습니다.
            </Text>
            
            <Text 
              as="small" 
              size="sm" 
              color="muted" 
              align="right" 
              decoration="none"
            >
              - 작성자명
            </Text>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">코드 예시</h2>
          <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`import { Text } from './components';

// 기본 사용법
<Text>기본 텍스트</Text>

// HTML 요소 지정
<Text as="h1">제목</Text>
<Text as="p">문단</Text>
<Text as="span">인라인</Text>

// 크기와 굵기
<Text size="lg" weight="bold">큰 굵은 텍스트</Text>

// 색상
<Text color="primary">기본 색상</Text>
<Text color="error">에러 색상</Text>

// 정렬과 줄 높이
<Text align="center" lineHeight="relaxed">가운데 정렬</Text>

// 장식과 변환
<Text decoration="underline">밑줄</Text>
<Text transform="uppercase">대문자</Text>

// 조합 사용
<Text 
  as="h2" 
  size="xl" 
  weight="semibold" 
  color="primary" 
  align="center"
>
  조합된 텍스트
</Text>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 