import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const THEME = 'theme';

const ETheme = {
  LIGHT: 'light',
  DARK: 'dark',
};
type TThemeColors = keyof typeof ETheme;

export interface IThemeContext {
  theme: TThemeColors;
  setTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [currentTheme, setCurrentTheme] = useState<TThemeColors>(() => {
    return (localStorage.getItem(THEME) as TThemeColors) || 'DARK';
  });

  const toggleTheme = useCallback(() => {
    setCurrentTheme((prevTheme) => (prevTheme === 'DARK' ? 'LIGHT' : 'DARK'));
  }, [setCurrentTheme]);

  useEffect(() => {
    localStorage.setItem(THEME, currentTheme);
  }, [currentTheme]);

  const value = useMemo(
    () => ({
      theme: currentTheme,
      setTheme: toggleTheme,
    }),
    [currentTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = (): IThemeContext => useContext(ThemeContext);
