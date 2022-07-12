import { SqError } from './types';
/**
 * A generic error to handle internal error conditions unrelated to the state or
 * of the application that is integrating the Web Payments SDK.
 * @example
 * try {
 *   const result = await ach.tokenize();
 *   if (result.status == "OK") {
 *     alert (`Transfer success ${result.token}` )
 *   }
 * }
 * catch (e) {
 *   if (e instanceof UnexpectedError) {
 *     alert(`The SDK had an unknown error ${e.message}`);
 *   }
 * }
 */
declare class UnexpectedError extends SqError {
    constructor(actionText: string);
}
export { UnexpectedError };
