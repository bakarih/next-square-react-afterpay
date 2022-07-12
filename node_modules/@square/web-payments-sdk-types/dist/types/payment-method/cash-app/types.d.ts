import { Money } from '../../money';
import { CashAppButtonShapeValues, CashAppButtonThemeValues } from './enum';
/**
 * @internal
 * DOM selector config provided by the developer when attaching a `CashApp` instance.
 */
interface CashAppSelectors {
    /**
     * @internal
     * A valid selector of an empty DOM element where the Cash App button will be inserted
     * */
    button?: string;
    /**
     * @internal
     *  A valid selector of an empty DOM element where the Cash App QR code will be inserted after `tokenize` is called by
     *  the buyer on a Desktop device.
     */
    qrCode: string;
}
/**
 * @internal
 * Available options for styling the Cash App button based on the theme and shape
 */
interface CashAppButtonOptions {
    theme: CashAppButtonThemeValues;
    shape: CashAppButtonShapeValues;
}
/**
 * @internal
 * Display options for Cash App, including button styling.
 */
interface CashAppOptions {
    button: CashAppButtonOptions;
}
/**
 * @internal
 * Options required for initiating a `CashApp` instance
 */
interface DigitalWalletOptions {
    /**
     * @internal
     * URI that buyers using a mobile device will be redirected to after authorizing the the charge in Cash App
     */
    redirectURI: string;
    /**
     * @internal
     * An object containing final transaction amount and currency code.
     */
    totalTransactionAmount?: Money;
    /**
     * @internal
     * A unique identifier for the transaction
     */
    transactionId: string;
}
export { CashAppOptions, CashAppButtonOptions, CashAppSelectors, DigitalWalletOptions, };
