import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useFoodStore } from '@/store/foodStore';
import { MealSection } from '@/components/MealSection';
import { NutritionSummary } from '@/components/NutritionSummary';
import { AddFoodModal } from '@/components/AddFoodModal';
import { MealType, MealEntry } from '@/types/food';
import { colors } from '@/constants/colors';
import { formatDisplayDate } from '@/utils/date';
import { ArrowLeft } from 'lucide-react-native';

export default function DayDetailsScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [selectedMealType, setSelectedMealType] = React.useState<MealType>('breakfast');
  const [selectedFood, setSelectedFood] = React.useState<any>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedEntry, setSelectedEntry] = React.useState<MealEntry | null>(null);
  
  const { 
    getDailySummary, 
    addMealEntry, 
    removeMealEntry, 
    updateMealEntry,
    userGoals,
  } = useFoodStore();
  
  const dailySummary = getDailySummary(date);
  
  const handleAddFood = (mealType: MealType) => {
    setSelectedMealType(mealType);
    router.push({
      pathname: '/foods',
      params: { selectMode: 'true', mealType }
    });
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
    <>
      <Stack.Screen 
        options={{
          title: formatDisplayDate(date),
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <ArrowLeft size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  headerButton: {
    padding: 8,
  },
});