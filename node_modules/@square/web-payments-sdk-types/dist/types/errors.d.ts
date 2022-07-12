import { PlaidMissingNameError, PlaidUninitializedError } from '../errors/ach';
import { VerifyBuyerError } from '../errors/analytics';
import { ElementNotFoundError, InvalidEventListenerCallbackError, InvalidOptionError, InvalidPaymentRequestError, InvalidPaymentRequestUpdateError } from '../errors/api';
import { BrowserNotSupportedError, WebSdkEmbedError } from '../errors/initialization';
import { PaymentMethodUnsupportedError } from '../errors/payment-method-unsupported';
import { ScriptLoaderError } from '../errors/script';
import { TokenizationError } from '../errors/tokenization';
import { UnexpectedError } from '../errors/unexpected';
/**
 * The errors that can be thrown by the Web Payments SDK
 *
 * `PublicErrors` contains all of the error types that are thrown by the SDK.
 */
interface PublicErrors {
    BrowserNotSupportedError: typeof BrowserNotSupportedError;
    ElementNotFoundError: typeof ElementNotFoundError;
    InvalidOptionError: typeof InvalidOptionError;
    InvalidEventListenerCallbackError: typeof InvalidEventListenerCallbackError;
    InvalidPaymentRequestError: typeof InvalidPaymentRequestError;
    InvalidPaymentRequestUpdateError: typeof InvalidPaymentRequestUpdateError;
    PaymentMethodUnsupportedError: typeof PaymentMethodUnsupportedError;
    PlaidMissingNameError: typeof PlaidMissingNameError;
    PlaidUninitializedError: typeof PlaidUninitializedError;
    ScriptLoaderError: typeof ScriptLoaderError;
    TokenizationError: typeof TokenizationError;
    UnexpectedError: typeof UnexpectedError;
    VerifyBuyerError: typeof VerifyBuyerError;
    WebSdkEmbedError: typeof WebSdkEmbedError;
}
export { PublicErrors };
