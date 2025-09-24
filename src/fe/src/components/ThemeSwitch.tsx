import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const toggleTheme = () => {
  const newTheme =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  // console.log("Theme switched to:", newTheme);
};

const ThemeSwitch = () => {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");

  const handleClick = () => {
    setIsDark(!isDark);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
    >
      {isDark ? <FaMoon /> : <FaSun />}
      <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
};

export default ThemeSwitch;
