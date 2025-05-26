import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFoodStore } from '@/store/foodStore';
import { FoodItem } from '@/components/FoodItem';
import { SearchBar } from '@/components/SearchBar';
import { AddCustomFoodModal } from '@/components/AddCustomFoodModal';
import { Food, MealType } from '@/types/food';
import { Plus } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function FoodsScreen() {
  const { colors } = useAppTheme();
  const { selectMode, mealType } = useLocalSearchParams<{ selectMode?: string; mealType?: MealType }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [customFoodModalVisible, setCustomFoodModalVisible] = useState(false);
  
  const { foods, searchFoods, addFood, addMealEntry } = useFoodStore();
  
  const filteredFoods = searchFoods(searchQuery);
  
  const isSelectMode = selectMode === 'true';
  
  const handleFoodPress = (food: Food) => {
    if (isSelectMode) {
      router.back();
      // Add a small delay to allow the modal to appear after navigation
      setTimeout(() => {
        addMealEntry(food.id, mealType as MealType || 'breakfast', 1);
      }, 300);
    } else {
      // Show food details
      router.push({
        pathname: '/food-details',
        params: { id: food.id }
      });
    }
  };
  
  const handleAddCustomFood = (food: Food) => {
    addFood(food);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search foods..."
        />
        
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setCustomFoodModalVisible(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Custom</Text>
        </TouchableOpacity>
      </View>
      
      {isSelectMode && (
        <View style={[styles.selectModeHeader, { backgroundColor: colors.lightGray }]}>
          <Text style={[styles.selectModeText, { color: colors.textSecondary }]}>
            Select a food to add to {mealType || 'your meal'}
          </Text>
        </View>
      )}
      
      {filteredFoods.length > 0 ? (
        <FlatList
          data={filteredFoods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FoodItem
              food={item}
              onPress={() => handleFoodPress(item)}
              showAddButton={isSelectMode}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.text }]}>No foods found</Text>
          <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
            Try a different search term or add a custom food
          </Text>
        </View>
      )}
      
      <AddCustomFoodModal
        visible={customFoodModalVisible}
        onClose={() => setCustomFoodModalVisible(false)}
        onAdd={handleAddCustomFood}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: '500',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
  selectModeHeader: {
    padding: 12,
    marginBottom: 8,
  },
  selectModeText: {
    fontSize: 14,
    textAlign: 'center',
  },
});