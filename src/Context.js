import { createContext, useState } from "react";
import { languageOptions, dictionaryList } from "./languages/Languages";
import { themeList } from "./styles/theme";
import { ThemeProvider } from "styled-components";

export const AppContext = createContext({
  userLanguage: "fr",
  dictionary: dictionaryList.fr,
  userTheme: "light",
  theme: themeList.light,
});

export function AppProvider({ children }) {
  let navigatorLanguage = navigator.language.split("-")[0];
  if (navigatorLanguage !== "fr" && navigatorLanguage !== "fr") {
    navigatorLanguage = null;
  }
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("rcml-lang") ||
      (navigatorLanguage !== null ? navigatorLanguage : "fr")
  );
  const [userTheme, setUserTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected) => {
      const newLanguage = languageOptions[selected] ? selected : "fr";
      setUserLanguage(newLanguage);
      localStorage.setItem("rcml-lang", newLanguage);
    },
    userTheme,
    theme: themeList[userTheme],
    userThemeChange: () => {
      const newTheme = userTheme === "light" ? "dark" : "light";
      setUserTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
  };

  return (
    <AppContext.Provider value={provider}>
      <ThemeProvider theme={provider.theme}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}

export function fillDictionaryValueArguments(string, ...args) {
  let newValue = string;
  args.forEach((arg, i) => {
    newValue = newValue.replace("{" + i + "}", arg);
  });
  return newValue;
}
