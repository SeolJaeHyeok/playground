import * as Sentry from '@sentry/nextjs';

/**
 * Sentry 서비스를 관리하는 싱글톤 클래스
 *
 * 사용 예시:
 * ```typescript
 * // 초기화
 * const sentry = SentryService.getInstance();
 * sentry.initialize('YOUR_DSN', 'production');
 *
 * // 에러 캡처
 * try {
 *   throw new Error('테스트 에러');
 * } catch (error) {
 *   sentry.captureException(error, { additionalInfo: '상세 정보' });
 * }
 *
 * // 사용자 정보 설정
 * sentry.setUser({ id: 'user123', email: 'user@example.com' });
 * ```
 */
export class SentryService {
    private static instance: SentryService;

    private constructor() {}

    /**
     * SentryService의 싱글톤 인스턴스를 반환합니다.
     * @returns SentryService 인스턴스
     */
    public static getInstance(): SentryService {
        if (!SentryService.instance) {
            SentryService.instance = new SentryService();
        }
        return SentryService.instance;
    }

    /**
     * Sentry를 초기화합니다.
     * @param dsn - Sentry 프로젝트의 DSN
     * @param environment - 현재 환경 (예: 'development', 'production')
     */
    public initialize(dsn: string, environment: string): void {
        Sentry.init({
            dsn,
            environment,
            tracesSampleRate: 1.0,
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });
    }

    /**
     * 에러를 Sentry에 전송합니다.
     * @param error - 캡처할 Error 객체
     * @param context - 추가적인 컨텍스트 정보
     *
     *
     * 사용 예시:
     * ```typescript
     * // 기본 에러 캡처
     * try {
     *     throw new Error('결제 처리 실패');
     * } catch (error) {
     *     Sentry.captureException(error);
     * }
     *
     * // 추가 컨텍스트와 함께 캡처
     * try {
     *     throw new Error('사용자 인증 실패');
     * } catch (error) {
     *     Sentry.captureException(error, {
     *         extra: {
     *             userId: '123',
     *             attemptTime: new Date().toISOString(),
     *             browserInfo: navigator.userAgent
     *         }
     *     });
     * }
     * ```
     */
    public captureException(error: Error, context?: Record<string, any>): void {
        Sentry.captureException(error, { extra: context });
    }

    /**
     * 사용자 정의 메시지를 Sentry에 전송합니다.
     * @param message - 전송할 메시지
     * @param level - 메시지의 심각도 레벨
     *
     * 사용 예시:
     * ```typescript
     * sentry.captureMessage('결제 실패', 'error');
     * ```
     */
    public captureMessage(message: string, level?: Sentry.SeverityLevel): void {
        Sentry.captureMessage(message, level);
    }

    /**
     * 현재 사용자 정보를 설정합니다.
     * @param user - 사용자 정보 객체
     *
     * 사용 예시:
     * ```typescript
     * sentry.setUser({
     *   id: 'user_123',
     *   email: 'user@example.com',
     *   username: 'johndoe',
     *   role: 'admin',
     * });
     * ```
     */

    public setUser(
        user: {
            id: string;
            email?: string;
            name?: string;
            role?: string;
            organization?: string;
        } | null,
    ) {
        if (!user) {
            Sentry.setUser(null);
            return;
        }

        Sentry.setUser({
            id: user.id,
            email: user.email,
            username: user.name,
            role: user.role,
            organization: user.organization,
        });
    }

    /**
     * 태그를 설정합니다.
     * @param key - 태그 키
     * @param value - 태그 값
     *
     * 사용 예시:
     * ```typescript
     * sentry.setTag('version', '1.0.0');
     * ```
     */
    public setTag(key: string, value: string): void {
        Sentry.setTag(key, value);
    }

    /**
     * 현재 실행 컨텍스트에 추가 정보를 설정합니다.
     * @param name - 컨텍스트 이름
     * @param context - 컨텍스트 객체
     *
     * 사용 예시:
     * ```typescript
     * sentry.setContext('payment', {
     *   orderId: '12345',
     *   amount: 1000,
     *   currency: 'KRW'
     * });
     * ```
     */
    public setContext(name: string, context: Record<string, any>): void {
        Sentry.setContext(name, context);
    }

    /**
     * 임시 스코프 내에서 작업을 실행합니다.
     * @param callback - 임시 스코프에서 실행할 콜백 함수
     *
     * 사용 예시:
     * ```typescript
     * sentry.withScope((scope) => {
     *  scope.setTag('transaction_id', 'abc123');
     *  sentry.captureMessage('특정 트랜잭션 처리 중 오류');
     * });
     * ```
     */
    public withScope(callback: (scope: Sentry.Scope) => void): void {
        Sentry.withScope(callback);
    }

    public startSpan(name: string, callback: (span: Sentry.Span) => void): void {
        Sentry.startSpan({ name }, callback);
    }
}
