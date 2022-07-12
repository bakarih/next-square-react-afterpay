import * as React from 'react';
import './error-screen.styles.es.js';

function RenderErrorScreen({ isDevelopment = "production" === "development" }, ref) {
  {
    throw new Error("Please contact your developer to provide the required parameters to use the Web Payments SDK.");
  }
}
const ErrorScreen = React.forwardRef(RenderErrorScreen);

export { ErrorScreen as default };
//# sourceMappingURL=error-screen.es.js.map
