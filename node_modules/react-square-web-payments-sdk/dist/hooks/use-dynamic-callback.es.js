import * as React from 'react';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.es.js';

function useDynamicCallback(callback) {
  const ref = React.useRef(callback);
  useIsomorphicLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);
  return React.useCallback((...args) => ref.current(...args), []);
}

export { useDynamicCallback };
//# sourceMappingURL=use-dynamic-callback.es.js.map
