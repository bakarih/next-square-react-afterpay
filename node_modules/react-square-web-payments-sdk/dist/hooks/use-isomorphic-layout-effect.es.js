import * as React from 'react';

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export { useIsomorphicLayoutEffect };
//# sourceMappingURL=use-isomorphic-layout-effect.es.js.map
