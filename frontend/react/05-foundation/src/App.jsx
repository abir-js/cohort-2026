import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interbalId = setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => {
      // console.log("Cleaning up...");
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    (async function loadPost() {
      try {
        setStatus("loading");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10",
          { signal: controller.signal },
        );
        const data = await response.json();
        setPosts(data);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setStatus("error");
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1>useEffect Hook</h1>
      
    </>
  );
}

export default App;
