import { Square } from './square';
declare global {
    interface Window {
        /**
         * The Web Payment SDK library adds a `Square` object to the browser's global window object under the property name `Square`;
         * @example
         * <script type="text/javascript" src="https://sandbox.web.squarecdn.com/v1/square.js"></script>
         * <script>
         *   if (window.Square) {
         *     const payments = Square.payments(applicationId, locationId);
         *   }
         * </script>
         */
        Square?: Square;
    }
}
export {};
export * from './payment-method';
export * from './contact';
export * from './errors';
export * from './money';
export * from './payment-request';
export * from './payments';
export * from './square';
export * from './verify-buyer';
