import { SqError } from './types';
/**
 * Thrown when `accountHolderName` is not provided to the ACH payment tokenize
 * method
 *
 * The bank account holder name must be provided in the parameters of
 * `ach.tokenize({ accountHolderName: string });`
 * @example
 * try {
 *   const result = await ach.tokenize();
 *   if (result.status == "OK") {
 *      alert (`Transfer success ${result.token}` )
 *   }
 * }
 * catch (e) {
 *   if (e instanceof PlaidMissingNameError) {
 *      alert(`Account holder name is missing ${e.message}`);
 *   }
 * }
 */
declare class PlaidMissingNameError extends SqError {
    /**
     * @inheritdoc
     */
    constructor();
}
/**
 * Thrown when the `ach` payment method was not initialized.
 * @example
 * try {
 *   const result = await ach.tokenize();
 *   if (result.status == "OK") {
 *      alert (`Transfer success ${result.token}` )
 *   }
 * }
 * catch (e) {
 *   if (e instanceof PlaidUninitializedError) {
 *      alert(`Plaid was not correctly initialized ${e.message}`);
 *   }
 * }
 */
declare class PlaidUninitializedError extends SqError {
    /**
     * @inheritdoc
     */
    constructor();
}
export { PlaidUninitializedError, PlaidMissingNameError };
