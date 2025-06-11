import * as Sentry from '@sentry/nextjs';

import { SentryService } from './sentry.util';

type LogLevel = 'debug' | 'info' | 'warning' | 'error';
type LogContext = {
    tags?: Record<string, string>;
    extra?: Record<string, any>;
    user?: {
        id: string;
        email?: string;
        name?: string;
        role?: string;
        organization?: string;
    };
};

class LoggerClass {
    private sentryService: SentryService;

    constructor() {
        this.sentryService = SentryService.getInstance();
    }

    /**
     * 에러 로깅
     * @example
     * ```typescript
     * try {
     *   throw new Error('API 호출 실패');
     * } catch (error) {
     *   Logger.error(error, {
     *     tags: { feature: 'pcp' },
     *     extra: { ykiHo: '123' }
     *   });
     * }
     * ```
     */
    error(error: Error | unknown, context?: LogContext) {
        this.sentryService.withScope((scope) => {
            this.setScope(scope, context);
            this.sentryService.captureException(error as Error);
        });
    }

    /**
     * 정보성 메시지 로깅
     * @example
     * ```typescript
     * Logger.info('대상자 목록 불러오기 프로세스 시작', {
     *   tags: { feature: 'pcp' },
     *   extra: { ykiHo: '123' }
     * });
     * ```
     */
    info(message: string, context?: LogContext) {
        this.log(message, 'info', context);
    }

    /**
     * 경고성 메시지 로깅
     * @example
     * ```typescript
     * Logger.warn('API 응답 지연', {
     *   tags: { api: 'pcp' },
     *   extra: { responseTime: 5000 }
     * });
     * ```
     */
    warn(message: string, context?: LogContext) {
        this.log(message, 'warning', context);
    }

    /**
     * 디버그 메시지 로깅
     * @example
     * ```typescript
     * Logger.debug('데이터 처리 중', {
     *   extra: { processedItems: 50 }
     * });
     * ```
     */
    debug(message: string, context?: LogContext) {
        this.log(message, 'debug', context);
    }

    startSpan(name: string, callback: (span: Sentry.Span) => void) {
        this.sentryService.startSpan(name, callback);
    }

    private log(message: string, level: LogLevel, context?: LogContext) {
        this.sentryService.withScope((scope) => {
            this.setScope(scope, context);
            this.sentryService.captureMessage(message, level);
        });
    }

    private setScope(scope: Sentry.Scope, context?: LogContext) {
        if (context?.tags) {
            Object.entries(context.tags).forEach(([key, value]) => {
                scope.setTag(key, value);
            });
        }

        if (context?.extra) {
            Object.entries(context.extra).forEach(([key, value]) => {
                scope.setExtra(key, value);
            });
        }

        if (context?.user) {
            scope.setUser(context.user);
        }
    }
}

// 싱글톤 인스턴스를 바로 export
export const Logger = new LoggerClass();
