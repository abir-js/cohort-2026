import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });

  return (
    <>
      <h1>useEffect Hook</h1>
      <p>Count: {count}</p>
    </>
  );
}

export default App;
