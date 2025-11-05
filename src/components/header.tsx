import { ModeToggle } from "./theme/toggler";
import { Button } from "./ui/button";

export function Header() {
  // const location = useLocation();

  return (
    <header className="fixed top-0  w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Gigantão
          </h1>
          <div className=" w-full">
            <Button variant={"outline"}>Sign in</Button>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
