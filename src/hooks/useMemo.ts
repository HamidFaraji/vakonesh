import { assignHookId } from './assignHookId';
import { getCurrentComponent } from "../current";
import { areDepsEqual } from '../utils';

export const useMemo = (memoizer: () => any, deps?: Array<any>) => {
  const component = getCurrentComponent();
  const memoID = assignHookId(component);
  const [prevDeps, prevValue] = component.hooks[memoID] || [];

  const isDepsChanged = !areDepsEqual(prevDeps, deps);

  if (isDepsChanged || !component.isMounted) {
    const newValue = memoizer();

    component.hooks[memoID] = [
      deps,
      newValue,
    ];

    return newValue;
  }

  return prevValue;
};
