import { BookMarked, Cog, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { Button } from "./ui/button";

export function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 w-full z-50  bg-white/10 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center h-16">
          <Link to="/">
            <h1 className="text-xl font-galactican text-gray-900 dark:text-gray-100 cursor-pointer">
              <AnimatedGradientText colorFrom="#006600" colorTo="#11ff11">
                Gigantão
              </AnimatedGradientText>
            </h1>
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className={`relative group transition-all duration-200 ${
                  location.pathname === "/"
                    ? "bg-green-600/10 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-950/20"
                }`}
              >
                <Home className="w-4 h-4" />
                {location.pathname === "/" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-600 dark:bg-green-400 rounded-full" />
                )}
              </Button>
            </Link>
            <Link to="/dictionary">
              <Button
                variant="ghost"
                size="sm"
                className={`relative group transition-all duration-200 ${
                  location.pathname === "/dictionary"
                    ? "bg-green-600/10 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-950/20"
                }`}
              >
                <BookMarked className="w-4 h-4" />
                {location.pathname === "/dictionary" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-600 dark:bg-green-400 rounded-full" />
                )}
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant="ghost"
                size="sm"
                className={`relative group transition-all duration-200 ${
                  location.pathname === "/settings"
                    ? "bg-green-600/10 text-green-600 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-950/20"
                }`}
              >
                <Cog className="w-4 h-4" />
                {location.pathname === "/settings" && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-green-600 dark:bg-green-400 rounded-full" />
                )}
              </Button>
            </Link>
          </div>
          <div className="ml-auto">
            <AnimatedThemeToggler />
          </div>
        </div>
      </div>
    </header>
  );
}
