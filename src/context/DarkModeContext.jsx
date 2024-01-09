import { useContext } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useEffect } from "react";

const DarkModeContext = createContext();

//get darkmode from default setting on windows
const currDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    currDarkMode,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("You can't call useDarkMode outside of its Provider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
