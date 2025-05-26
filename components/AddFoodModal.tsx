import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Food, MealType } from '@/types/food';
import { X, Check } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

interface AddFoodModalProps {
  visible: boolean;
  food: Food;
  mealType: MealType;
  onClose: () => void;
  onAdd: (foodId: string, mealType: MealType, servings: number) => void;
}

export const AddFoodModal = ({ 
  visible, 
  food, 
  mealType, 
  onClose, 
  onAdd 
}: AddFoodModalProps) => {
  const { colors, mealColors } = useAppTheme();
  const [servings, setServings] = useState('1');
  const [totalCalories, setTotalCalories] = useState(food.calories);
  
  useEffect(() => {
    const servingValue = parseFloat(servings) || 0;
    setTotalCalories(Math.round(food.calories * servingValue));
  }, [servings, food.calories]);
  
  const handleAdd = () => {
    const servingValue = parseFloat(servings);
    if (servingValue > 0) {
      onAdd(food.id, mealType, servingValue);
      onClose();
    }
  };
  
  const mealColor = mealColors[mealType];
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.content, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Add to {mealType}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <View style={styles.foodInfo}>
              <Text style={[styles.foodName, { color: colors.text }]}>{food.name}</Text>
              <Text style={[styles.servingInfo, { color: colors.textSecondary }]}>
                {food.servingSize} {food.serving}
              </Text>
            </View>
            
            <View style={[styles.nutritionInfo, { backgroundColor: colors.lightGray }]}>
              <NutritionItem 
                label="Calories" 
                value={food.calories} 
                unit="cal" 
                textColor={colors.text} 
              />
              <NutritionItem 
                label="Protein" 
                value={food.protein} 
                unit="g" 
                textColor={colors.text} 
              />
              <NutritionItem 
                label="Carbs" 
                value={food.carbs} 
                unit="g" 
                textColor={colors.text} 
              />
              <NutritionItem 
                label="Fat" 
                value={food.fat} 
                unit="g" 
                textColor={colors.text} 
              />
            </View>
            
            <View style={styles.servingContainer}>
              <Text style={[styles.servingLabel, { color: colors.text }]}>Number of servings</Text>
              <TextInput
                style={[styles.servingInput, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={servings}
                onChangeText={setServings}
                keyboardType="decimal-pad"
                selectTextOnFocus
              />
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>Total calories</Text>
              <Text style={[styles.totalValue, { color: colors.primary }]}>{totalCalories} cal</Text>
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: mealColor }]}
            onPress={handleAdd}
          >
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add to {mealType}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

interface NutritionItemProps {
  label: string;
  value: number;
  unit: string;
  textColor: string;
}

const NutritionItem = ({ label, value, unit, textColor }: NutritionItemProps) => (
  <View style={styles.nutritionItem}>
    <Text style={[styles.nutritionLabel, { color: textColor }]}>{label}</Text>
    <Text style={[styles.nutritionValue, { color: textColor }]}>
      {value} {unit}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
  },
  scrollView: {
    maxHeight: '70%',
  },
  foodInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  foodName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  servingInfo: {
    fontSize: 16,
  },
  nutritionInfo: {
    padding: 16,
    marginBottom: 16,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nutritionLabel: {
    fontSize: 16,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  servingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  servingLabel: {
    fontSize: 16,
  },
  servingInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});