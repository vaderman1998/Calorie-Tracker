// App color schemes
const lightColors = {
  primary: "#4A90E2", // Soft blue
  secondary: "#5BD3B8", // Mint green
  background: "#FFFFFF",
  card: "#F8F9FA",
  text: "#333333",
  textSecondary: "#6C757D",
  border: "#E9ECEF",
  success: "#28A745",
  warning: "#FFC107",
  error: "#DC3545",
  inactive: "#ADB5BD",
  white: "#FFFFFF",
  black: "#000000",
  lightGray: "#F1F3F5",
  mediumGray: "#CED4DA",
};

const darkColors = {
  primary: "#5C9CE6", // Slightly lighter blue for dark mode
  secondary: "#4ECBAD", // Slightly lighter mint for dark mode
  background: "#121212", // Dark background
  card: "#1E1E1E", // Dark card
  text: "#E0E0E0", // Light text
  textSecondary: "#A0A0A0", // Secondary text
  border: "#2C2C2C", // Dark border
  success: "#2EBD4E", // Success color
  warning: "#FFC940", // Warning color
  error: "#E74C3C", // Error color
  inactive: "#6C6C6C", // Inactive color
  white: "#FFFFFF", // White
  black: "#000000", // Black
  lightGray: "#2C2C2C", // Dark gray
  mediumGray: "#4A4A4A", // Medium gray
};

// Meal type colors - light mode
const lightMealColors = {
  breakfast: "#4A90E2", // Blue
  lunch: "#5BD3B8", // Mint
  dinner: "#9775FA", // Purple
  snacks: "#FF8A65", // Orange
};

// Meal type colors - dark mode
const darkMealColors = {
  breakfast: "#5C9CE6", // Lighter blue
  lunch: "#4ECBAD", // Lighter mint
  dinner: "#A587FF", // Lighter purple
  snacks: "#FF9B7A", // Lighter orange
};

// Export function to get colors based on theme
export const getColors = (isDarkMode: boolean) => {
  return isDarkMode ? darkColors : lightColors;
};

// Export function to get meal colors based on theme
export const getMealColors = (isDarkMode: boolean) => {
  return isDarkMode ? darkMealColors : lightMealColors;
};

// For backward compatibility
export const colors = lightColors;
export const mealColors = lightMealColors;