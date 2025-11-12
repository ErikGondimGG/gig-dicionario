import { Header } from "./components/header";
import { SpinningText } from "./components/ui/spinning-text";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <div className="h-screen w-screen flex justify-center items-center overflow-hidden relative text-center">
        <div>
          <SpinningText className="">DADOS DADOS DADOS</SpinningText>
        </div>
      </div>
    </div>
  );
}

export default App;
