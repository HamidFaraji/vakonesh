import { createRoot, createElement } from './src/jsx';
import { useState, useMemo, useEffect } from "./src/hooks";

const useData = () => {
  const [one, setOne] = useState(2);
  const [two, setTwo] = useState(2);

  return {
    one,
    two,
    setOne,
    setTwo,
  };
};

const Button = () => {
  const { one, two, setOne, setTwo } = useData();

  const inner = createElement(() =>
    createElement("span", {}, `One ${hamid}`)
  );

  useEffect(() => {
    console.log('Mount');
  }, []);

  useEffect(() => {
    console.log('Updating');
  });

  useEffect(() => {
    console.log('Updating one');
  }, [one]);


  const hamid = useMemo(() => {
    return `Hello ${two}`;
  }, [two]);

  return createElement("div", {}, [
    createElement("button", {
      onClick: () => setOne((prevState) => prevState + 1),
    }, `One ${one}`),
    inner,
    createElement("button", {
      onClick: () => setTwo((prevState) => prevState + 1),
    }, `Two ${two}`),
  ]);
};

const appElement = createElement("main", {}, [
  createElement("h1", {},
    createElement("div", {}, "This is a DIV tag inside a H1")
  ),
  createElement("span", {}, "This is a span tag with text"),
  createElement(Button),
]);

const mountPoint = document.getElementById("app");
const root = createRoot(mountPoint);

root.render(appElement);
