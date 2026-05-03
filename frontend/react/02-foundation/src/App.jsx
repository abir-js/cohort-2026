const shows = [
  {
    id: 1,
    title: "The Component Returns",
    time: "10:00 AM",
    hall: "Hall A",
  },
  {
    id: 2,
    title: "State and Props",
    time: "11:00 AM",
    hall: "Hall B",
  },
  {
    id: 3,
    title: "Lifecycle Methods",
    time: "12:00 PM",
    hall: "Hall C",
  },
];

function App() {
  return (
    <>
      <h1>Hello from project 2</h1>
      <section>
        {shows.map((show) => (
          <div key={show.id}>
            <h2>{show.title}</h2>
            <p>Time: {show.time}</p>
            <p>Hall: {show.hall}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default App;
