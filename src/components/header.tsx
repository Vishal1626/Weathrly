import { useTheme } from "@/context/theme-provide";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <img
            src={isDark ? "./logo1.png" : "./logo1.png"}
            alt="Klimate Logo"
            className="h-20"
          />
        </Link>
        <div className="flex items-center gap-8">
          {/* Search */}
          <CitySearch />
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-800 cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 transition-transform duration-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 transition-transform duration-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
