import { Logger } from './logger.class';

type ErrorFn = typeof Logger.error;
type InfoFn = typeof Logger.info;
type WarnFn = typeof Logger.warn;
type DebugFn = typeof Logger.debug;
type StartSpanFn = typeof Logger.startSpan;
export const logError: ErrorFn = Logger.error.bind(Logger);
export const logInfo: InfoFn = Logger.info.bind(Logger);
export const logWarn: WarnFn = Logger.warn.bind(Logger);
export const logDebug: DebugFn = Logger.debug.bind(Logger);
export const logStartSpan: StartSpanFn = Logger.startSpan.bind(Logger);
