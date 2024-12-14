import { assignHookId } from './assignHookId';
import { areDepsEqual } from "../utils";
import { getCurrentComponent } from "../current";

export const useEffect = (callback: () => void, deps?: Array<any>) => {
  const component = getCurrentComponent();
  const effectID = assignHookId(component);
  const prevDeps = component.hooks[effectID] || [];

  const isDepsChanged = !areDepsEqual(prevDeps, deps);

  if (isDepsChanged || !component.isMounted) {
    component.hooks[effectID] = deps;
    callback();
  }
};
