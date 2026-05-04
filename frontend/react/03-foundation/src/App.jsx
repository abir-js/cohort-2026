import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import AvatarCard from "./components/AvatarCard.jsx";
const avatars = [
  {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV",
  },
  {
    id: 2,
    name: "Flux",
    role: "State Keeper",
    power: "useState",
    initials: "FX",
  },
  {
    id: 3,
    name: "Memo",
    role: "Optimizer",
    power: "Memoization",
    initials: "MM",
  },
];

function Shell({ title, children }) {
  return (
    <section>
      <p>Resuable shell</p>
      <h2>{title}</h2>
      <p>{children}</p>
      <p>Test Paragraph</p>
    </section>
  );
}

function App() {
  return (
    <>
      <h1>Children in React</h1>
      <Shell title="Batman">
        <div>
          <h3>This is inside Shell</h3>
          <p>This is a sample paragraph inside the shell.</p>
        </div>
      </Shell>
      <h1>Hello from Abir</h1>
      <section>
        {avatars.map((avatar) => (
          <AvatarCard
            avatar={avatar}
            level={avatar.id === 1 ? "Captain" : undefined}
          />
        ))}
      </section>
    </>
  );
}

export default App;
