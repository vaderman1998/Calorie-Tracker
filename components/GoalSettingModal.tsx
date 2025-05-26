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
import { UserGoals } from '@/types/food';
import { X, Check } from 'lucide-react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

interface GoalSettingModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (goals: UserGoals) => void;
  currentGoals: UserGoals;
}

export const GoalSettingModal = ({ 
  visible, 
  onClose, 
  onSave,
  currentGoals
}: GoalSettingModalProps) => {
  const { colors } = useAppTheme();
  const [goals, setGoals] = useState<UserGoals>(currentGoals);
  
  // Reset goals when modal opens
  React.useEffect(() => {
    if (visible) {
      setGoals(currentGoals);
    }
  }, [visible, currentGoals]);
  
  const handleSave = () => {
    // Validate inputs
    if (
      isNaN(goals.calorieGoal) || 
      isNaN(goals.proteinGoal) || 
      isNaN(goals.carbsGoal) || 
      isNaN(goals.fatGoal) ||
      goals.calorieGoal <= 0 ||
      goals.proteinGoal < 0 ||
      goals.carbsGoal < 0 ||
      goals.fatGoal < 0
    ) {
      Alert.alert(
        "Invalid Values",
        "Please enter valid values for your nutrition goals. Calories must be greater than 0."
      );
      return;
    }
    
    onSave(goals);
    onClose();
  };
  
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
            <Text style={[styles.title, { color: colors.text }]}>Set Nutrition Goals</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Daily Calories *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={goals.calorieGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, calorieGoal: parseInt(value) || 0 })
                }
                placeholder="e.g., 2000"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                selectTextOnFocus
              />
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                Recommended: 1500-2500 calories depending on activity level
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Protein (g) *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={goals.proteinGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, proteinGoal: parseInt(value) || 0 })
                }
                placeholder="e.g., 150"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                selectTextOnFocus
              />
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                Recommended: 0.8-1.6g per kg of body weight
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Carbohydrates (g) *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={goals.carbsGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, carbsGoal: parseInt(value) || 0 })
                }
                placeholder="e.g., 200"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                selectTextOnFocus
              />
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                Recommended: 45-65% of total calories
              </Text>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Fat (g) *</Text>
              <TextInput
                style={[styles.input, { 
                  borderColor: colors.border, 
                  color: colors.text,
                  backgroundColor: colors.background
                }]}
                value={goals.fatGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, fatGoal: parseInt(value) || 0 })
                }
                placeholder="e.g., 65"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                selectTextOnFocus
              />
              <Text style={[styles.helperText, { color: colors.textSecondary }]}>
                Recommended: 20-35% of total calories
              </Text>
            </View>
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
            >
              <Text style={{ color: colors.text }}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
            >
              <Check size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Save Goals</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
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
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 8,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  saveButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: '600',
    marginLeft: 8,
  },
});