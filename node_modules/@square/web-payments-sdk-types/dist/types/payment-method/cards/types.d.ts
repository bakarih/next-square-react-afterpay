import { CardFieldNames, CardInputEventTypes } from './enum';
import { BillingContact } from '../../contact';
/**
 * @internal
 */
declare type StylePropertyList = Partial<Record<string, string>>;
/**
 * @internal
 */
declare type ClassSelectors = Record<string, StylePropertyList>;
/**
 * @internal
 */
declare type ClientClassSelectors = Partial<Record<string, StylePropertyList | ClassSelectors>>;
declare const ALLOWED_INPUT_PROPERTIES: string[];
declare const ALLOWED_COMPONENT_PROPERTIES: string[];
declare const ALLOWED_COMPONENT_STATE_PROPERTIES: string[];
declare const ALLOWED_INPUT_TEXT_PROPERTIES: string[];
declare const ALLOWED_INPUT_ICON_PROPERTIES: string[];
declare type InputPropertyValues = Partial<{
    backgroundColor?: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
}>;
declare type ComponentPropertyValues = Partial<{
    borderColor?: string;
    borderRadius?: string;
    /**
     * `border-width` can be specified with 1, 2, 3, or 4 values.
     * It allows for length values of `px` and `em`, or a value of `0`.
     * It does not allow for the keyword value of `thin`, `medium`, or `thick`.
     */
    borderWidth?: string;
}>;
declare type ComponentStatePropertyValues = Partial<{
    borderColor?: string;
    /**
     * `border-width` for state properties is `inset`, and starts from the outside border.
     * `border-width` can be specified with 1, 2, 3, or 4 values.
     * It allows for length values of `px` and `em`, or a value of `0`.
     * It does not allow for the keyword value of `thin`, `medium`, or `thick`.
     */
    borderWidth?: string;
}>;
declare type InputIconPropertyValues = Partial<{
    color?: string;
}>;
declare type InputTextPropertyValues = Partial<{
    color?: string;
}>;
/**
 * The stylesheet classes assigned to input fields by field state
 *
 * Use this object to set the appearance of Card input fields by their current
 * focus and input validity state. Note: font size has a maximum of 16px.
 *
 * Media Queries can be used with valid CardClassSelectors. Syntax support for [level 3 features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#media_features)
 * @example
 * const cardClassSelectors = {
 *    input: {
 *       backgroundColor: '#F7F8F9',
 *       color: '#373F4A',
 *       fontFamily: 'Helvetica Neue',
 *       fontSize: '16px',
 *       fontWeight: 'normal'
 *    },
 *    'input.is-focus': {
 *       backgroundColor: '#F7F8F9',
 *       color: '#3X3F4A',
 *       fontFamily: 'Helvetica Neue',
 *       fontSize: '16px',
 *       fontWeight: 'normal'
 *    },
 *    '.input-container': {
 *       borderColor: 'lightgrey',
 *       borderWidth: '1px',
 *    },
 *    '.input-container.is-focus': {
 *       borderColor: '#cc0023',
 *       borderWidth: '0 0 2px 0',
 *    },
 *    '.input-container.is-error': {
 *       borderColor: '#006aff',
 *       borderWidth: '0 0 2px 0',
 *    },
 *    '.message-icon': {
 *       color: 'green',
 *    },
 *    // You can use media queries with valid selectors:
 *    '@media screen and (max-width: 600px)': {
 *       input: {
 *         'fontSize': '12px',
 *      }
 *    }
 *    '@media only screen and (orientation: portrait)': {
 *      '.message-text': {
 *        'color': 'transparent',
 *      }
 *    }
 * }
 */
interface CardClassSelectors extends ClientClassSelectors {
    /** The default style of a Card input field */
    input?: InputPropertyValues;
    /** The style of an input field that has focus */
    ['input.is-focus']?: InputPropertyValues;
    /** The default style of an input field placeholder*/
    ['input::placeholder']?: InputTextPropertyValues;
    /** The style of an input field placeholder when the field has focus */
    ['input.is-focus::placeholder']?: InputTextPropertyValues;
    /** The style of an input field when the field is in an error state */
    ['input.is-error']?: InputTextPropertyValues;
    /** The style of an input field placeholder when the field is in an error state */
    ['input.is-error::placeholder']?: InputTextPropertyValues;
    /** The default style of the Card payment method component */
    ['.input-container']?: ComponentPropertyValues;
    /** The style of the Card payment method component when it has focus*/
    ['.input-container.is-focus']?: ComponentStatePropertyValues;
    /** The style of the Card payment method component when an input field is in an error state */
    ['.input-container.is-error']?: ComponentStatePropertyValues;
    /** The style of the input field helper text */
    ['.message-text']?: InputTextPropertyValues;
    /** The style of the input field helper icon */
    ['.message-icon']?: InputIconPropertyValues;
    /** The style of the input field error text */
    ['.message-text.is-error']?: InputTextPropertyValues;
    /** The style of the input field error icon */
    ['.message-icon.is-error']?: InputIconPropertyValues;
}
/**
 * The state of an input field at the time a card input event is triggered
 * @example
 * card.addEventListener("cardBrandChanged",  async (cardInputEvent) => {
 *   const currentInputEventState = cardInputEvent.currentState;
 *   const previousInputEventState = cardInputEvent.previousState;
 *   const eventMessage = `Valid input? ${currentInputEventState.isCompletelyValid}
 *   Was field empty? ${previousInputEventState.isEmpty}`
 *   alert(eventMessage);
 *});
 */
