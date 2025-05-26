import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Food } from '@/types/food';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Plus } from 'lucide-react-native';

interface FoodItemProps {
  food: Food;
  onPress?: () => void;
  showAddButton?: boolean;
}

export const FoodItem = ({ food, onPress, showAddButton = false }: FoodItemProps) => {
  const { colors } = useAppTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: colors.card,
        shadowColor: colors.black
      }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{food.name}</Text>
        <Text style={[styles.serving, { color: colors.textSecondary }]}>
          {food.servingSize} {food.serving}
        </Text>
      </View>
      
      <View style={styles.nutritionContainer}>
        <Text style={[styles.calories, { color: colors.primary }]}>{food.calories}</Text>
        <Text style={[styles.caloriesLabel, { color: colors.textSecondary }]}>cal</Text>
      </View>
      
      {showAddButton && (
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={onPress}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
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
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
    marginRight: 8,
  },
  calories: {
    fontSize: 18,
    fontWeight: '600',
  },
  caloriesLabel: {
    fontSize: 12,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});