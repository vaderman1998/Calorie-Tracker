import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyNutrition, UserGoals } from '@/types/food';
import { useAppTheme } from '@/hooks/useAppTheme';

interface NutritionSummaryProps {
  nutrition: DailyNutrition;
  goals: UserGoals;
}

export const NutritionSummary = ({ nutrition, goals }: NutritionSummaryProps) => {
  const { colors } = useAppTheme();
  
  // Ensure we don't divide by zero
  const safeCalorieGoal = goals.calorieGoal || 1;
  const safeProteinGoal = goals.proteinGoal || 1;
  const safeCarbsGoal = goals.carbsGoal || 1;
  const safeFatGoal = goals.fatGoal || 1;
  
  const caloriePercentage = Math.min(100, (nutrition.calories / safeCalorieGoal) * 100);
  const proteinPercentage = Math.min(100, (nutrition.protein / safeProteinGoal) * 100);
  const carbsPercentage = Math.min(100, (nutrition.carbs / safeCarbsGoal) * 100);
  const fatPercentage = Math.min(100, (nutrition.fat / safeFatGoal) * 100);
  
  // Calculate remaining calories
  const remainingCalories = Math.max(0, goals.calorieGoal - nutrition.calories);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.card, shadowColor: colors.black }]}>
      <View style={styles.calorieContainer}>
        <View style={styles.calorieTextContainer}>
          <Text style={[styles.calorieValue, { color: colors.primary }]}>
            {Math.round(nutrition.calories)}
          </Text>
          <Text style={[styles.calorieLabel, { color: colors.primary }]}>cal</Text>
        </View>
        <Text style={[styles.calorieGoal, { color: colors.textSecondary }]}>
          {remainingCalories > 0 
            ? `${Math.round(remainingCalories)} cal remaining` 
            : `${Math.round(Math.abs(remainingCalories))} cal over goal`}
        </Text>
        <View style={[styles.progressBarContainer, { backgroundColor: colors.lightGray }]}>
          <View 
            style={[
              styles.progressBar, 
              { 
                width: `${caloriePercentage}%`, 
                backgroundColor: caloriePercentage >= 100 ? colors.error : colors.primary 
              }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.macrosContainer}>
        <MacroItem 
          label="Protein"
          value={Math.round(nutrition.protein)}
          goal={goals.proteinGoal}
          unit="g"
          percentage={proteinPercentage}
          color={colors.success}
          textColor={colors.text}
          secondaryColor={colors.textSecondary}
          backgroundColor={colors.lightGray}
        />
        <MacroItem 
          label="Carbs"
          value={Math.round(nutrition.carbs)}
          goal={goals.carbsGoal}
          unit="g"
          percentage={carbsPercentage}
          color={colors.primary}
          textColor={colors.text}
          secondaryColor={colors.textSecondary}
          backgroundColor={colors.lightGray}
        />
        <MacroItem 
          label="Fat"
          value={Math.round(nutrition.fat)}
          goal={goals.fatGoal}
          unit="g"
          percentage={fatPercentage}
          color={colors.warning}
          textColor={colors.text}
          secondaryColor={colors.textSecondary}
          backgroundColor={colors.lightGray}
        />
      </View>
    </View>
  );
};

interface MacroItemProps {
  label: string;
  value: number;
  goal: number;
  unit: string;
  percentage: number;
  color: string;
  textColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

const MacroItem = ({ 
  label, 
  value, 
  goal, 
  unit, 
  percentage, 
  color,
  textColor,
  secondaryColor,
  backgroundColor
}: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={[styles.macroLabel, { color: textColor }]}>{label}</Text>
    <View style={styles.macroValueContainer}>
      <Text style={[styles.macroValue, { color: textColor }]}>{value}</Text>
      <Text style={[styles.macroUnit, { color: secondaryColor }]}>{unit}</Text>
    </View>
    <Text style={[styles.macroGoal, { color: secondaryColor }]}>
      {value >= goal ? 'Goal reached!' : `${Math.round(goal - value)}${unit} left`}
    </Text>
    <View style={[styles.progressBarContainer, { backgroundColor }]}>
      <View 
        style={[
          styles.progressBar, 
          { 
            width: `${percentage}%`, 
            backgroundColor: percentage >= 100 ? color : color 
          }
        ]} 
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
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
  calorieTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: '700',
  },
  calorieLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    marginLeft: 4,
  },
  calorieGoal: {
    fontSize: 14,
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  macroItem: {
    flex: 1,
    paddingHorizontal: 4,
  },
  macroLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  macroValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  macroUnit: {
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 2,
  },
  macroGoal: {
    fontSize: 12,
    marginBottom: 6,
  },
});