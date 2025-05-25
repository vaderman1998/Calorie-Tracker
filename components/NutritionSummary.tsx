import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DailyNutrition, UserGoals } from '@/types/food';
import { colors } from '@/constants/colors';

interface NutritionSummaryProps {
  nutrition: DailyNutrition;
  goals: UserGoals;
}

export const NutritionSummary = ({ nutrition, goals }: NutritionSummaryProps) => {
  const caloriePercentage = Math.min(100, (nutrition.calories / goals.calorieGoal) * 100);
  const proteinPercentage = Math.min(100, (nutrition.protein / goals.proteinGoal) * 100);
  const carbsPercentage = Math.min(100, (nutrition.carbs / goals.carbsGoal) * 100);
  const fatPercentage = Math.min(100, (nutrition.fat / goals.fatGoal) * 100);
  
  return (
    <View style={styles.container}>
      <View style={styles.calorieContainer}>
        <View style={styles.calorieTextContainer}>
          <Text style={styles.calorieValue}>
            {Math.round(nutrition.calories)}
          </Text>
          <Text style={styles.calorieLabel}>cal</Text>
        </View>
        <Text style={styles.calorieGoal}>
          of {goals.calorieGoal} goal
        </Text>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${caloriePercentage}%`, backgroundColor: colors.primary }
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
        />
        <MacroItem 
          label="Carbs"
          value={Math.round(nutrition.carbs)}
          goal={goals.carbsGoal}
          unit="g"
          percentage={carbsPercentage}
          color={colors.primary}
        />
        <MacroItem 
          label="Fat"
          value={Math.round(nutrition.fat)}
          goal={goals.fatGoal}
          unit="g"
          percentage={fatPercentage}
          color={colors.warning}
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
}

const MacroItem = ({ label, value, goal, unit, percentage, color }: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={styles.macroLabel}>{label}</Text>
    <View style={styles.macroValueContainer}>
      <Text style={styles.macroValue}>{value}</Text>
      <Text style={styles.macroUnit}>{unit}</Text>
    </View>
    <Text style={styles.macroGoal}>of {goal}{unit}</Text>
    <View style={styles.progressBarContainer}>
      <View 
        style={[
          styles.progressBar, 
          { width: `${percentage}%`, backgroundColor: color }
        ]} 
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
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
  calorieTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.primary,
  },
  calorieLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 6,
    marginLeft: 4,
  },
  calorieGoal: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.lightGray,
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
    color: colors.text,
    marginBottom: 4,
  },
  macroValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  macroValue: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  macroUnit: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
    marginLeft: 2,
  },
  macroGoal: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 6,
  },
});