import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useFoodStore } from '@/store/foodStore';
import { MealSection } from '@/components/MealSection';
import { NutritionSummary } from '@/components/NutritionSummary';
import { AddFoodModal } from '@/components/AddFoodModal';
import { MealType, MealEntry } from '@/types/food';
import { getCurrentDate, formatDisplayDate } from '@/utils/date';
import { Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function TodayScreen() {
  const { colors } = useAppTheme();
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<MealEntry | null>(null);
  
  const { 
    getDailySummary, 
    addMealEntry, 
    removeMealEntry, 
    updateMealEntry,
    userGoals,
  } = useFoodStore();
  
  const today = getCurrentDate();
  const dailySummary = getDailySummary(today);
  
  useFocusEffect(
    useCallback(() => {
      // Refresh data when screen is focused
    }, [])
  );
  
  const handleAddFood = (mealType: MealType) => {
    setSelectedMealType(mealType);
    router.push('/foods?selectMode=true');
  };
  
  const handleDeleteEntry = (id: string) => {
    removeMealEntry(id);
  };
  
  const handlePressEntry = (entry: MealEntry) => {
    setSelectedEntry(entry);
    setSelectedFood(entry.food);
    setSelectedMealType(entry.mealType);
    setModalVisible(true);
  };
  
  const handleAddMealEntry = (foodId: string, mealType: MealType, servings: number) => {
    if (selectedEntry) {
      updateMealEntry(selectedEntry.id, servings);
      setSelectedEntry(null);
    } else {
      addMealEntry(foodId, mealType, servings);
    }
  };
  
  const { meals, totals } = dailySummary;
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.date, { color: colors.text }]}>{formatDisplayDate(today)}</Text>
        
        <NutritionSummary nutrition={totals} goals={userGoals} />
        
        <MealSection
          title="Breakfast"
          mealType="breakfast"
          entries={meals.breakfast}
          totalCalories={meals.breakfast.reduce(
            (sum, entry) => sum + entry.food.calories * entry.servings,
            0
          )}
          onAddFood={handleAddFood}
          onDeleteEntry={handleDeleteEntry}
          onPressEntry={handlePressEntry}
        />
        
        <MealSection
          title="Lunch"
          mealType="lunch"
          entries={meals.lunch}
          totalCalories={meals.lunch.reduce(
            (sum, entry) => sum + entry.food.calories * entry.servings,
            0
          )}
          onAddFood={handleAddFood}
          onDeleteEntry={handleDeleteEntry}
          onPressEntry={handlePressEntry}
        />
        
        <MealSection
          title="Dinner"
          mealType="dinner"
          entries={meals.dinner}
          totalCalories={meals.dinner.reduce(
            (sum, entry) => sum + entry.food.calories * entry.servings,
            0
          )}
          onAddFood={handleAddFood}
          onDeleteEntry={handleDeleteEntry}
          onPressEntry={handlePressEntry}
        />
        
        <MealSection
          title="Snacks"
          mealType="snacks"
          entries={meals.snacks}
          totalCalories={meals.snacks.reduce(
            (sum, entry) => sum + entry.food.calories * entry.servings,
            0
          )}
          onAddFood={handleAddFood}
          onDeleteEntry={handleDeleteEntry}
          onPressEntry={handlePressEntry}
        />
      </ScrollView>
      
      {selectedFood && (
        <AddFoodModal
          visible={modalVisible}
          food={selectedFood}
          mealType={selectedMealType}
          onClose={() => {
            setModalVisible(false);
            setSelectedFood(null);
            setSelectedEntry(null);
          }}
          onAdd={handleAddMealEntry}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  date: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});