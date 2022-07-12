import * as React from 'react';

const getRefElement = (element) => {
  if (element && "current" in element) {
    return element.current;
  }
  return element;
};
const isSsr = !(typeof window !== "undefined" && window.document?.createElement);
function useEventListener({ type, listener, element = isSsr ? void 0 : window, options }) {
  const savedListener = React.useRef();
  React.useEffect(() => {
    savedListener.current = listener;
  }, [listener]);
  const handleEventListener = React.useCallback((event) => {
    savedListener.current?.(event);
  }, []);
  React.useEffect(() => {
    const target = getRefElement(element);
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
}

export { getRefElement, useEventListener };
//# sourceMappingURL=use-event-listener.es.js.map
