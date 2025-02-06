import {useEffect, useState} from 'react';

const THEME = 'theme';

const ETheme = {
  LIGHT: 'light',
  DARK: 'dark',
};
type TThemeColors = keyof typeof ETheme;

interface ITheme {
  theme: TThemeColors;
  setTheme: () => void;
}

export const useTheme = (): ITheme => {
  const [currentTheme, setCurrentTheme] = useState<TThemeColors>(() => {
    return (
      (localStorage.getItem(THEME) as TThemeColors) ||
      (ETheme.DARK as TThemeColors)
    );
  });
  console.log('currentTheme', currentTheme);
  const toggleTheme = () =>
    setCurrentTheme((prevTheme) => (prevTheme === 'DARK' ? 'LIGHT' : 'DARK'));

  useEffect(() => {
    localStorage.setItem(THEME, currentTheme);
  }, [currentTheme, setCurrentTheme]);

  return {
    setTheme: toggleTheme,
    theme: currentTheme,
  };
};
