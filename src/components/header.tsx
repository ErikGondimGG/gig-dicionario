import { BookMarked, Cog, Home } from "lucide-react";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { Button } from "./ui/button";

export function Header() {
  // const location = useLocation();

  return (
    <header className="fixed top-0 max-h-32  w-full z-50 bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <h1 className="text-xl font-galactican text-gray-900 dark:text-gray-100">
            <AnimatedGradientText colorFrom="#006600" colorTo="#11ff11">
              Gigantão
            </AnimatedGradientText>
          </h1>
          <div className="w-full flex justify-between px-5">
            <div className=" flex gap-3">
              <Button
                variant="secondary"
                className="rounded-none h-full border-0 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md hover:dark:shadow-white/50 hover:shadow-black/50 ease-in-out"
              >
                <Home />
              </Button>
              <Button
                variant="secondary"
                className="rounded-none h-full border-0 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md hover:dark:shadow-white/50 hover:shadow-black/50 ease-in-out"
              >
                <BookMarked />
              </Button>
              <Button
                variant="secondary"
                className="rounded-none h-full border-0 transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md hover:dark:shadow-white/50 hover:shadow-black/50 ease-in-out"
              >
                <Cog />
              </Button>
            </div>
            <div>
              {/* <InteractiveHoverButton>Sign in</InteractiveHoverButton> */}
            </div>
          </div>
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  );
}
