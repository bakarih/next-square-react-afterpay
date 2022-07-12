import * as React from 'react';
import FormProvider from '../../contexts/form/form.es.js';

function RenderPaymentForm({
  applicationId,
  cardTokenizeResponseReceived,
  locationId,
  children,
  formProps = {
    "aria-label": "Payment form",
    id: "rswps-form"
  },
  overrides,
  ...props
}, ref) {
  return /* @__PURE__ */ React.createElement(FormProvider, {
    ...props,
    applicationId,
    cardTokenizeResponseReceived,
    locationId,
    overrides
  }, /* @__PURE__ */ React.createElement("div", {
    "data-testid": "rswps-form",
    ...formProps,
    ref,
    role: "form"
  }, children));
}
const PaymentForm = React.forwardRef(RenderPaymentForm);

export { PaymentForm as default };
//# sourceMappingURL=payment-form.es.js.map
