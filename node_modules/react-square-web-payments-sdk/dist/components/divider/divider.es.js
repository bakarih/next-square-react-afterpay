import * as React from 'react';
import { Line, SpanText } from './divider.styles.es.js';

const Divider = ({ children, spanProps, ...props }) => /* @__PURE__ */ React.createElement(Line, {
  ...props
}, /* @__PURE__ */ React.createElement(SpanText, {
  ...spanProps
}, children ?? "or"));

export { Divider as default };
//# sourceMappingURL=divider.es.js.map
