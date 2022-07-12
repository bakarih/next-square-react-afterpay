import * as React from 'react';
import { useForm } from '../../contexts/form/form.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { ApplePayContainer } from './apple-pay.styles.es.js';

function ApplePay({ id = "rswps-apple-pay", ...props }) {
  const [applePay, setApplePay] = React.useState(() => void 0);
  const { cardTokenizeResponseReceived, createPaymentRequest, payments } = useForm();
  const containerRef = React.useRef(null);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (!applePay) {
      console.warn("Apple Pay button was clicked, but no Apple Pay instance was found.");
      return;
    }
    try {
      const result = await applePay.tokenize();
      if (result.status === "OK") {
        return cardTokenizeResponseReceived(result);
      }
      let message = `Tokenization failed with status: ${result.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;
        throw new Error(message);
      }
      console.warn(message);
    } catch (error) {
      console.error(error);
    }
  };
  React.useEffect(() => {
    if (!createPaymentRequest) {
      throw new Error("`createPaymentRequest()` is required when using digital wallets");
    }
    const abortController = new AbortController();
    const { signal } = abortController;
    const start = async (signal2) => {
      const paymentRequest = payments?.paymentRequest(createPaymentRequest);
      if (!paymentRequest) {
        throw new Error("`paymentRequest` is required when using digital wallets");
      }
      try {
        const applePay2 = await payments?.applePay(paymentRequest).then((res) => {
          if (signal2?.aborted) {
            return;
          }
          setApplePay(res);
          return res;
        });
        if (signal2.aborted) {
          await applePay2?.destroy();
        }
      } catch (error) {
        console.error("Initializing Apple Pay failed", error);
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [createPaymentRequest, payments]);
  useEventListener({
    listener: handlePayment,
    type: "click",
    element: containerRef,
    options: {
      passive: true
    }
  });
  return /* @__PURE__ */ React.createElement(ApplePayContainer, {
    ...props,
    css: {
      display: applePay ? "block" : "none",
      opacity: applePay ? 1 : 0.5,
      pointerEvents: applePay ? "auto" : "none",
      visibility: applePay ? "visible" : "hidden"
    },
    id,
    ref: containerRef
  });
}

export { ApplePay as default };
//# sourceMappingURL=apple-pay.es.js.map
