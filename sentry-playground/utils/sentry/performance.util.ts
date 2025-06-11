/* eslint-disable camelcase */
import * as Sentry from '@sentry/nextjs';

import { Logger } from './logger.class';

interface PerformanceMetrics {
    duration: number;
    startTime: number;
    endTime: number;
    success: boolean;
    error?: Error;
}

interface ApiPerformanceContext {
    tags?: Record<string, string>;
    extra?: Record<string, any>;
    user?: {
        id: string;
        email?: string;
        name?: string;
        role?: string;
        organization?: string;
    };
}

interface PerformanceThresholds {
    warning: number; // ms
    error: number; // ms
}

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
    warning: 3000, // 3초
    error: 10000, // 10초
};

/**
 * API 성능을 측정하고 로깅하는 유틸리티 클래스
 */
export class ApiPerformanceTracker {
    private static instance: ApiPerformanceTracker;
    private logger = Logger;

    private constructor() {}

    public static getInstance(): ApiPerformanceTracker {
        if (!ApiPerformanceTracker.instance) {
            ApiPerformanceTracker.instance = new ApiPerformanceTracker();
        }
        return ApiPerformanceTracker.instance;
    }

    /**
     * Promise를 래핑하여 성능을 측정합니다.
     *
     * @example
     * ```typescript
     * const result = await measureApiPerformance(
     *   'user-login',
     *   () => authApi.login(credentials),
     *   {
     *     tags: { feature: 'auth' },
     *     extra: { userId: credentials.email }
     *   }
     * );
     * ```
     */
    async measureApiPerformance<T>(
        operationName: string,
        apiCall: () => Promise<T>,
        context?: ApiPerformanceContext,
        thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
    ): Promise<T> {
        const startTime = performance.now();

        return Sentry.startSpan(
            {
                name: `API: ${operationName}`,
                op: 'api.call',
                attributes: {
                    operation: operationName,
                    ...context?.extra,
                },
            },
            async (span) => {
                try {
                    // API 호출 실행
                    const result = await apiCall();

                    const endTime = performance.now();
                    const duration = endTime - startTime;

                    // 성능 메트릭 생성
                    const metrics: PerformanceMetrics = {
                        duration,
                        startTime,
                        endTime,
                        success: true,
                    };

                    // 성능 로깅
                    this.logPerformanceMetrics(operationName, metrics, context, thresholds);

                    // Sentry span에 메트릭 추가
                    span.setAttribute('duration_ms', duration);
                    span.setAttribute('success', true);
                    span.setStatus({ code: 1 }); // OK status

                    return result;
                } catch (err) {
                    const endTime = performance.now();
                    const duration = endTime - startTime;
                    const error = err as Error;

                    // 에러 메트릭 생성
                    const metrics: PerformanceMetrics = {
                        duration,
                        startTime,
                        endTime,
                        success: false,
                        error,
                    };

                    // 에러 로깅
                    this.logPerformanceMetrics(operationName, metrics, context, thresholds);

                    // Sentry span에 에러 정보 추가
                    span.setAttribute('duration_ms', duration);
                    span.setAttribute('success', false);
                    span.setAttribute('error', error.message);
                    span.setStatus({ code: 2 }); // ERROR status

                    throw error;
                }
            },
        );
    }

    /**
     * 함수를 래핑하여 성능 추적이 가능한 함수로 변환합니다.
     *
     * @example
     * ```typescript
     * const trackedApiCall = withPerformanceTracking(
     *   'fetch-user-data',
     *   async (userId: string) => {
     *     return await userApi.getUser(userId);
     *   },
     *   { tags: { feature: 'user-management' } }
     * );
     *
     * const userData = await trackedApiCall('123');
     * ```
     */
    withPerformanceTracking<TArgs extends any[], TReturn>(
        operationName: string,
        fn: (...args: TArgs) => Promise<TReturn>,
        context?: ApiPerformanceContext,
        thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
    ) {
        return async (...args: TArgs): Promise<TReturn> => {
            return this.measureApiPerformance(
                operationName,
                () => fn(...args),
                context,
                thresholds,
            );
        };
    }

