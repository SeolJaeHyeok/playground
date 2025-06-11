# API 성능 측정 유틸리티 사용 가이드

이 문서는 `performance.util.ts`에서 제공하는 API 성능 측정 유틸리티의 다양한 사용 방법을 설명합니다.

## 1. 기본 사용법 - measureApiPerformance

가장 간단한 방법으로 API 호출의 성능을 측정할 수 있습니다.

```typescript
import { measureApiPerformance } from '@/helpers/sentry/performance.util';
import { userApi } from '@/api/user';

// 기본 사용
const userData = await measureApiPerformance(
  'fetch-user-profile',
  () => userApi.getProfile(userId)
);

// 컨텍스트와 함께 사용
const userData = await measureApiPerformance(
  'fetch-user-profile',
  () => userApi.getProfile(userId),
  {
    tags: { 
      feature: 'user-management',
      userId: userId 
    },
    extra: { 
      requestSource: 'profile-page',
      userRole: 'admin' 
    }
  }
);

// 커스텀 임계값과 함께 사용
const userData = await measureApiPerformance(
  'critical-payment-api',
  () => paymentApi.processPayment(paymentData),
  {
    tags: { feature: 'payment' },
    extra: { amount: paymentData.amount }
  },
  {
    warning: 1000, // 1초
    error: 3000    // 3초
  }
);
```

## 2. 함수 래핑 - withPerformanceTracking

재사용 가능한 성능 추적 함수를 만들 수 있습니다.

```typescript
import { withPerformanceTracking } from '@/helpers/sentry/performance.util';

// API 함수를 성능 추적이 가능한 함수로 래핑
const trackedGetUser = withPerformanceTracking(
  'get-user-data',
  async (userId: string) => {
    return await userApi.getUser(userId);
  },
  { 
    tags: { feature: 'user-management' } 
  }
);

// 래핑된 함수 사용
const user = await trackedGetUser('123');

// 복잡한 비즈니스 로직도 래핑 가능
const trackedProcessOrder = withPerformanceTracking(
  'process-order',
  async (orderData: OrderData) => {
    // 1. 재고 확인
    await inventoryApi.checkStock(orderData.items);
    
    // 2. 결제 처리
    const payment = await paymentApi.process(orderData.payment);
    
    // 3. 주문 생성
    const order = await orderApi.create({
      ...orderData,
      paymentId: payment.id
    });
    
    return order;
  },
  {
    tags: { feature: 'order-processing' },
    extra: { orderType: 'online' }
  },
  {
    warning: 5000,  // 5초
    error: 15000    // 15초
  }
);
```

## 3. 수동 측정 - startPerformanceTracking

복잡한 로직이나 여러 단계의 작업을 수동으로 측정할 수 있습니다.

**주의**: 수동 측정 방식은 Sentry span 연동 없이 순수한 성능 측정만 제공합니다. Sentry 추적이 필요한 경우 `measureApiPerformance`를 사용하세요.

```typescript
import { startPerformanceTracking } from '@/helpers/sentry/performance.util';

async function complexDataProcessing() {
  const tracker = startPerformanceTracking('data-processing-pipeline');
  
  try {
    // 1단계: 데이터 로드
    const rawData = await dataApi.loadRawData();
    
    // 2단계: 데이터 변환
    const transformedData = await transformData(rawData);
    
    // 3단계: 데이터 저장
    const result = await dataApi.saveProcessedData(transformedData);
    
    // 성공적으로 완료
    const metrics = tracker.end({
      tags: { 
        feature: 'data-processing',
        stage: 'complete' 
      },
      extra: { 
        recordsProcessed: transformedData.length,
        dataSize: rawData.size 
      }
    });
    
    console.log(`처리 완료: ${metrics.duration}ms`);
    return result;
  } catch (error) {
    // 에러 발생 시
    const metrics = tracker.endWithError(error as Error, {
      tags: { 
        feature: 'data-processing',
        stage: 'failed' 
      },
      extra: { 
        errorStep: 'unknown' 
      }
    });
    
    console.log(`처리 실패: ${metrics.duration}ms`);
    throw error;
  }
}
```

## 4. React Hook 사용법

React 컴포넌트에서 사용할 수 있는 Hook을 제공합니다.

