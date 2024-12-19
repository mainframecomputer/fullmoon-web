import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(
          theme === "system" ? "light" : theme === "light" ? "dark" : "system"
        )
      }
      className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary/80"
    >
      <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="text-xs">
        {theme === "system" ? "System" : theme === "light" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
