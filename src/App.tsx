import { Header } from "./components/header";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex flex-auto justify-center items-center">
        <p className="text-3xl font-bold underline">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
