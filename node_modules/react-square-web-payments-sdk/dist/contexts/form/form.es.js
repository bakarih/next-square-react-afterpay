import * as React from 'react';
import { payments } from '../../node_modules/@square/web-sdk/dist/payments.es.js';
import ErrorScreen from '../../components/error-screen/error-screen.es.js';
import { useDynamicCallback } from '../../hooks/use-dynamic-callback.es.js';

const FormContext = React.createContext({
  cardTokenizeResponseReceived: null,
  createPaymentRequest: null,
  payments: null
});
function FormProvider({ applicationId, locationId, children, overrides, ...props }) {
  const [instance, setInstance] = React.useState();
  const [createPaymentRequest] = React.useState(() => props.createPaymentRequest?.());
  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    async function loadPayment(signal2) {
      await payments(applicationId, locationId, overrides).then((res) => {
        if (res === null) {
          throw new Error("Square Web Payments SDK failed to load");
        }
        if (signal2?.aborted) {
          return;
        }
        setInstance(res);
        return res;
      });
    }
    if (applicationId && locationId) {
      loadPayment(signal);
    }
    return () => {
      abortController.abort();
    };
  }, [applicationId, locationId]);
  const cardTokenizeResponseReceived = async (rest) => {
    if (rest.errors || !props.createVerificationDetails) {
      await props.cardTokenizeResponseReceived(rest);
      return;
    }
    const verifyBuyerResults = await instance?.verifyBuyer(String(rest.token), props.createVerificationDetails());
    await props.cardTokenizeResponseReceived(rest, verifyBuyerResults);
  };
  const cardTokenizeResponseReceivedCallback = useDynamicCallback(cardTokenizeResponseReceived);
  if (!applicationId || !locationId) {
    return /* @__PURE__ */ React.createElement(ErrorScreen, null);
  }
  if (!instance)
    return null;
  const context = {
    cardTokenizeResponseReceived: cardTokenizeResponseReceivedCallback,
    createPaymentRequest,
    payments: instance
  };
  return /* @__PURE__ */ React.createElement(FormContext.Provider, {
    value: context
  }, children);
}
const useForm = () => {
  const context = React.useContext(FormContext);
  if (context === void 0) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};

export { FormContext, FormProvider as default, useForm };
//# sourceMappingURL=form.es.js.map
