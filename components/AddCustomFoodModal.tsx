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
import { colors } from '@/constants/colors';
import { X, Check } from 'lucide-react-native';

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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Custom Food</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Food Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g., Homemade Granola"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Calories (per serving) *</Text>
              <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="e.g., 250"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Serving Unit *</Text>
                <TextInput
                  style={styles.input}
                  value={serving}
                  onChangeText={setServing}
                  placeholder="e.g., cup"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Serving Size *</Text>
                <TextInput
                  style={styles.input}
                  value={servingSize}
                  onChangeText={setServingSize}
                  placeholder="e.g., 1"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Macronutrients (optional)</Text>
            
            <View style={styles.formRow}>
              <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.label}>Protein (g)</Text>
                <TextInput
                  style={styles.input}
                  value={protein}
                  onChangeText={setProtein}
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
              
              <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.label}>Carbs (g)</Text>
                <TextInput
                  style={styles.input}
                  value={carbs}
                  onChangeText={setCarbs}
                  placeholder="0"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Fat (g)</Text>
              <TextInput
                style={styles.input}
                value={fat}
                onChangeText={setFat}
                placeholder="0"
                placeholderTextColor={colors.textSecondary}
                keyboardType="decimal-pad"
              />
            </View>
          </ScrollView>
          
          <TouchableOpacity 
            style={styles.addButton}
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
    backgroundColor: colors.white,
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
    color: colors.text,
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
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
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
    backgroundColor: colors.primary,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});