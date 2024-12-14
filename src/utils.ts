export const idIterator = (function* () {
  let i = 1;

  while (true) {
    yield i++;
  }
})();

export const areDepsEqual = (prevDeps?: Array<any>, nextDeps?: Array<any>): boolean => {
  if (!prevDeps || !nextDeps) {
    return false;
  }

  if (prevDeps?.length !== nextDeps?.length) {
    return false
  };

  return nextDeps.every((dep, index) => dep === prevDeps[index]);
};
