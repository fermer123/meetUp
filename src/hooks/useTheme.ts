import {useCallback, useMemo} from 'react';

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
  const currentTheme = useMemo(
    () =>
      (localStorage.getItem(THEME) as TThemeColors) ||
      (ETheme.DARK as TThemeColors),
    [],
  );

  const setTheme = useCallback(() => {
    const newTheme = currentTheme === ETheme.DARK ? 'light' : 'dark';
    localStorage.setItem(THEME, newTheme);
  }, [currentTheme]);

  return {
    setTheme,
    theme: currentTheme,
  };
};
