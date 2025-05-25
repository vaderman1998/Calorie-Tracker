import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealEntry as MealEntryType, MealType } from '@/types/food';
import { MealEntry } from './MealEntry';
import { colors, mealColors } from '@/constants/colors';
import { Plus } from 'lucide-react-native';

interface MealSectionProps {
  title: string;
  mealType: MealType;
  entries: MealEntryType[];
  totalCalories: number;
  onAddFood: (mealType: MealType) => void;
  onDeleteEntry: (id: string) => void;
  onPressEntry: (entry: MealEntryType) => void;
}

export const MealSection = ({
  title,
  mealType,
  entries,
  totalCalories,
  onAddFood,
  onDeleteEntry,
  onPressEntry,
}: MealSectionProps) => {
  const mealColor = mealColors[mealType];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.dot, { backgroundColor: mealColor }]} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.calories}>{totalCalories} cal</Text>
      </View>
      
      {entries.length > 0 ? (
        <View style={styles.entriesContainer}>
          {entries.map((entry) => (
            <MealEntry
              key={entry.id}
              entry={entry}
              onDelete={onDeleteEntry}
              onPress={onPressEntry}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No foods added yet</Text>
        </View>
      )}
      
      <TouchableOpacity
        style={[styles.addButton, { borderColor: mealColor }]}
        onPress={() => onAddFood(mealType)}
      >
        <Plus size={16} color={mealColor} />
        <Text style={[styles.addButtonText, { color: mealColor }]}>
          Add Food
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  entriesContainer: {
    marginBottom: 12,
  },
  emptyContainer: {
    padding: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: 8,
    fontWeight: '500',
  },
});