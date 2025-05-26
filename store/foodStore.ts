import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Food, MealEntry, MealType, DailySummary, UserGoals } from '@/types/food';
import { foodsDatabase } from '@/mocks/foods';
import { getCurrentDate, formatDate } from '@/utils/date';

interface FoodState {
  foods: Food[];
  mealEntries: MealEntry[];
  userGoals: UserGoals;
  
  // Actions
  addFood: (food: Food) => void;
  addMealEntry: (foodId: string, mealType: MealType, servings: number) => void;
  removeMealEntry: (entryId: string) => void;
  updateMealEntry: (entryId: string, servings: number) => void;
  updateUserGoals: (goals: Partial<UserGoals>) => void;
  
  // Selectors
  getDailyEntries: (date: string) => MealEntry[];
  getDailySummary: (date: string) => DailySummary;
  getFood: (id: string) => Food | undefined;
  searchFoods: (query: string) => Food[];
}

const DEFAULT_GOALS: UserGoals = {
  calorieGoal: 2000,
  proteinGoal: 150,
  carbsGoal: 200,
  fatGoal: 65,
};

export const useFoodStore = create<FoodState>()(
  persist(
    (set, get) => ({
      foods: [...foodsDatabase],
      mealEntries: [],
      userGoals: DEFAULT_GOALS,
      
      addFood: (food: Food) => {
        set((state) => ({
          foods: [...state.foods, { ...food, isCustom: true }],
        }));
      },
      
      addMealEntry: (foodId: string, mealType: MealType, servings: number) => {
        const food = get().getFood(foodId);
        if (!food) return;
        
        const newEntry: MealEntry = {
          id: Date.now().toString(),
          foodId,
          food,
          servings,
          mealType,
          date: getCurrentDate(),
          timestamp: Date.now(),
        };
        
        set((state) => ({
          mealEntries: [...state.mealEntries, newEntry],
        }));
      },
      
      removeMealEntry: (entryId: string) => {
        set((state) => ({
          mealEntries: state.mealEntries.filter((entry) => entry.id !== entryId),
        }));
      },
      
      updateMealEntry: (entryId: string, servings: number) => {
        set((state) => ({
          mealEntries: state.mealEntries.map((entry) =>
            entry.id === entryId ? { ...entry, servings } : entry
          ),
        }));
      },
      
      updateUserGoals: (goals: Partial<UserGoals>) => {
        set((state) => ({
          userGoals: { 
            ...state.userGoals, 
            ...goals,
            // Ensure values are numbers and not NaN
            calorieGoal: goals.calorieGoal !== undefined ? 
              (isNaN(goals.calorieGoal) ? state.userGoals.calorieGoal : goals.calorieGoal) : 
              state.userGoals.calorieGoal,
            proteinGoal: goals.proteinGoal !== undefined ? 
              (isNaN(goals.proteinGoal) ? state.userGoals.proteinGoal : goals.proteinGoal) : 
              state.userGoals.proteinGoal,
            carbsGoal: goals.carbsGoal !== undefined ? 
              (isNaN(goals.carbsGoal) ? state.userGoals.carbsGoal : goals.carbsGoal) : 
              state.userGoals.carbsGoal,
            fatGoal: goals.fatGoal !== undefined ? 
              (isNaN(goals.fatGoal) ? state.userGoals.fatGoal : goals.fatGoal) : 
              state.userGoals.fatGoal,
          },
        }));
      },
      
      getDailyEntries: (date: string) => {
        return get().mealEntries.filter((entry) => entry.date === date);
      },
      
      getDailySummary: (date: string) => {
        const entries = get().getDailyEntries(date);
        
        // Group entries by meal type
        const meals = {
          breakfast: entries.filter((entry) => entry.mealType === 'breakfast'),
          lunch: entries.filter((entry) => entry.mealType === 'lunch'),
          dinner: entries.filter((entry) => entry.mealType === 'dinner'),
          snacks: entries.filter((entry) => entry.mealType === 'snacks'),
        };
        
        // Calculate totals
        const totals = entries.reduce(
          (acc, entry) => {
            const { food, servings } = entry;
            return {
              calories: acc.calories + food.calories * servings,
              protein: acc.protein + food.protein * servings,
              carbs: acc.carbs + food.carbs * servings,
              fat: acc.fat + food.fat * servings,
            };
          },
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
        
        return {
          date,
          meals,
          totals,
        };
      },
      
      getFood: (id: string) => {
        return get().foods.find((food) => food.id === id);
      },
      
      searchFoods: (query: string) => {
        const searchTerm = query.toLowerCase().trim();
        if (!searchTerm) return get().foods;
        
        return get().foods.filter((food) =>
          food.name.toLowerCase().includes(searchTerm)
        );
      },
    }),
    {
      name: 'food-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);