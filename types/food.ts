export interface Food {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
  servingSize: number;
  isCustom?: boolean;
}

export interface MealEntry {
  id: string;
  foodId: string;
  food: Food;
  servings: number;
  mealType: MealType;
  date: string; // ISO date string
  timestamp: number;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export interface DailyNutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailySummary {
  date: string;
  meals: {
    breakfast: MealEntry[];
    lunch: MealEntry[];
    dinner: MealEntry[];
    snacks: MealEntry[];
  };
  totals: DailyNutrition;
}

export interface UserGoals {
  calorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}