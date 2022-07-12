import * as React from 'react';
import { useForm } from '../../contexts/form/form.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { PayButton, SvgIcon } from './ach.styles.es.js';
import { transformPlaidEventName } from './ach.utils.es.js';

function Ach({
  accountHolderName,
  redirectURI,
  transactionId,
  callbacks,
  buttonProps,
  children,
  svgProps
}) {
  const [ach, setAch] = React.useState(() => void 0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { cardTokenizeResponseReceived, payments } = useForm();
  const buttonRef = React.useRef(null);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (!ach) {
      console.warn("ACH button was clicked, but no ACH instance was found.");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await ach.tokenize({
        accountHolderName
      });
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
      const ach2 = await payments?.ach({
        redirectURI,
        transactionId
      }).then((res) => {
        if (signal2?.aborted) {
          return;
        }
        setAch(res);
        return res;
      });
      if (signal2.aborted) {
        await ach2?.destroy();
      }
    };
    start(signal);
    return () => {
      abortController.abort();
    };
  }, [payments]);
  if (callbacks) {
    for (const callback of Object.keys(callbacks)) {
      ach?.addEventListener(transformPlaidEventName(callback), callbacks[callback]);
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
  const { isLoading, ...props } = buttonProps ?? {};
  const disabled = isLoading || !ach || isSubmitting;
  if (children) {
    return /* @__PURE__ */ React.createElement(PayButton, {
      ...props,
      "aria-disabled": disabled,
      disabled,
      ref: buttonRef,
      type: "button"
    }, children);
  }
  return /* @__PURE__ */ React.createElement(PayButton, {
    ...props,
    "aria-disabled": disabled,
    disabled,
    ref: buttonRef,
    type: "button"
  }, /* @__PURE__ */ React.createElement(SvgIcon, {
    fill: "none",
    height: "1em",
    viewBox: "0 0 36 24",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    ...svgProps
  }, /* @__PURE__ */ React.createElement("rect", {
    fill: "url(#prefix__paint0_linear)",
    height: 24,
    rx: 4,
    width: 36
  }), /* @__PURE__ */ React.createElement("path", {
    clipRule: "evenodd",
    d: "M18.509 6.16a.89.89 0 00-1.018 0l-6.124 4.285a.848.848 0 00-.325.96.873.873 0 00.833.595h1.75v4.286h-1.75a.866.866 0 00-.875.857c0 .473.392.857.875.857h12.25a.866.866 0 00.875-.857.866.866 0 00-.875-.857h-1.75V12h1.75c.38 0 .717-.24.833-.596a.848.848 0 00-.324-.959L18.509 6.16zm2.116 10.126V12h-5.25v4.286h5.25zM18 7.91l3.395 2.376h-6.79L18 7.91z",
    fill: "#fff",
    fillRule: "evenodd"
  }), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", {
    gradientUnits: "userSpaceOnUse",
    id: "prefix__paint0_linear",
    x1: 36,
    x2: 0,
    y1: 12,
    y2: 12
  }, /* @__PURE__ */ React.createElement("stop", {
    stopColor: "#01D09E"
  }), /* @__PURE__ */ React.createElement("stop", {
    offset: 1,
    stopColor: "#03E4AE"
  })))), /* @__PURE__ */ React.createElement("span", null, "Pay with Direct debit (ACH)"));
}

export { Ach, Ach as default };
//# sourceMappingURL=ach.es.js.map
