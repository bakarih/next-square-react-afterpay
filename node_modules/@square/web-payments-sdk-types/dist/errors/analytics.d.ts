import { VerifyBuyerErrorDetails, SqError } from './types';
/**
 * Strong customer authentication error
 *
 * Thrown with an exception on the verifyBuyer method
 */
declare class VerifyBuyerError extends SqError {
    /**
     * Creates a public error for the object returned from the Analytics library.
     * @param {analyticsLibraryError} error - Error object returns from the analytics library
     */
    constructor(error: VerifyBuyerErrorDetails);
}
export { VerifyBuyerError };