interface CardInputEventState {
    /** An error style class is applied to the input field due to an input error*/
    hasErrorClass: boolean;
    /** The input field has been selected */
    hasFocusClass: boolean;
    /** The SDK has validated the input field contents */
    isCompletelyValid: boolean;
    /** The input field is empty */
    isEmpty: boolean;
    /** The input value is not empty and is being validated */
    isPotentiallyValid: boolean;
}
/**
 * Input event emitted from the Card and Fields payment method instances.
 *
 * This object contains the current and previous state of an input field that
 * triggered a card input event on buyer actions such as selecting a field, inputting
 * a value, or selecting the next input field.
 * @example
 * card.addEventListener("cardBrandChanged",  async (cardInputEvent) => {
 *   const eventMessage = `Brand ${cardInputEvent.detail.cardBrand}
 *   Valid input? ${cardInputEvent.detail.currentState.isCompletelyValid}
 *   event type ${cardInputEvent.detail.eventType}
 *   focused field ${cardInputEvent.detail.field}
 *   Postal code ${cardInputEvent.detail.postalCodeValue}
 *   Field empty on focus? ${cardInputEvent.detail.previousState.isEmpty}`
 *   alert(eventMessage);
 * });
 */
interface CardInputEvent {
    cardBrand: string;
    currentState: CardInputEventState;
    eventType: CardInputEventTypes;
    /** The input field that triggered the event */
    field: CardFieldNames;
    postalCodeValue: string;
    /** The state of the input field prior to the change that triggered the event */
    previousState?: CardInputEventState;
}
/** Enumerates the payment card brands accepted by the Web Payments SDK */
declare enum CardBrand {
    /** Unknown payment card brand */
    UNKNOWN = "OTHER_BRAND",
    /** American Express */
    AMERICAN_EXPRESS = "AMERICAN_EXPRESS",
    /** Diners Club card */
    DINERS_CLUB = "DISCOVER_DINERS",
    /** Discover card */
    DISCOVER = "DISCOVER",
    /** Japan Credit Bureau (JCB) card */
    JCB = "JCB",
    /** Mastercard */
    MASTERCARD = "MASTERCARD",
    /** UnionPay card */
    UNION_PAY = "CHINA_UNIONPAY",
    /** Visa card*/
    VISA = "VISA"
}
/**
 * Enum representation of whether a card is a Credit or Debit card, or unknown type if its type cannot be determined.
 */
declare enum CardType {
    /** Unknown payment card type */
    UNKNOWN_CARD_TYPE = "UNKNOWN_CARD_TYPE",
    /** Credit card */
    CREDIT = "CREDIT",
    /** Debit card */
    DEBIT = "DEBIT"
}
/**
 * Enum for describing whether the current card is a prepaid card
 */
declare enum PrepaidType {
    /** Unknown payment prepaid card type */
    UNKNOWN_PAYMENT_TYPE = "UNKNOWN_PREPAID_TYPE",
    /** Not prepaid debit card */
    NOT_PREPAID = "NOT_PREPAID",
    /** Prepaid debit card */
    PREPAID = "PREPAID"
}
/**
 * Identifying details of a processed payment card
 *
 * This object is returned with a successful card payment.
 * The `CardDetails` object provides enough payment card
 * detail to confirm the card used in a purchase but only provides
 * the last four digits of the card number to maintain security.
 */
interface CardDetails {
    /**
     * The card brand.
     * @category Main
     */
    brand: CardBrand;
    /**
     * The card type.
     * @category Main
     */
    cardType?: CardType;
    /**
     * The prepaid card type.
     * @category Main
     */
    prepaidType?: PrepaidType;
    /**
     * One- or two-digit month of the card expiration date.
     * @category Main
     */
    expMonth: number;
    /**
     * Four-digit year of the card expiration date.
     * @category Main
     */
    expYear: number;
    /**
     * The fast four digits of the card number.
     * @category Main
     */
    last4: string;
    /**
     * @deprecated since 1.16.0
     * DEPRECATED: Use [billing](https://developer.squareup.com/reference/sdks/web/payments/objects/TokenDetails#TokenDetails.billing) on root level of TokenDetails instead.
     */
    billing?: BillingContact;
}
/**
 * An interface that declares the properties used to customize the appearance
 * and behavior of the card entry form.
 * For more information about applying custom styles to the card form, see the available [CardClassSelectors](https://developer.squareup.com/reference/sdks/web/payments/objects/CardClassSelectors) for styling.
 * @example
 * const cardOptions = getCardOptions();
 * const card = await payments.card(cardOptions);
 *
 * function getCardOptions() {
 *    return {
 *      "postalCode" : "12345",
 *      "style": {
 *        "input": {
 *          "color": "red",
 *        },
 *        // You can use media queries with valid selectors:
 *        "@media screen and (max-width: 600px)": {
 *          "input": {
 *            "fontSize": "12px",
 *          }
 *        }
 *      },
 *    };
 * };
 */
interface CardOptions {
    /**
     * @internal
     * Render card form with input labels adjacent to corresponding input field
     */
    includeInputLabels?: boolean;
    /**
     * Sets an initial value of the postal code input field in the card form.
     * @example
     * {
     *   "postalCode" : "12345",
     * };
     */
    postalCode?: string;
    /**
     * A map of .css classes and values that customize the style of the
     * input fields
     */
    style?: CardClassSelectors;
}
export { ALLOWED_INPUT_PROPERTIES, ALLOWED_COMPONENT_PROPERTIES, ALLOWED_COMPONENT_STATE_PROPERTIES, ALLOWED_INPUT_TEXT_PROPERTIES, ALLOWED_INPUT_ICON_PROPERTIES, CardOptions, CardBrand, CardClassSelectors, CardDetails, CardInputEvent, CardInputEventState, ClassSelectors, CardType, ClientClassSelectors, ComponentPropertyValues, ComponentStatePropertyValues, InputPropertyValues, InputTextPropertyValues, PrepaidType, StylePropertyList, };
