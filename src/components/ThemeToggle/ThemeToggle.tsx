import {useTheme} from '@hooks/useTheme';

import {ThemeToggleButton} from './ThemeToggle.styled';

const ThemeToggle = () => {
  const {setTheme, theme} = useTheme();

  return <ThemeToggleButton onClick={setTheme} checked={theme === 'DARK'} />;
};
export default ThemeToggle;
