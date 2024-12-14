import { EVENTS, RESERVED_PROPS } from '../consts';

export const applyPropsToElement = (element: HTMLElement, props: Record<any, any>) => {
  Object.entries(props).forEach(([propName, propValue]) => {
    if (EVENTS.includes(propName)) {
      const eventType = propName.slice(2).toLowerCase();

      element.addEventListener(eventType, () => {
        propValue();
      });
    } else if (!RESERVED_PROPS.includes(propName)) {
      element.setAttribute(propName, propValue);
    }
  });
};
