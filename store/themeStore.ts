import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark: boolean) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Hook to get the current theme based on device settings and user preference
export const useTheme = () => {
  const deviceTheme = useColorScheme();
  const { isDarkMode } = useThemeStore();
  
  // If user has explicitly set a theme, use that
  // Otherwise, follow the device theme
  return {
    isDarkMode: isDarkMode ?? deviceTheme === 'dark',
  };
};