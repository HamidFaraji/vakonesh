import { applyPropsToElement } from './applyPropsToElement';
import { setCurrentComponent } from "../current";
import { CORE_NODE, CUSTOM_NODE } from '../consts';
import { Node } from '../jsx/createElement';

export const render = (node: Node): HTMLElement => {
  let element: HTMLElement | undefined;

  switch(node.kind) {
    case CORE_NODE:
      // @ts-ignoe
      element = document.createElement(node.type);
      applyPropsToElement(element, node.props);

      break;
    case CUSTOM_NODE:
      setCurrentComponent(node);
      // @ts-ignore
      element = render(node.type(node.props));

      node.isMounted = true;
      node._el = element;

      break;
  }

  if (!element) {
    throw new Error('Error while rendering...');
  }

  new Array().concat(node.children).forEach((children) => {
    let childrenElement: HTMLElement | Text;

    if (typeof children === 'string') {
      childrenElement = document.createTextNode(children);
    } else {
      childrenElement = render(children);
    }

    element.appendChild(childrenElement);
  });

  return element;
};

export const reRender = (node: Node) => {
  node.lastHookID = -1;
  node._el?.replaceWith(render(node));
};
