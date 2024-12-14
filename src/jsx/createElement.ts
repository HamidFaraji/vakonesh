import { idIterator } from '../utils';
import { CORE_NODE, CUSTOM_NODE } from '../consts';

export type FC = (props: Record<any, any>) => Node
export type JSXType = FC | string;
export type Children = Array<Node> | Node | string;

export interface Node {
  id: number,
  name: string;
  kind: Symbol;
  type: JSXType;
  isMounted: boolean,
  lastHookID: number,
  hooks: Record<any, any>,
  props: Record<any, any>,
  children?: Children,
  _el?: HTMLElement;
}

export const createElement = (type: any, props: Record<any, any> = {}, children: Children = []) => {
  const node: Node = {
    id: idIterator.next().value,
    name: 'U/A',
    kind: Symbol('U/A'),
    isMounted: false,
    lastHookID: -1,
    hooks: {},
    type,
    children,
    props,
  };

  if (!type) {
    console.error(`
      You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.  
    `);
  }

  if (typeof type === "string") {
    node.kind = CORE_NODE;
    node.name = type;
  } else if (typeof type === "function") {
    node.kind = CUSTOM_NODE;
    node.name = type.name;
  }

  return node;
};
