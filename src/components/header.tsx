import { useAuth } from "@/hooks/useAuth";
import { BookMarked, Cog, Home, LogOut, User, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
            {isAdmin && (
              <Link to="/admin/users">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`relative group transition-all duration-200 ${
                    location.pathname.startsWith("/admin")
                      ? "bg-amber-600/10 text-amber-600 dark:text-amber-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  {location.pathname.startsWith("/admin") && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-600 dark:bg-amber-400 rounded-full" />
                  )}
                </Button>
              </Link>
            )}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <AnimatedThemeToggler />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                >
                  <Avatar className="h-9 w-9 border-2 border-green-500/30 hover:border-green-500/50 transition-colors">
                    <AvatarFallback className="bg-green-600 text-white text-sm">
                      {getInitials(user?.username || "U")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white/10 dark:bg-black/20 backdrop-blur-md  border-b border-white/20 dark:border-white/10 shadow-md"
              >
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="font-medium text-sm">{user?.username}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.role === "admin" ? "Administrador" : "Usuário"}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Cog className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin/users")}>
                      <Users className="mr-2 h-4 w-4" />
                      Gerenciar Usuários
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
