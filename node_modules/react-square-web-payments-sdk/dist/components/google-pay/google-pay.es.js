import * as React from 'react';
import { useForm } from '../../contexts/form/form.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { ButtonLoader } from './google-pay.styles.es.js';

const GooglePay = ({
  buttonColor,
  buttonSizeMode = "fill",
  buttonType = "long",
  id = "rswps-google-pay-container",
  ...props
}) => {
  const [googlePay, setGooglePay] = React.useState(() => void 0);
  const { cardTokenizeResponseReceived, createPaymentRequest, payments } = useForm();
  const containerRef = React.useRef(null);
  const options = React.useMemo(() => {
    const baseOptions = {
      buttonColor,
      buttonSizeMode,
      buttonType
    };
    return Object.keys(baseOptions).reduce((acc, key) => {
      if (baseOptions[key] !== void 0) {
        acc[key] = baseOptions[key];
      }
      return acc;
    }, {});
  }, [buttonColor, buttonSizeMode, buttonType]);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (!googlePay) {
      console.warn("Google Pay button was clicked, but no Google Pay instance was found.");
      return;
    }
    try {
      const result = await googlePay.tokenize();
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
        const googlePay2 = await payments?.googlePay(paymentRequest).then((res) => {
          if (signal2?.aborted) {
            return;
          }
          setGooglePay(res);
          return res;
        });
        await googlePay2?.attach(`#${id}`, options);
        if (signal2.aborted) {
          await googlePay2?.destroy();
        }
      } catch (error) {
        console.error("Initializing Google Pay failed", error);
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [createPaymentRequest, payments, options]);
  useEventListener({
    listener: handlePayment,
    type: "click",
    element: containerRef,
    options: {
      passive: true
    }
  });
  return /* @__PURE__ */ React.createElement("div", {
    ...props,
    id,
    ref: containerRef
  }, !googlePay ? /* @__PURE__ */ React.createElement(ButtonLoader, null) : null);
};

export { GooglePay as default };
//# sourceMappingURL=google-pay.es.js.map
