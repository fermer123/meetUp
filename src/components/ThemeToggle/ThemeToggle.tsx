import {useTheme} from '@provider/ThemeProvider';

import {ThemeToggleButton} from './ThemeToggle.styled';

const ThemeToggle = () => {
  const {setTheme, theme} = useTheme();

  return <ThemeToggleButton onClick={setTheme} checked={theme === 'DARK'} />;
};
export default ThemeToggle;
