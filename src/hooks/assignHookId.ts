import { Node } from '../jsx';

export const assignHookId = (node: Node) => {
  if (node.isMounted) {
    return ++node.lastHookID;
  } else {
    return Object.keys(node.hooks).length;
  }
};
