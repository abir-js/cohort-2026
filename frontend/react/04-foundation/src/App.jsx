import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue((prev) => prev + 1);
  };

  const decrease = () => {
    setValue((prev) => prev - 1);
  };

  return (
    <>
      <div>
        <p>{value}</p>
        <button onClick={increase}>➕</button>
        <button onClick={decrease}>➖</button>
      </div>
    </>
  );
}

export default App;
