import { useTheme } from "@/context/theme-provide";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className=" ml-12 flex h-16 items-center justify-between px-4">
        {" "}
        <Link to={"/"}>
          <img
            src={isDark ? "./logo1.png" : "./logo1.png"}
            alt="Klimate Logo"
            className="h-20"
          />
        </Link>
        <div>
          {/* search */}
          {/*theme toggle*/}
          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex mr-12 items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className=" h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className=" h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
