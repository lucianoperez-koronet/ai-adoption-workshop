import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

const traceStorage = new AsyncLocalStorage<{ traceId: string }>();

export function getTraceId(): string {
  return traceStorage.getStore()?.traceId ?? 'no-trace';
}

export function runWithTrace<T>(
  traceId: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  return traceStorage.run({ traceId }, fn);
}

export function createTraceId(): string {
  return randomUUID().slice(0, 8);
}

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function formatPayload(
  level: LogLevel,
  component: string,
  message: string,
  data?: Record<string, unknown>
): string {
  const traceId = getTraceId();
  const payload = {
    ts: new Date().toISOString(),
    level,
    traceId,
    component,
    message,
    ...(data && Object.keys(data).length > 0 ? { data } : {}),
  };
  return JSON.stringify(payload);
}

export const log = {
  info: (component: string, message: string, data?: Record<string, unknown>) =>
    console.log(formatPayload('info', component, message, data)),
  warn: (component: string, message: string, data?: Record<string, unknown>) =>
    console.warn(formatPayload('warn', component, message, data)),
  error: (component: string, message: string, data?: Record<string, unknown>) =>
    console.error(formatPayload('error', component, message, data)),
  debug: (component: string, message: string, data?: Record<string, unknown>) =>
    console.debug(formatPayload('debug', component, message, data)),
};
