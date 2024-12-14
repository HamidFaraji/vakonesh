import { assignHookId } from './assignHookId';
import { getCurrentComponent } from "../current";
import { reRender } from '../renderer';

export const useState = (initialValue: any) => {
  const component = getCurrentComponent();
  const stateID = assignHookId(component);

  if (!component.isMounted) {
    component.hooks[stateID] = initialValue;
  }

  const stateValue = component.hooks[stateID];

  const setState = (newStateValue: any) => {
    if (typeof newStateValue === "function") {
      component.hooks[stateID] = newStateValue(stateValue);
    } else {
      component.hooks[stateID] = newStateValue;
    }

    reRender(component);
  };

  return [stateValue, setState];
};
