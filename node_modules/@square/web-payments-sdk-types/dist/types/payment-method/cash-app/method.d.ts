import { PaymentMethod, TokenResult } from '../payment-method-types';
import { CashAppOptions, CashAppSelectors } from './types';
/**
 * @internal
 * The Cash App Payment Method.
 *
 * Allows a buyer to authorize a purchase through their Cash App account.
 *
 * @example
 * const cashApp = await payments.cashApp({
 *   redirectURI: `${window.location.href}`,
 *   totalTransactionAmount: {
 *     amount: 100, // $1.00
 *     currencyCode: 'USD',
 *   },
 *   transactionId,
 * });
 *
 * await cash.attachAll({
 *     button: '#pay-with-cash-button',
 *     qrCode: '#pay-with-cash-qr-code',
 *   },
 *   {
 *     button: {
 *       shape: 'Semirounded',
 *       theme: 'dark',
 *     },
 *   }
 * );
 *
 * const cashButton = document.getElementById('#pay-with-cash-button');
 * // Desktop flow
 * cashButton.addEventListener('click', async function () {
 *   try {
 *     const result = await cashApp.tokenize();
 *    // Process payment with result.token
 *   }
 *   catch (e) {
 *   }
 * });
 * // Mobile Flow
 * const result = await cashApp.getRedirectResult();
 * if (result !== null) {
 *   // Process payment with result.token
 * }
 */
interface CashApp extends PaymentMethod {
    /**
     * @internal
     * If the buyer is on a device/platform in which they will be directed to the native Cash App, and then redirected to
     * the URI provided in the DigitalWalletsOptions.
     */
    readonly willRedirect: boolean;
    /**
     * @internal
     * Attaches the Cash App button and hidden QR code to the page. The QR code will only
     * be displayed once `tokenize` is called.
     * @param {CashAppSelectors} selectors - A valid selector for the QR code, and an optional selector for the Cash App button.
     * @param {CashAppOptions} options - Display options, including the button styling.
     *
     * @example
     * await cashApp.attachAll({
     *   button: '#pay-with-cash-button',
     *   qrCode: '#pay-with-cash-qr-code',
     * },
     * {
     *   button: {
     *     shape: 'Semirounded',
     *     theme: 'dark',
     *   },
     * })
     */
    attachAll(selectors: CashAppSelectors, options?: CashAppOptions): Promise<void>;
    /**
     * @internal
     * Starts the Cash App flow.
     * For Desktop, a QR code will be displayed to the buyer, in which they will need to scan
     * it with their phone.
     *
     * For Mobile, the buyer will be directed to the native Cash App, and then redirected back to the page upon
     * authorizing the charge.
     *
     * @example
     * cashAppButton.addEventListener('click', async function() {
     *   const tokenResult = await cashApp.tokenize();
     * });
     * @returns {Promise<TokenResult>} A promise that resolves when the buyer completes
     * scans the bar code and complete the interaction with Cash App on their phone. For mobile buyers
     * the `tokenize` call will start the process, but completion will occur under the `getRedirectResults` function
     * @throws {UnexpectedError} Tokenization failed because of an internal error
     */
    tokenize(): Promise<TokenResult>;
    /**
     * @internal
     * For buyers using a mobile device, the `tokenize` call will direct them to the native Cash App on their phone.
     * After the buyer authorizes the charge, they will be redirected to the page provided in the config
     * and `getRedirectResult` will provide the TokenResult. If the buyer does not go through the mobile flow,
     * this function will just return null.
     *
     * @example
     * const tokenResult = await cashApp.getRedirectResult()
     * if (tokenResult !== null) {
     *   // Process payment with tokenResult.token
     * }
     * @returns {Promise<TokenResult | null>}
     * @throws {UnexpectedError} Tokenization failed because of an internal error
     */
    getRedirectResult(): Promise<TokenResult | null>;
    /**
     * @internal
     * Destroys this `CashApp` instance. This method cleans up the `CashApp` instance and removes
     * the Cash App button from the page.
     *
     * @example
     * await cashApp.destroy();
     * @returns {Promise<void>} A promise which resolves when the `CashApp` instance is destroyed.
     *
     */
    destroy(): Promise<void>;
}
export { CashApp };
