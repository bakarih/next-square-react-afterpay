import * as React from 'react';
import { useForm } from '../../contexts/form/form.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { LoadingCard, PayButton } from './credit-card.styles.es.js';

function CreditCard({
  buttonProps,
  callbacks,
  children,
  focus = "cardNumber",
  id = "rswps-card-container",
  includeInputLabels,
  postalCode,
  recalculateSize,
  render,
  style,
  ...props
}) {
  const [card, setCard] = React.useState(() => void 0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const buttonRef = React.useRef(null);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const options = React.useMemo(() => {
    const baseOptions = {
      includeInputLabels,
      postalCode,
      style
    };
    return Object.keys(baseOptions).reduce((acc, key) => {
      if (baseOptions[key] !== void 0) {
        acc[key] = baseOptions[key];
      }
      return acc;
    }, {});
  }, [includeInputLabels, postalCode, style]);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (buttonProps?.isLoading)
      return;
    if (!card) {
      console.warn("Credit Card button was clicked, but no Credit Card instance was found.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await card.tokenize();
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
      const card2 = await payments?.card(options).then((res) => {
        if (!signal2.aborted) {
          setCard(res);
          return res;
        }
        return null;
      });
      await card2?.attach(`#${id}`);
      if (focus) {
        await card2?.focus(focus);
      }
      if (signal2.aborted) {
        await card2?.destroy();
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [payments, id]);
  React.useEffect(() => {
    if (card && focus) {
      card.focus(focus);
    }
  }, [card, focus]);
  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      card?.addEventListener(callback, callbacks[callback]);
    }
  }
  if (recalculateSize) {
    recalculateSize(card?.recalculateSize);
  }
  useEventListener({
    listener: handlePayment,
    type: "click",
    element: buttonRef,
    options: {
      passive: true
    }
  });
  const Button = ({ children: children2, isLoading, ...props2 }) => {
    const id2 = "rswp-card-button";
    const disabled = isLoading || !card || isSubmitting;
    return /* @__PURE__ */ React.createElement(PayButton, {
      ...props2,
      "aria-disabled": disabled,
      css: props2?.css,
      disabled,
      id: id2,
      ref: buttonRef,
      type: "button"
    }, children2 ?? "Pay");
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ...props,
    "data-testid": "rswps-card-container",
    id,
    style: { minHeight: 89 }
  }, !card && /* @__PURE__ */ React.createElement(LoadingCard, null)), typeof render === "function" ? render(Button) : /* @__PURE__ */ React.createElement(Button, {
    ...buttonProps
  }, children ?? "Pay"));
}

export { CreditCard as default };
//# sourceMappingURL=credit-card.es.js.map
