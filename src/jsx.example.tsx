/* createElement функцию положил в e чтобы каждый раз её не прописывать так */
import React, { createElement as e, useState } from "react";

function App() {
  /* Этот массив называется картеж */
  const [count, setCount] = useState(0);

  /* return <h1>Hello React</h1>; */
  /* type: "h1", props: {}, children: "Hello From JS" */
  /* return React.createElement("h1", {}, "Hello From JS"); */
  return e("div", { className: "container" }, [
    e("h1", { className: "font-bold", key: 1 }, `Test JSX ${count}`),
    e(
      "button",
      {
        className: "py-2 px-4 border",
        key: 2,
        onClick: () => setCount(count + 1),
      },
      "Click me!"
    ),
  ]);
  /* Все это заменяет  return <h1>Hello React</h1>; этот ситаксис */
}

export default App;
