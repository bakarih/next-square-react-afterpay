import * as React from 'react';
import { useForm } from '../form/form.es.js';

const AfterpayContext = React.createContext(null);
function AfterpayProvider({ children, onShippingAddressChange, onShippingOptionChange }) {
  const [afterpay, setAfterpay] = React.useState(null);
  const { createPaymentRequest, payments } = useForm();
  if (!createPaymentRequest) {
    throw new Error("`createPaymentRequest()` is required when using digital wallets");
  }
  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const start = async (signal2) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);
      if (!paymentRequest) {
        throw new Error("`paymentRequest` is required when using digital wallets");
      }
      if (onShippingAddressChange) {
        paymentRequest.addEventListener("afterpay_shippingaddresschanged", onShippingAddressChange);
      }
      if (onShippingOptionChange) {
        paymentRequest.addEventListener("afterpay_shippingoptionchanged", onShippingOptionChange);
      }
      const afterpay2 = await payments?.afterpayClearpay(paymentRequest).then((res) => {
        if (!signal2.aborted) {
          setAfterpay(res);
          return res;
        }
        return null;
      });
      if (signal2.aborted) {
        await afterpay2?.destroy();
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [createPaymentRequest, payments]);
  return /* @__PURE__ */ React.createElement(AfterpayContext.Provider, {
    value: afterpay
  }, children);
}
function useAfterpay() {
  const context = React.useContext(AfterpayContext);
  if (context === void 0) {
    throw new Error("`useAfterpay()` must be used within an `<AfterpayProvider>`");
  }
  return context;
}

export { AfterpayContext, AfterpayProvider as default, useAfterpay };
//# sourceMappingURL=afterpay.es.js.map
