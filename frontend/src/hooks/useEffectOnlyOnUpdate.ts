import { DependencyList, useEffect, useRef } from 'react';

const useEffectOnlyOnUpdate = (callback: () => void, dependencies: DependencyList): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      return callback();
    } else {
      didMount.current = true;
    }
  }, dependencies);
};

export default useEffectOnlyOnUpdate;
