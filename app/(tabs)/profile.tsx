import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useFoodStore } from '@/store/foodStore';
import { colors } from '@/constants/colors';
import { UserGoals } from '@/types/food';
import { Settings, ChevronRight, Save } from 'lucide-react-native';

export default function ProfileScreen() {
  const { userGoals, updateUserGoals } = useFoodStore();
  
  const [editMode, setEditMode] = useState(false);
  const [goals, setGoals] = useState<UserGoals>(userGoals);
  
  const handleSave = () => {
    // Validate inputs
    if (
      goals.calorieGoal <= 0 ||
      goals.proteinGoal < 0 ||
      goals.carbsGoal < 0 ||
      goals.fatGoal < 0
    ) {
      Alert.alert(
        "Invalid Values",
        "Please enter valid values for your nutrition goals."
      );
      return;
    }
    
    updateUserGoals(goals);
    setEditMode(false);
  };
  
  const handleReset = () => {
    setGoals(userGoals);
    setEditMode(false);
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        {!editMode ? (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.editButtonText}>Edit Goals</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: colors.success }]}
            onPress={handleSave}
          >
            <Save size={16} color={colors.white} />
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutrition Goals</Text>
        
        <View style={styles.goalItem}>
          <Text style={styles.goalLabel}>Daily Calories</Text>
          {editMode ? (
            <TextInput
              style={styles.goalInput}
              value={goals.calorieGoal.toString()}
              onChangeText={(value) => 
                setGoals({ ...goals, calorieGoal: parseInt(value) || 0 })
              }
              keyboardType="number-pad"
            />
          ) : (
            <Text style={styles.goalValue}>{userGoals.calorieGoal} cal</Text>
          )}
        </View>
        
        <View style={styles.goalItem}>
          <Text style={styles.goalLabel}>Protein</Text>
          {editMode ? (
            <TextInput
              style={styles.goalInput}
              value={goals.proteinGoal.toString()}
              onChangeText={(value) => 
                setGoals({ ...goals, proteinGoal: parseInt(value) || 0 })
              }
              keyboardType="number-pad"
            />
          ) : (
            <Text style={styles.goalValue}>{userGoals.proteinGoal}g</Text>
          )}
        </View>
        
        <View style={styles.goalItem}>
          <Text style={styles.goalLabel}>Carbohydrates</Text>
          {editMode ? (
            <TextInput
              style={styles.goalInput}
              value={goals.carbsGoal.toString()}
              onChangeText={(value) => 
                setGoals({ ...goals, carbsGoal: parseInt(value) || 0 })
              }
              keyboardType="number-pad"
            />
          ) : (
            <Text style={styles.goalValue}>{userGoals.carbsGoal}g</Text>
          )}
        </View>
        
        <View style={styles.goalItem}>
          <Text style={styles.goalLabel}>Fat</Text>
          {editMode ? (
            <TextInput
              style={styles.goalInput}
              value={goals.fatGoal.toString()}
              onChangeText={(value) => 
                setGoals({ ...goals, fatGoal: parseInt(value) || 0 })
              }
              keyboardType="number-pad"
            />
          ) : (
            <Text style={styles.goalValue}>{userGoals.fatGoal}g</Text>
          )}
        </View>
        
        {editMode && (
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleReset}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Settings size={20} color={colors.primary} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>App Preferences</Text>
          </View>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: colors.mediumGray, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy Policy</Text>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Terms of Service</Text>
          <ChevronRight size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>App Version</Text>
          <Text style={styles.versionText}>1.0.0</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: colors.white,
    fontWeight: '500',
    marginLeft: 4,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  goalLabel: {
    fontSize: 16,
    color: colors.text,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  goalInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color: colors.text,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
  },
  cancelButtonText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});