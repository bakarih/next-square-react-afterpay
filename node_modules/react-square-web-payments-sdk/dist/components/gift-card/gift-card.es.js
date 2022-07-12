import * as React from 'react';
import { useForm } from '../../contexts/form/form.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { LoadingCard, PayButton } from './gift-card.styles.es.js';

function GiftCard({
  buttonProps = {
    id: "rswps-gift-card-button"
  },
  callbacks,
  children,
  focus,
  id = "rswps-gift-card-container",
  includeInputLabels,
  render,
  style,
  ...props
}) {
  const [giftCard, setGiftCard] = React.useState(() => void 0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const buttonRef = React.useRef(null);
  const options = React.useMemo(() => {
    const baseOptions = {
      includeInputLabels,
      style
    };
    return Object.keys(baseOptions).reduce((acc, key) => {
      if (baseOptions[key] !== void 0) {
        acc[key] = baseOptions[key];
      }
      return acc;
    }, {});
  }, [includeInputLabels, style]);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (!giftCard) {
      console.warn("Gift Card button was clicked, but no Gift Card instance was found.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await giftCard?.tokenize();
      if (result.status === "OK") {
        const tokenizedResult = await cardTokenizeResponseReceived(result);
        return tokenizedResult;
      }
      let message = `Tokenization failed with status: ${result.status}`;
      if (result?.errors) {
        message += ` and errors: ${JSON.stringify(result?.errors)}`;
        throw new Error(message);
      }
      console.warn(message);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  React.useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const start = async (signal2) => {
      const giftCard2 = await payments?.giftCard(options).then((res) => {
        if (!signal2.aborted) {
          setGiftCard(res);
          return res;
        }
        return null;
      });
      await giftCard2?.attach(`#${id}`);
      if (focus) {
        await giftCard2?.focus(focus);
      }
      if (signal2.aborted) {
        await giftCard2?.destroy();
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [payments, id]);
  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      giftCard?.addEventListener(callback, callbacks[callback]);
    }
  }
  useEventListener({
    listener: handlePayment,
    type: "click",
    element: buttonRef,
    options: {
      passive: true
    }
  });
  const Button = ({ isLoading, ...props2 }) => {
    const id2 = "rswp-gift-card-button";
    const disabled = isLoading || !giftCard || isSubmitting;
    return /* @__PURE__ */ React.createElement(PayButton, {
      ...props2,
      "aria-disabled": disabled,
      css: props2?.css,
      disabled,
      id: id2,
      ref: buttonRef,
      type: "button"
    }, props2?.children ?? "Pay with Gift Card");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ...props,
    "data-testid": "rswps-gift-card-container",
    id,
    style: { minHeight: 89 }
  }, !giftCard && /* @__PURE__ */ React.createElement(LoadingCard, null)), typeof render === "function" ? render(Button) : /* @__PURE__ */ React.createElement(Button, {
    ...buttonProps
  }, children ?? "Pay with Gift Card"));
}

export { GiftCard as default };
//# sourceMappingURL=gift-card.es.js.map