    /**
     * 수동으로 성능 측정을 시작합니다.
     *
     * @example
     * ```typescript
     * const tracker = startPerformanceTracking('complex-operation');
     *
     * // ... 복잡한 작업 수행
     *
     * tracker.end({ tags: { feature: 'data-processing' } });
     * ```
     */
    startPerformanceTracking(operationName: string) {
        const startTime = performance.now();

        return {
            end: (
                context?: ApiPerformanceContext,
                thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
            ) => {
                const endTime = performance.now();
                const duration = endTime - startTime;

                const metrics: PerformanceMetrics = {
                    duration,
                    startTime,
                    endTime,
                    success: true,
                };

                this.logPerformanceMetrics(operationName, metrics, context, thresholds);

                return metrics;
            },

            endWithError: (
                error: Error,
                context?: ApiPerformanceContext,
                thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
            ) => {
                const endTime = performance.now();
                const duration = endTime - startTime;

                const metrics: PerformanceMetrics = {
                    duration,
                    startTime,
                    endTime,
                    success: false,
                    error,
                };

                this.logPerformanceMetrics(operationName, metrics, context, thresholds);

                return metrics;
            },
        };
    }

    /**
     * 성능 메트릭을 로깅합니다.
     */
    private logPerformanceMetrics(
        operationName: string,
        metrics: PerformanceMetrics,
        context?: ApiPerformanceContext,
        thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS,
    ) {
        const { duration, success, error } = metrics;

        const logContext = {
            tags: {
                operation: operationName,
                performance_category: this.getPerformanceCategory(duration, thresholds),
                ...context?.tags,
            },
            extra: {
                duration_ms: duration,
                success,
                performance_thresholds: thresholds,
                ...context?.extra,
                ...(error && { error_message: error.message, error_stack: error.stack }),
            },
            user: context?.user,
        };

        if (!success && error) {
            this.logger.error(error, logContext);
        } else if (duration > thresholds.error) {
            this.logger.error(
                new Error(`API 성능 임계값 초과: ${operationName} (${duration}ms)`),
                logContext,
            );
        } else if (duration > thresholds.warning) {
            this.logger.warn(`API 성능 경고: ${operationName} (${duration}ms)`, logContext);
        } else {
            this.logger.info(`API 성능 측정: ${operationName} (${duration}ms)`, logContext);
        }
    }

    /**
     * 성능 카테고리를 결정합니다.
     */
    private getPerformanceCategory(duration: number, thresholds: PerformanceThresholds): string {
        if (duration > thresholds.error) return 'critical';
        if (duration > thresholds.warning) return 'warning';
        if (duration > 1000) return 'slow';
        if (duration > 500) return 'normal';
        return 'fast';
    }
}

type MeasureApiPerformance = typeof ApiPerformanceTracker.prototype.measureApiPerformance;
type WithPerformanceTracking = typeof ApiPerformanceTracker.prototype.withPerformanceTracking;
type StartPerformanceTracking = typeof ApiPerformanceTracker.prototype.startPerformanceTracking;

// 싱글톤 인스턴스 export
export const apiPerformanceTracker = ApiPerformanceTracker.getInstance();

// 편의 함수들 export
export const measureApiPerformance: MeasureApiPerformance =
    apiPerformanceTracker.measureApiPerformance.bind(apiPerformanceTracker);
export const withPerformanceTracking: WithPerformanceTracking =
    apiPerformanceTracker.withPerformanceTracking.bind(apiPerformanceTracker);
export const startPerformanceTracking: StartPerformanceTracking =
    apiPerformanceTracker.startPerformanceTracking.bind(apiPerformanceTracker);

/**
 * React Hook용 성능 측정 유틸리티
 */
export const useApiPerformanceTracker = () => {
    return {
        measureApiPerformance,
        withPerformanceTracking,
        startPerformanceTracking,
    };
};

// 타입 export
export type { PerformanceMetrics, ApiPerformanceContext, PerformanceThresholds };
