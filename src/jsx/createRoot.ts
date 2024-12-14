import { Node } from './createElement';
import { render } from '../renderer/render';

export const createRoot = (container: HTMLElement | null) => {
  if (!container) {
    throw new Error('Target container is not a DOM element.');
  }

  return {
    render: (node: Node) => {
      container.appendChild(render(node));
    },
  };
};
