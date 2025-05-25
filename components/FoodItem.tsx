import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Food } from '@/types/food';
import { colors } from '@/constants/colors';
import { Plus } from 'lucide-react-native';

interface FoodItemProps {
  food: Food;
  onPress?: () => void;
  showAddButton?: boolean;
}

export const FoodItem = ({ food, onPress, showAddButton = false }: FoodItemProps) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{food.name}</Text>
        <Text style={styles.serving}>
          {food.servingSize} {food.serving}
        </Text>
      </View>
      
      <View style={styles.nutritionContainer}>
        <Text style={styles.calories}>{food.calories}</Text>
        <Text style={styles.caloriesLabel}>cal</Text>
      </View>
      
      {showAddButton && (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
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
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: colors.black,
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
    color: colors.text,
    marginBottom: 4,
  },
  serving: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  nutritionContainer: {
    alignItems: 'center',
    marginRight: 8,
  },
  calories: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  caloriesLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});