```typescript
import { useApiPerformanceTracker } from '@/helpers/sentry/performance.util';
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }: { userId: string }) {
  const { measureApiPerformance } = useApiPerformanceTracker();
  
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => measureApiPerformance(
      'fetch-user-profile',
      () => userApi.getProfile(userId),
      {
        tags: { 
          feature: 'user-profile',
          component: 'UserProfile' 
        },
        extra: { userId }
      }
    )
  });

  if (isLoading) return <div>Loading...</div>;
  
  return <div>{user?.name}</div>;
}
```

## 5. 기존 코드 개선 예시

기존의 useSelectTgtpListQuery를 개선한 예시입니다.

```typescript
import { measureApiPerformance } from '@/helpers/sentry/performance.util';

const useGetHiraTargetUserQuery = ({ hospitalInfo }: { hospitalInfo: HospitalDataType }) => {
  return useInfiniteQuery({
    queryKey: ['hira-target-users', hospitalInfo.yKiHo],
    queryFn: async ({ pageParam = 0 }) => {
      return measureApiPerformance(
        'hira-target-user-fetch',
        async () => {
          const response = await getSelectTgtpList({
            fomId: 'ASQ10001',
            fnctVer: '001',
            testDataYn: 'N',
            ykiho: hospitalInfo.yKiHo,
            firstIndex: String(pageParam),
            recordCountPerPage: String(MAX_PAGE_SIZE),
            fnctNm: 'selectTgtpList',
            chkCycStep: 'Y',
          });

          if (response.data.Result === false) {
            throw new CustomError(response.data.ErrorCode, {
              details: {
                location: 'useGetHiraTargetUserQuery',
                pageParam,
                hospitalInfo,
                errorCode: response.data.ErrorCode,
              },
            });
          }

          return {
            items: response.data.ListData || [],
            errorCode: response.data.ErrorCode,
            totalCount: response.data.ListData[0]?.totCnt,
          };
        },
        {
          tags: {
            feature: 'hira-integration',
            ykiHo: hospitalInfo.yKiHo,
            pcpIdx: hospitalInfo.objectId,
          },
          extra: {
            pageParam,
            recordCount: MAX_PAGE_SIZE,
          }
        },
        {
          warning: 5000,  // HIRA API는 느릴 수 있으므로 5초
          error: 15000    // 15초 이상은 에러로 간주
        }
      );
    },
    // ... 나머지 설정
  });
};
```

## 6. 성능 임계값 설정 가이드

다양한 API 유형에 따른 권장 임계값입니다.

```typescript
// 빠른 응답이 필요한 API (사용자 인터페이스)
const UI_THRESHOLDS = {
  warning: 500,   // 0.5초
  error: 2000     // 2초
};

// 일반적인 비즈니스 로직 API
const BUSINESS_THRESHOLDS = {
  warning: 3000,  // 3초
  error: 10000    // 10초
};

// 외부 API 또는 복잡한 처리
const EXTERNAL_THRESHOLDS = {
  warning: 5000,  // 5초
  error: 15000    // 15초
};

// 배치 처리나 대용량 데이터 처리
const BATCH_THRESHOLDS = {
  warning: 30000, // 30초
  error: 120000   // 2분
};
```

## 7. 로깅 결과 해석

성능 측정 결과는 다음과 같이 분류됩니다:

- **fast**: 500ms 미만
- **normal**: 500ms ~ 1초
- **slow**: 1초 ~ warning 임계값
- **warning**: warning 임계값 ~ error 임계값
- **critical**: error 임계값 초과

각 카테고리에 따라 적절한 로그 레벨로 기록되며, Sentry에서 성능 모니터링이 가능합니다.

## 8. Sentry 연동 특징

### 자동 Span 생성
- `measureApiPerformance`와 `withPerformanceTracking`은 자동으로 Sentry span을 생성합니다
- span에는 다음 정보가 포함됩니다:
  - `name`: `API: {operationName}` 형식
  - `op`: `api.call`
  - `attributes`: 성능 메트릭과 컨텍스트 정보

### 성능 데이터 추적
- 실행 시간 (`duration_ms`)
- 성공/실패 여부 (`success`)
- 에러 메시지 (실패 시)
- 사용자 정의 속성들

### 에러 상태 관리
- 성공 시: `{ code: 1 }` (OK)
- 실패 시: `{ code: 2 }` (ERROR)

이를 통해 Sentry 대시보드에서 API 성능을 시각적으로 모니터링하고 분석할 수 있습니다. 