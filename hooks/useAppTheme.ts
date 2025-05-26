import { useTheme } from '@/store/themeStore';
import { getColors, getMealColors } from '@/constants/colors';

// Hook to get the current theme colors
export const useAppTheme = () => {
  const { isDarkMode } = useTheme();
  
  return {
    isDarkMode,
    colors: getColors(isDarkMode),
    mealColors: getMealColors(isDarkMode),
  };
};