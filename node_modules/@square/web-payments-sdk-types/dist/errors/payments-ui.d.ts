import { SqError } from './types';
/**
 * Exception thrown when trying to call a method that is not available
 * @example
 * try {
 *     await payments.unavailableMethod();
 * }
 * catch (e) {
 *    if (e instanceof MethodNotAvailableError){
 *       alert("Method is not enabled for this app.");
 *    }
 * }
 */
declare class MethodNotAvailableError extends SqError {
    constructor();
}
/**
 * Exception thrown when trying to call a method before it has been implemented
 * @example
 * try {
 *     await payments.notImplemented();
 * }
 * catch (e) {
 *    if (e instanceof UnimplementedError){
 *       alert("Method is not implemented yet.");
 *    }
 * }
 */
declare class UnimplementedError extends SqError {
    constructor(name: string, ...params: unknown[]);
}
export { MethodNotAvailableError, UnimplementedError };
