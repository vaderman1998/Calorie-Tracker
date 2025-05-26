import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { useFoodStore } from '@/store/foodStore';
import { MealType } from '@/types/food';
import { ArrowLeft, Plus } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function FoodDetailsScreen() {
  const { colors, mealColors } = useAppTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getFood, addMealEntry } = useFoodStore();
  
  const food = getFood(id);
  
  if (!food) {
    return (
      <View style={[styles.notFoundContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>Food not found</Text>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.primary }]}
          onPress={() => router.back()}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: '500' }}>Go Back</Text>
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
      
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
          <Text style={[styles.servingInfo, { color: colors.textSecondary }]}>
            {food.servingSize} {food.serving}
          </Text>
        </View>
        
        <View style={[styles.nutritionCard, { backgroundColor: colors.card, shadowColor: colors.black }]}>
          <View style={styles.calorieContainer}>
            <Text style={[styles.calorieValue, { color: colors.primary }]}>{food.calories}</Text>
            <Text style={[styles.calorieLabel, { color: colors.textSecondary }]}>calories</Text>
          </View>
          
          <View style={styles.macrosContainer}>
            <MacroItem 
              label="Protein" 
              value={food.protein} 
              color={colors.success} 
              textColor={colors.text}
              secondaryColor={colors.textSecondary}
            />
            <MacroItem 
              label="Carbs" 
              value={food.carbs} 
              color={colors.primary} 
              textColor={colors.text}
              secondaryColor={colors.textSecondary}
            />
            <MacroItem 
              label="Fat" 
              value={food.fat} 
              color={colors.warning} 
              textColor={colors.text}
              secondaryColor={colors.textSecondary}
            />
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Add to Meal</Text>
        
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
          <View style={[styles.customFoodInfo, { backgroundColor: colors.lightGray }]}>
            <Text style={[styles.customFoodText, { color: colors.textSecondary }]}>
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
  textColor: string;
  secondaryColor: string;
}

const MacroItem = ({ label, value, color, textColor, secondaryColor }: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={[styles.macroValue, { color }]}>{value}g</Text>
    <Text style={[styles.macroLabel, { color: secondaryColor }]}>{label}</Text>
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
    marginBottom: 4,
  },
  servingInfo: {
    fontSize: 16,
  },
  nutritionCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
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
  },
  calorieLabel: {
    fontSize: 16,
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
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
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  customFoodText: {
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
    marginBottom: 16,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});