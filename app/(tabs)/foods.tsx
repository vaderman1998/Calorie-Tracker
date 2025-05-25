import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useFoodStore } from '@/store/foodStore';
import { FoodItem } from '@/components/FoodItem';
import { SearchBar } from '@/components/SearchBar';
import { AddCustomFoodModal } from '@/components/AddCustomFoodModal';
import { Food, MealType } from '@/types/food';
import { colors } from '@/constants/colors';
import { Plus } from 'lucide-react-native';

export default function FoodsScreen() {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search foods..."
        />
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setCustomFoodModalVisible(true)}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Custom</Text>
        </TouchableOpacity>
      </View>
      
      {isSelectMode && (
        <View style={styles.selectModeHeader}>
          <Text style={styles.selectModeText}>
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
          <Text style={styles.emptyText}>No foods found</Text>
          <Text style={styles.emptySubtext}>
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
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
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
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  selectModeHeader: {
    backgroundColor: colors.lightGray,
    padding: 12,
    marginBottom: 8,
  },
  selectModeText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});