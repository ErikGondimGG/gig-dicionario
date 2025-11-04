import "./App.css";
import { ModeToggle } from "./components/theme/toggler";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <ModeToggle />
      <p className="text-3xl font-bold underline">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
