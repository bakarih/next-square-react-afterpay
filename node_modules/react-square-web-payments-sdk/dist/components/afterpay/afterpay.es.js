import * as React from 'react';
import AfterpayProvider, { useAfterpay } from '../../contexts/afterpay/afterpay.es.js';
export { AfterpayContext, default as AfterpayProvider } from '../../contexts/afterpay/afterpay.es.js';
import { useEventListener } from '../../hooks/use-event-listener.es.js';
import { useForm } from '../../contexts/form/form.es.js';
import { ButtonLoader } from './afterpay.styles.es.js';

function AfterpayButton({
  Button,
  buttonColor = "black",
  buttonType = "buy_now_with_afterpay",
  finalCtaButtonType = "buy_now",
  id = "rswps-afterpay-button",
  ...props
}) {
  const containerRef = React.useRef(null);
  const afterpay = useAfterpay();
  const { cardTokenizeResponseReceived } = useForm();
  const options = React.useMemo(() => ({
    buttonColor,
    buttonType,
    finalCtaButtonType,
    useCustomButton: Boolean(Button)
  }), [Button, buttonColor, buttonType, finalCtaButtonType]);
  const handlePayment = async (e) => {
    e.stopPropagation();
    if (!afterpay) {
      console.warn("Afterpay/Clearpay button was clicked, but no Afterpay/Clearpay instance was found.");
      return;
    }
    try {
      const result = await afterpay.tokenize();
      if (result.status === "OK") {
        return cardTokenizeResponseReceived(result);
      }
      let message = `Tokenization failed with status: ${result?.status}`;
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
    if (afterpay) {
      afterpay?.attach(`#${id}`, options);
    }
    return () => {
      if (afterpay) {
        afterpay?.destroy();
      }
    };
  }, [afterpay]);
  useEventListener({
    listener: handlePayment,
    type: "click",
    element: containerRef,
    options: {
      passive: true
    }
  });
  if (Button) {
    return /* @__PURE__ */ React.createElement(Button, {
      ...props,
      id,
      ref: containerRef
    });
  }
  return /* @__PURE__ */ React.createElement("div", {
    ...props,
    id,
    ref: containerRef
  }, !afterpay ? /* @__PURE__ */ React.createElement(ButtonLoader, null) : null);
}
function AfterpayMessage({
  badgeTheme = "black-on-mint",
  component,
  id = "rswps-afterpay-message",
  modalLinkStyle = "circled-info-icon",
  modalTheme = "mint",
  size = "md",
  ...props
}) {
  const messageRef = React.useRef(null);
  const afterpay = useAfterpay();
  const options = React.useMemo(() => ({
    badgeTheme,
    modalLinkStyle,
    modalTheme,
    size
  }), [badgeTheme, modalLinkStyle, modalTheme, size]);
  React.useEffect(() => {
    const start = async () => {
      await afterpay?.attachMessaging(`#${id}`, options);
    };
    if (afterpay && !component?.Message) {
      start();
    }
  }, [afterpay, component?.Message, options]);
  const onClick = async (e) => {
    e.stopPropagation();
    afterpay?.displayInformationModal({ modalTheme });
  };
  useEventListener({
    listener: onClick,
    type: "click",
    element: messageRef,
    options: {
      passive: true
    }
  });
  const Message = component?.Message;
  if (Message) {
    return /* @__PURE__ */ React.createElement(Message, {
      ...props,
      id,
      ref: messageRef
    });
  }
  return /* @__PURE__ */ React.createElement("div", {
    ...props,
    id
  });
}
function AfterpayWidget({ includeBranding, id = "rswps-afterpay-widget", ...props }) {
  const containerRef = React.useRef(null);
  const afterpay = useAfterpay();
  React.useEffect(() => {
    const start = async () => {
      await afterpay?.attachCheckoutWidget(`#${id}`, {
        includeBranding
      });
    };
    if (afterpay) {
      start();
    }
  }, [afterpay, includeBranding]);
  return /* @__PURE__ */ React.createElement("div", {
    ...props,
    id,
    ref: containerRef
  });
}
function Afterpay(props) {
  return /* @__PURE__ */ React.createElement(AfterpayProvider, null, /* @__PURE__ */ React.createElement(AfterpayButton, {
    ...props
  }));
}

export { AfterpayButton, AfterpayMessage, AfterpayWidget, Afterpay as default };
//# sourceMappingURL=afterpay.es.js.map
