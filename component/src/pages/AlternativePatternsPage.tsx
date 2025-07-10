import { useState } from 'react';
import { CompoundInput, SimpleInput, CompoundButton, SimpleButton } from '../components';
import { cn } from '../utils';

export default function AlternativePatternsPage() {
  const [formData, setFormData] = useState({
    compoundEmail: '',
    simpleEmail: '',
    compoundPassword: '',
    simplePassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (type: string) => {
    setLoading(true);
    console.log(`${type} form submitted:`, formData);
    
    setTimeout(() => {
      setLoading(false);
      alert(`${type} 폼이 제출되었습니다!`);
    }, 1500);
  };

  // 아이콘들
  const EmailIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const SendIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const SaveIcon = () => (
    <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
  );

  return (
    <div className={cn('p-8')}>
      <div className={cn('max-w-6xl mx-auto')}>
        <h1 className={cn('text-3xl font-bold text-gray-900 mb-2')}>대안적 컴포넌트 패턴</h1>
        <p className={cn('text-lg text-gray-600 mb-8')}>
          기존 구조의 문제점을 해결하는 다른 패턴들을 비교해보세요.
        </p>

        {/* 패턴 비교 테이블 */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>패턴 비교</h2>
          <div className={cn('overflow-x-auto')}>
            <table className={cn('w-full border-collapse border border-gray-300')}>
              <thead className={cn('bg-gray-50')}>
                <tr>
                  <th className={cn('border border-gray-300 px-4 py-3 text-left')}>특징</th>
                  <th className={cn('border border-gray-300 px-4 py-3 text-left')}>기존 구조</th>
                  <th className={cn('border border-gray-300 px-4 py-3 text-left')}>컴파운드 패턴</th>
                  <th className={cn('border border-gray-300 px-4 py-3 text-left')}>단일 통합 패턴</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cn('border border-gray-300 px-4 py-3 font-medium')}>코드량</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-red-600')}>높음</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-yellow-600')}>중간</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-green-600')}>낮음</td>
                </tr>
                <tr className={cn('bg-gray-50')}>
                  <td className={cn('border border-gray-300 px-4 py-3 font-medium')}>학습 곡선</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-red-600')}>어려움</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-yellow-600')}>보통</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-green-600')}>쉬움</td>
                </tr>
                <tr>
                  <td className={cn('border border-gray-300 px-4 py-3 font-medium')}>유연성</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-yellow-600')}>보통</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-green-600')}>높음</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-yellow-600')}>보통</td>
                </tr>
                <tr className={cn('bg-gray-50')}>
                  <td className={cn('border border-gray-300 px-4 py-3 font-medium')}>사용성</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-red-600')}>복잡함</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-yellow-600')}>보통</td>
                  <td className={cn('border border-gray-300 px-4 py-3 text-green-600')}>간단함</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
          {/* 컴파운드 패턴 */}
          <section className={cn('bg-white p-6 rounded-lg shadow-sm border')}>
            <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>
              컴파운드 패턴 (Compound Components)
            </h2>
            <p className={cn('text-gray-600 mb-6')}>
              Context를 사용해 더 유연하고 조합 가능한 구조
            </p>

            {/* 코드 예시 */}
            <div className={cn('bg-gray-900 text-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto')}>
              <pre>{`<CompoundInput.Root error={hasError}>
  <CompoundInput.Label required>
    이메일
  </CompoundInput.Label>
  <CompoundInput.Field 
    placeholder="email@example.com"
    value={email}
    onChange={handleChange}
  />
  <CompoundInput.Error>
    에러 메시지
  </CompoundInput.Error>
  <CompoundInput.Helper>
    도움말 텍스트
  </CompoundInput.Helper>
</CompoundInput.Root>`}</pre>
            </div>

            {/* 실제 예시 */}
            <div className={cn('space-y-4')}>
              <CompoundInput.Root error={!!errors.compoundEmail} size="md">
                <CompoundInput.Label required>이메일</CompoundInput.Label>
                <CompoundInput.Field
                  type="email"
                  placeholder="example@email.com"
                  value={formData.compoundEmail}
                  onChange={handleInputChange('compoundEmail')}
                />
                <CompoundInput.Error>{errors.compoundEmail}</CompoundInput.Error>
                <CompoundInput.Helper>컴파운드 패턴 이메일 입력</CompoundInput.Helper>
              </CompoundInput.Root>

              <CompoundInput.Root error={!!errors.compoundPassword} size="md">
                <CompoundInput.Label required>비밀번호</CompoundInput.Label>
                <CompoundInput.Field
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.compoundPassword}
                  onChange={handleInputChange('compoundPassword')}
                />
                <CompoundInput.Error>{errors.compoundPassword}</CompoundInput.Error>
                <CompoundInput.Helper>8자 이상 입력해주세요</CompoundInput.Helper>
              </CompoundInput.Root>

              <div className={cn('flex gap-2')}>
                <CompoundButton.Root 
                  onClick={() => handleSubmit('컴파운드')}
                  disabled={loading}
                  loading={loading}
                  variant="primary"
                >
                  <CompoundButton.Loading />
                  <CompoundButton.Icon><SendIcon /></CompoundButton.Icon>
                  <CompoundButton.Text>제출</CompoundButton.Text>
                </CompoundButton.Root>

                <CompoundButton.Root variant="outline">
                  <CompoundButton.Icon><SaveIcon /></CompoundButton.Icon>
                  <CompoundButton.Text>저장</CompoundButton.Text>
                </CompoundButton.Root>
              </div>
            </div>

            {/* 장단점 */}
            <div className={cn('mt-6 pt-4 border-t')}>
              <h3 className={cn('font-medium text-green-600 mb-2')}>장점</h3>
              <ul className={cn('text-sm text-gray-600 space-y-1 mb-4')}>
                <li>• 매우 유연한 구조</li>
                <li>• 필요한 부분만 렌더링 가능</li>
                <li>• 확장성 우수</li>
                <li>• 접근성 자동 처리</li>
              </ul>
              <h3 className={cn('font-medium text-red-600 mb-2')}>단점</h3>
              <ul className={cn('text-sm text-gray-600 space-y-1')}>
                <li>• Context 오버헤드</li>
                <li>• 다소 복잡한 API</li>
                <li>• 더 많은 JSX 코드</li>
              </ul>
            </div>
          </section>

          {/* 단일 통합 패턴 */}
          <section className={cn('bg-white p-6 rounded-lg shadow-sm border')}>
            <h2 className={cn('text-xl font-semibold text-gray-800 mb-4')}>
              단일 통합 패턴 (All-in-One)
            </h2>
            <p className={cn('text-gray-600 mb-6')}>
              모든 기능을 하나의 컴포넌트에 통합한 간단한 구조
            </p>

            {/* 코드 예시 */}
            <div className={cn('bg-gray-900 text-gray-100 p-4 rounded text-sm mb-6 overflow-x-auto')}>
              <pre>{`<SimpleInput
  label="이메일"
  placeholder="email@example.com"
  leftIcon={<EmailIcon />}
  value={email}
  onChange={handleChange}
  error={hasError}
  errorMessage="에러 메시지"
  helperText="도움말 텍스트"
  required
/>`}</pre>
            </div>

            {/* 실제 예시 */}
            <div className={cn('space-y-4')}>
              <SimpleInput
                label="이메일"
                type="email"
                placeholder="example@email.com"
                leftIcon={<EmailIcon />}
                value={formData.simpleEmail}
                onChange={handleInputChange('simpleEmail')}
                error={!!errors.simpleEmail}
                errorMessage={errors.simpleEmail}
                helperText="단일 통합 패턴 이메일 입력"
                required
                size="md"
              />

              <SimpleInput
                label="비밀번호"
                type="password"
                placeholder="비밀번호를 입력하세요"
                leftIcon={<LockIcon />}
                value={formData.simplePassword}
                onChange={handleInputChange('simplePassword')}
                error={!!errors.simplePassword}
                errorMessage={errors.simplePassword}
                helperText="8자 이상 입력해주세요"
                required
                size="md"
              />

              <div className={cn('flex gap-2')}>
                <SimpleButton
                  onClick={() => handleSubmit('단일 통합')}
                  loading={loading}
                  loadingText="제출 중..."
                  leftIcon={!loading ? <SendIcon /> : undefined}
                  variant="primary"
                >
                  제출
                </SimpleButton>

                <SimpleButton
                  leftIcon={<SaveIcon />}
                  variant="outline"
                >
                  저장
                </SimpleButton>
              </div>
            </div>

            {/* 장단점 */}
            <div className={cn('mt-6 pt-4 border-t')}>
              <h3 className={cn('font-medium text-green-600 mb-2')}>장점</h3>
              <ul className={cn('text-sm text-gray-600 space-y-1 mb-4')}>
                <li>• 매우 간단한 API</li>
                <li>• 적은 코드량</li>
                <li>• 빠른 개발 속도</li>
                <li>• 낮은 학습 곡선</li>
              </ul>
              <h3 className={cn('font-medium text-red-600 mb-2')}>단점</h3>
              <ul className={cn('text-sm text-gray-600 space-y-1')}>
                <li>• 제한된 유연성</li>
                <li>• 많은 props</li>
                <li>• 커스터마이징 어려움</li>
              </ul>
            </div>
          </section>
        </div>

        {/* 크기 변형 예시 */}
        <section className={cn('mt-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>크기 변형 비교</h2>
          
          <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
            <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
              <h3 className={cn('text-lg font-medium mb-4')}>컴파운드 패턴</h3>
              <div className={cn('space-y-4')}>
                <CompoundInput.Root size="sm">
                  <CompoundInput.Label>Small</CompoundInput.Label>
                  <CompoundInput.Field placeholder="Small input" />
                </CompoundInput.Root>
                
                <CompoundInput.Root size="md">
                  <CompoundInput.Label>Medium</CompoundInput.Label>
                  <CompoundInput.Field placeholder="Medium input" />
                </CompoundInput.Root>
                
                <CompoundInput.Root size="lg">
                  <CompoundInput.Label>Large</CompoundInput.Label>
                  <CompoundInput.Field placeholder="Large input" />
                </CompoundInput.Root>
              </div>
            </div>

            <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
              <h3 className={cn('text-lg font-medium mb-4')}>단일 통합 패턴</h3>
              <div className={cn('space-y-4')}>
                <SimpleInput
                  label="Small"
                  placeholder="Small input"
                  size="sm"
                />
                
                <SimpleInput
                  label="Medium"
                  placeholder="Medium input"
                  size="md"
                />
                
                <SimpleInput
                  label="Large"
                  placeholder="Large input"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 결론 */}
        <section className={cn('mt-12 bg-blue-50 p-6 rounded-lg')}>
          <h2 className={cn('text-xl font-semibold text-blue-900 mb-4')}>권장사항</h2>
          <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 text-sm')}>
            <div>
              <h3 className={cn('font-medium text-blue-800 mb-2')}>컴파운드 패턴이 적합한 경우:</h3>
              <ul className={cn('text-blue-700 space-y-1')}>
                <li>• 복잡한 디자인 시스템 구축</li>
                <li>• 높은 유연성이 필요한 경우</li>
                <li>• 다양한 조합이 예상되는 경우</li>
                <li>• 팀이 React에 숙련된 경우</li>
              </ul>
            </div>
            <div>
              <h3 className={cn('font-medium text-blue-800 mb-2')}>단일 통합 패턴이 적합한 경우:</h3>
              <ul className={cn('text-blue-700 space-y-1')}>
                <li>• 빠른 프로토타이핑</li>
                <li>• 간단한 폼 위주 애플리케이션</li>
                <li>• 초급 개발자가 많은 팀</li>
                <li>• 일관된 UI가 중요한 경우</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 