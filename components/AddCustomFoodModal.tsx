import React, { useState } from 'react';
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
  Alert,
} from 'react-native';
import { Food } from '@/types/food';
import { X, Check } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

interface AddCustomFoodModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (food: Food) => void;
}

export const AddCustomFoodModal = ({ 
  visible, 
  onClose, 
  onAdd 
}: AddCustomFoodModalProps) => {
  const { colors } = useAppTheme();
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [serving, setServing] = useState('');
  const [servingSize, setServingSize] = useState('');
  
  const resetForm = () => {
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
    setServing('');
    setServingSize('');
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleAdd = () => {
    if (!name || !calories || !serving || !servingSize) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    const newFood: Food = {
      id: `custom-${Date.now()}`,
      name,
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      serving,
      servingSize: parseFloat(servingSize) || 1,
      isCustom: true,
    };
    
    onAdd(newFood);
    handleClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={[styles.content, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Add Custom Food</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Food Name *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={name}
                onChangeText={setName}
                placeholder="e.g., Homemade Granola"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Calories (per serving) *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={calories}
                onChangeText={setCalories}
                placeholder="e.g., 250"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: colors.text }]}>Serving Unit *</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.background
                  }]}
                  value={serving}
                  onChangeText={setServing}
                  placeholder="e.g., cup"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: colors.text }]}>Serving Size *</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.background
                  }]}
                  value={servingSize}
                  onChangeText={setServingSize}
                  placeholder="e.g., 1"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Macronutrients (optional)</Text>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, { color: colors.text }]}>Protein (g)</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.background
                  }]}
                  value={protein}
                  onChangeText={setProtein}
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, { color: colors.text }]}>Carbs (g)</Text>
                <TextInput
                  style={[styles.input, { 
                    borderColor: colors.border, 
                    color: colors.text,
                    backgroundColor: colors.background
                  }]}
                  value={carbs}
                  onChangeText={setCarbs}
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Fat (g)</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={fat}
                onChangeText={setFat}
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            onPress={handleAdd}
          >
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Food</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

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
    maxHeight: '90%',
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
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 8,
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