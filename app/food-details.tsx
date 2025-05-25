import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useFoodStore } from '@/store/foodStore';
import { colors, mealColors } from '@/constants/colors';
import { MealType } from '@/types/food';
import { ArrowLeft, Plus } from 'lucide-react-native';

export default function FoodDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getFood, addMealEntry } = useFoodStore();
  
  const food = getFood(id);
  
  if (!food) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Food not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const handleAddToMeal = (mealType: MealType) => {
    addMealEntry(food.id, mealType, 1);
    router.back();
  };
  
  return (
    <>
      <Stack.Screen 
        options={{
          title: food.name,
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
      
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.servingInfo}>
            {food.servingSize} {food.serving}
          </Text>
        </View>
        
        <View style={styles.nutritionCard}>
          <View style={styles.calorieContainer}>
            <Text style={styles.calorieValue}>{food.calories}</Text>
            <Text style={styles.calorieLabel}>calories</Text>
          </View>
          
          <View style={styles.macrosContainer}>
            <MacroItem 
              label="Protein" 
              value={food.protein} 
              color={colors.success} 
            />
            <MacroItem 
              label="Carbs" 
              value={food.carbs} 
              color={colors.primary} 
            />
            <MacroItem 
              label="Fat" 
              value={food.fat} 
              color={colors.warning} 
            />
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Add to Meal</Text>
        
        <View style={styles.mealsContainer}>
          <MealButton 
            label="Breakfast" 
            color={mealColors.breakfast}
            onPress={() => handleAddToMeal('breakfast')}
          />
          <MealButton 
            label="Lunch" 
            color={mealColors.lunch}
            onPress={() => handleAddToMeal('lunch')}
          />
          <MealButton 
            label="Dinner" 
            color={mealColors.dinner}
            onPress={() => handleAddToMeal('dinner')}
          />
          <MealButton 
            label="Snacks" 
            color={mealColors.snacks}
            onPress={() => handleAddToMeal('snacks')}
          />
        </View>
        
        {food.isCustom && (
          <View style={styles.customFoodInfo}>
            <Text style={styles.customFoodText}>
              This is a custom food you added
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

interface MacroItemProps {
  label: string;
  value: number;
  color: string;
}

const MacroItem = ({ label, value, color }: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={[styles.macroValue, { color }]}>{value}g</Text>
    <Text style={styles.macroLabel}>{label}</Text>
  </View>
);

interface MealButtonProps {
  label: string;
  color: string;
  onPress: () => void;
}

const MealButton = ({ label, color, onPress }: MealButtonProps) => (
  <TouchableOpacity 
    style={[styles.mealButton, { backgroundColor: color }]}
    onPress={onPress}
  >
    <Plus size={20} color="#FFFFFF" />
    <Text style={styles.mealButtonText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  headerButton: {
    padding: 8,
  },
  header: {
    marginBottom: 24,
  },
  foodName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  servingInfo: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  nutritionCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calorieContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  calorieLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  mealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  mealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    marginHorizontal: '2%',
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  mealButtonText: {
    color: "#FFFFFF",
    fontWeight: '500',
    marginLeft: 8,
  },
  customFoodInfo: {
    backgroundColor: colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  customFoodText: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontWeight: '500',
  },
});