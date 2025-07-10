import { useState } from 'react';
import { Input, Label, ErrorMessage } from '../components';
import { cn } from '../utils';

export default function Advance() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className={cn('p-8')}>
      <div className={cn('max-w-6xl mx-auto')}>
        <h1 className={cn('text-3xl font-bold text-gray-900 mb-2')}>
          🎯 Atomic Design Pattern의 장점
        </h1>

        {/* 실무 관점 */}
        <section className={cn('mb-12 bg-blue-50 p-8 rounded-lg border-2 border-blue-200')}>
          <h2 className={cn('text-2xl font-semibold text-blue-900 mb-6')}>
            💼 실무에서 이 구조가 빛나는 순간들
          </h2>
          
          <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
            <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
              <h3 className={cn('text-lg font-semibold text-gray-800 mb-4')}>
                📈 대규모 프로젝트 (100+ 컴포넌트)
              </h3>
              <div className={cn('space-y-3 text-sm text-gray-600')}>
                <p>• 대규모 프로젝트에서 일관성 유지</p>
                <p>• 연간 수백 개 페이지 개발 시 표준화</p>
                <p>• 신입사원도 즉시 규칙 이해 가능</p>
                <p>• 디자인 시스템 구축 시 필수</p>
              </div>
            </div>

            <div className={cn('bg-white p-6 rounded-lg shadow-sm')}>
              <h3 className={cn('text-lg font-semibold text-gray-800 mb-4')}>
                🔄 멀티 플랫폼 개발
              </h3>
              <div className={cn('space-y-3 text-sm text-gray-600')}>
                <p>• Web, Mobile, Desktop 버전 동시 개발</p>
                <p>• React Native, Electron으로 확장</p>
                <p>• 각 플랫폼별 Label, Button 동작 통일</p>
                <p>• 디자인 토큰 기반 일관된 스타일링</p>
              </div>
            </div>
          </div>
        </section>

        {/* 디자인 시스템 관점 */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            🎨 디자인 시스템 구축의 핵심
          </h2>
          
          <div className={cn('bg-white p-6 rounded-lg shadow-sm mb-6')}>
            <h3 className={cn('text-lg font-semibold mb-4')}>실제 회사 사례</h3>
            <div className={cn('overflow-x-auto')}>
              <table className={cn('w-full border-collapse border border-gray-300')}>
                <thead className={cn('bg-gray-50')}>
                  <tr>
                    <th className={cn('border border-gray-300 px-4 py-3 text-left')}>회사</th>
                    <th className={cn('border border-gray-300 px-4 py-3 text-left')}>디자인 시스템</th>
                    <th className={cn('border border-gray-300 px-4 py-3 text-left')}>구조</th>
                    <th className={cn('border border-gray-300 px-4 py-3 text-left')}>재사용 사례</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Airbnb</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>React DLS</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>아토믹 패턴</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Button → 200+ 페이지</td>
                  </tr>
                  <tr className={cn('bg-gray-50')}>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Atlassian</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Design System</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>컴포넌트 분리</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Label → 모든 폼</td>
                  </tr>
                  <tr>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Shopify</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>Polaris</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>원자 단위</td>
                    <td className={cn('border border-gray-300 px-4 py-3')}>TextField → 500+ 곳</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 실제 재사용 예시 */}
          <div className={cn('grid grid-cols-1 lg:grid-cols-3 gap-6')}>
            <div className={cn('bg-green-50 p-6 rounded-lg border border-green-200')}>
              <h4 className={cn('font-semibold text-green-800 mb-3')}>Label 컴포넌트</h4>
              <div className={cn('space-y-3')}>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Label required>회원가입 폼</Label>
                  <div className={cn('text-xs text-gray-500')}>회원가입 페이지</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Label>프로필 설정</Label>
                  <div className={cn('text-xs text-gray-500')}>마이페이지</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Label>상품 등록</Label>
                  <div className={cn('text-xs text-gray-500')}>관리자 페이지</div>
                </div>
              </div>
            </div>

            <div className={cn('bg-blue-50 p-6 rounded-lg border border-blue-200')}>
              <h4 className={cn('font-semibold text-blue-800 mb-3')}>ErrorMessage</h4>
              <div className={cn('space-y-3')}>
                <div className={cn('bg-white p-3 rounded border')}>
                  <ErrorMessage>로그인 실패</ErrorMessage>
                  <div className={cn('text-xs text-gray-500')}>로그인 페이지</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <ErrorMessage>결제 실패</ErrorMessage>
                  <div className={cn('text-xs text-gray-500')}>결제 페이지</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <ErrorMessage>서버 에러</ErrorMessage>
                  <div className={cn('text-xs text-gray-500')}>전역 에러</div>
                </div>
              </div>
            </div>

            <div className={cn('bg-purple-50 p-6 rounded-lg border border-purple-200')}>
              <h4 className={cn('font-semibold text-purple-800 mb-3')}>Input</h4>
              <div className={cn('space-y-3')}>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Input placeholder="검색어" size="small" />
                  <div className={cn('text-xs text-gray-500')}>헤더 검색</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Input placeholder="댓글 작성" size="medium" />
                  <div className={cn('text-xs text-gray-500')}>댓글 입력</div>
                </div>
                <div className={cn('bg-white p-3 rounded border')}>
                  <Input placeholder="제목 입력" size="large" />
                  <div className={cn('text-xs text-gray-500')}>게시글 작성</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 협업 관점 */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            👥 팀 협업에서의 진짜 가치
          </h2>
          
          <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
            <div className={cn('bg-white p-6 rounded-lg shadow-sm border')}>
              <h3 className={cn('text-lg font-semibold text-green-600 mb-4')}>
                ✅ 코드 리뷰가 쉬워집니다
              </h3>
              <div className={cn('space-y-4')}>
                <div className={cn('bg-gray-50 p-4 rounded')}>
                  <p className={cn('text-sm font-medium text-gray-800 mb-2')}>리뷰어 입장:</p>
                  <p className={cn('text-sm text-gray-600')}>"Label 컴포넌트만 보면 되니까 5분만에 리뷰 완료!"</p>
                </div>
                <div className={cn('bg-gray-50 p-4 rounded')}>
                  <p className={cn('text-sm font-medium text-gray-800 mb-2')}>개발자 입장:</p>
                  <p className={cn('text-sm text-gray-600')}>"ErrorMessage 수정했는데 다른 곳에 영향 없다는 걸 바로 확신!"</p>
                </div>
              </div>
            </div>

            <div className={cn('bg-white p-6 rounded-lg shadow-sm border')}>
              <h3 className={cn('text-lg font-semibold text-blue-600 mb-4')}>
                📚 신입사원 온보딩
              </h3>
              <div className={cn('space-y-3 text-sm')}>
                <div className={cn('flex items-start gap-3')}>
                  <span className={cn('text-green-500')}>✓</span>
                  <span>1일차: Input, Label 같은 원자 컴포넌트부터 이해</span>
                </div>
                <div className={cn('flex items-start gap-3')}>
                  <span className={cn('text-green-500')}>✓</span>
                  <span>3일차: InputGroup 같은 조합 컴포넌트 파악</span>
                </div>
                <div className={cn('flex items-start gap-3')}>
                  <span className={cn('text-green-500')}>✓</span>
                  <span>1주차: 새로운 페이지 독립적으로 개발 가능</span>
                </div>
                <div className={cn('flex items-start gap-3')}>
                  <span className={cn('text-green-500')}>✓</span>
                  <span>2주차: 컴포넌트 수정도 안전하게 진행</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 장기적 관점 */}
        <section className={cn('mb-12 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border-2 border-green-200')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            🔮 장기적 관점: 2-3년 후를 생각해보세요
          </h2>
          
          <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-8')}>
            <div>
              <h3 className={cn('text-lg font-semibold text-green-600 mb-4')}>기존 구조 (아토믹)</h3>
              <ul className={cn('space-y-2 text-sm text-gray-700')}>
                <li>• 100개 페이지 → Label 한 번 수정으로 모든 곳 업데이트</li>
                <li>• 새로운 디자이너 합류 → 기존 컴포넌트 바로 활용</li>
                <li>• 브랜드 리뉴얼 → 원자 컴포넌트만 수정하면 끝</li>
                <li>• 접근성 개선 → ErrorMessage 하나 수정으로 완료</li>
                <li>• A/B 테스트 → Button 컴포넌트만 변경</li>
              </ul>
            </div>
            
            <div>
              <h3 className={cn('text-lg font-semibold text-orange-600 mb-4')}>통합 구조</h3>
              <ul className={cn('space-y-2 text-sm text-gray-700')}>
                <li>• 100개 페이지 → 각각 개별 수정 필요</li>
                <li>• 새로운 디자이너 → 매번 새로 만들어야 함</li>
                <li>• 브랜드 리뉴얼 → 모든 컴포넌트 일일이 수정</li>
                <li>• 접근성 개선 → 모든 곳을 찾아다니며 수정</li>
                <li>• A/B 테스트 → 수십 개 파일 동시 수정</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 기술적 깊이 */}
        <section className={cn('mb-12')}>
          <h2 className={cn('text-2xl font-semibold text-gray-800 mb-6')}>
            🔧 기술적 깊이와 성장
          </h2>
          
          <div className={cn('bg-white p-6 rounded-lg shadow-sm border')}>
            <div className={cn('mb-6')}>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className={cn('text-blue-600 hover:text-blue-700 font-medium')}
              >
                {showAdvanced ? '숨기기' : '고급 개념 보기'} →
              </button>
            </div>
            
            {showAdvanced && (
              <div className={cn('space-y-6')}>
                <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6')}>
                  <div className={cn('bg-blue-50 p-4 rounded')}>
                    <h4 className={cn('font-semibold text-blue-800 mb-3')}>배울 수 있는 고급 개념들</h4>
                    <ul className={cn('text-sm space-y-1')}>
                      <li>• Composition vs Inheritance</li>
                      <li>• Single Responsibility Principle</li>
                      <li>• Dependency Injection 패턴</li>
                      <li>• Interface Segregation</li>
                    </ul>
                  </div>
                  
                  <div className={cn('bg-green-50 p-4 rounded')}>
                    <h4 className={cn('font-semibold text-green-800 mb-3')}>실무 스킬 향상</h4>
                    <ul className={cn('text-sm space-y-1')}>
                      <li>• 대규모 코드베이스 관리 능력</li>
                      <li>• 아키텍처 설계 역량</li>
                      <li>• 팀 표준 수립 경험</li>
                      <li>• 리팩토링 안전성 확보</li>
                      <li>• 확장 가능한 시스템 구축</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 결론 */}
        <section className={cn('bg-yellow-50 p-8 rounded-lg border-2 border-yellow-200')}>
          <h2 className={cn('text-xl font-semibold text-yellow-800 mb-4')}>
            💡 결론
          </h2>
          <div className={cn('text-sm text-yellow-700 space-y-3')}>
            <p>
              <strong>"왜 복잡하게 만드나요?"</strong> → "지금은 복잡해 보이지만, 6개월 후 팀이 커지고 프로젝트가 커졌을 때 이 구조의 진가를 알게 될 거예요."
            </p>
            <p>
              <strong>"간단한 걸로도 충분한데요?"</strong> → "스타트업 초기에는 맞아요. 하지만 시리즈 A 받고 개발팀 규모가 커지면 표준화가 생존 문제가 됩니다."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 