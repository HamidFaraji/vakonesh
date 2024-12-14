import { Node } from './jsx';

interface Current {
  component: Node | null,
  renderEngine?: {
    createElement: () => {

    },
    replaceElement: () => {

    },
    createText: () => {

    },
    appendChild: () => {

    },
    addEventListener: () => {

    },
    removeEventListener: () => {

    },
  }
}

const current: Current = {
  component: null,
};

export const setCurrentComponent = (component: Node) => {
  current.component = component;
};

export const getCurrentComponent = (): Node => {
  if (!current.component) {
    throw new Error('There is an error while accessing the current component');
  }

  return current.component;
};
