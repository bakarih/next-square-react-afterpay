import { PaymentMethod, TokenResult } from '../payment-method-types';
import { GooglePayButtonOptions } from './types';
/**
 * The Google Pay Payment Method.
 *
 * Google Pay supports taking payments via credit cards. Utilizing the PaymentRequest object,
 * you can handle Shipping Option selection, as well as collect Shipping and Billing addresses.
 *
 * @example
 * const paymentRequest = payments.paymentRequest({
 *   countryCode: 'US',
 *   currencyCode: 'USD',
 *   total: {
 *     amount: '5.79',
 *     label: 'Total'
 *   },
 * });
 *
 * const googlePay = await payments.googlePay(paymentRequest);
 * await googlePay.attach('#googlePay');
 *
 * const googlePayButtonTarget = document.getElementById('googlePay');
 * googlePayButtonTarget.onclick = async () => {
 *   const tokenResult = await googlePay.tokenize();
 *
 *   // Pass `tokenResult.token` to your server, and then call the /v2/payments API
 *   // to complete the payment
 * }
 */
interface GooglePay extends PaymentMethod {
    /**
     * Attaches the Google Pay button to the page.
     *
     * @example
     * // Create a Google Pay button in the target element with customization
     * // including a white button background, static button sizing, and the
     * // long button type which shows "Buy with G Pay" on the button.
     * await googlePay.attach('#googlePay', {
     *   buttonColor: 'white',
     *   buttonSizeMode: 'static',
     *   buttonType: 'long'
     * });
     *
     * @param selectorOrElement - A valid selector or HTMLElement of an empty <div> or <span>
     * element where the Google Pay button will be inserted.
     * @param googlePayButtonOptions - A optional object containing configuration options
     * for the Google Pay button.
     *
     * @returns completedPromise - A promise that resolves when the button has attached to the page
     *
     * @throws {PaymentMethodUnsupportedError} Google Pay is not available due to
     * misconfiguration or non-support on this device or browser
     */
    attach(selectorOrElement: string | HTMLElement, googlePayButtonOptions?: GooglePayButtonOptions): Promise<void>;
    /**
     * Destroys this `GooglePay` instance. This method cleans up the `GooglePay` instance and
     * removes the Google Pay button from the page.
     *
     * @returns {Promise} A promise which resolves when the `GooglePay` instance is destroyed
     *
     * @example
     * await googlePay.destroy();
     */
    destroy(): Promise<void>;
    /**
     * This method presents the Google Pay payment sheet. When the buyer completes their interaction
     * with Google Pay, the returned promise resolves with a tokenResult object. The returned token
     * and buyer details can be used to complete the payment on your server.
     *
     * @example
     * googlePayButtonTarget.onclick = async () => {
     *   const tokenResult = await googlePay.tokenize();
     * }
     * @returns {Promise} A promise that resolves when the buyer completes
     * their interaction with Google Pay.
     * @throws {UnexpectedError} Tokenization failed because of an internal error
     */
    tokenize(): Promise<TokenResult>;
}
export { GooglePay };
