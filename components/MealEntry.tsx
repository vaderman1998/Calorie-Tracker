import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealEntry as MealEntryType } from '@/types/food';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Trash2 } from 'lucide-react-native';

interface MealEntryProps {
  entry: MealEntryType;
  onDelete: (id: string) => void;
  onPress: (entry: MealEntryType) => void;
}

export const MealEntry = ({ entry, onDelete, onPress }: MealEntryProps) => {
  const { colors } = useAppTheme();
  const { food, servings } = entry;
  const totalCalories = Math.round(food.calories * servings);
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => onPress(entry)}
      activeOpacity={0.7}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{food.name}</Text>
        <Text style={[styles.serving, { color: colors.textSecondary }]}>
          {servings} × {food.servingSize} {food.serving}
        </Text>
      </View>
      
      <View style={styles.nutritionContainer}>
        <Text style={[styles.calories, { color: colors.primary }]}>{totalCalories}</Text>
        <Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>cal</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(entry.id)}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <Trash2 size={18} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  serving: {
    fontSize: 14,
  },
  nutritionContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  calories: {
    fontSize: 18,
    fontWeight: '600',
  },
  caloriesLabel: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 4,
  },
});