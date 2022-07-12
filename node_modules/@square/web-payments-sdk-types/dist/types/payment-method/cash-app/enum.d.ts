/**
 * @internal
 * The theme of the Cash App button
 */
declare enum CashAppButtonTheme {
    LIGHT = "light",
    DARK = "dark"
}
/**
 * @internal
 * Union of [CashAppButtonTheme](https://developer.squareup.com/reference/sdks/web/payments/enums/CashAppButtonTheme) values.
 */
declare type CashAppButtonThemeValues = `${CashAppButtonTheme}`;
/**
 * @internal
 * The button shape for the Cash App button
 */
declare enum CashAppButtonShape {
    SQUARED = "Squared",
    SEMIROUNDED = "Semirounded",
    ROUNDED = "Rounded"
}
/**
 * @internal
 * Union of [CashAppButtonShape](https://developer.squareup.com/reference/sdks/web/payments/enums/CashAppButtonShape) values.
 */
declare type CashAppButtonShapeValues = `${CashAppButtonShape}`;
export { CashAppButtonShape, CashAppButtonShapeValues, CashAppButtonTheme, CashAppButtonThemeValues, };
