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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFoodStore } from '@/store/foodStore';
import { useThemeStore } from '@/store/themeStore';
import { useAppTheme } from '@/hooks/useAppTheme';
import { UserGoals } from '@/types/food';
import { Settings, ChevronRight, Save, Moon, Sun } from 'lucide-react-native';

export default function ProfileScreen() {
  const { userGoals, updateUserGoals } = useFoodStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { colors } = useAppTheme();
  
  const [editMode, setEditMode] = useState(false);
  const [goals, setGoals] = useState<UserGoals>(userGoals);
  
  // Reset goals state when userGoals change or when entering edit mode
  React.useEffect(() => {
    setGoals(userGoals);
  }, [userGoals, editMode]);
  
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
    
    updateUserGoals(goals);
    setEditMode(false);
  };
  
  const handleReset = () => {
    setGoals(userGoals);
    setEditMode(false);
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]} 
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
          {!editMode ? (
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colors.primary }]}
              onPress={() => setEditMode(true)}
            >
              <Text style={{ color: "#FFFFFF" }}>Edit Goals</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.editButton, { backgroundColor: colors.success }]}
              onPress={handleSave}
            >
              <Save size={16} color="#FFFFFF" />
              <Text style={{ color: "#FFFFFF", marginLeft: 4 }}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nutrition Goals</Text>
          
          <View style={[styles.goalItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>Daily Calories</Text>
            {editMode ? (
              <TextInput
                style={[styles.goalInput, { 
                  borderColor: colors.border, 
                  color: colors.text, 
                  backgroundColor: colors.background 
                }]}
                value={goals.calorieGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, calorieGoal: parseInt(value) || 0 })
                }
                keyboardType="number-pad"
                selectTextOnFocus
              />
            ) : (
              <Text style={[styles.goalValue, { color: colors.primary }]}>{userGoals.calorieGoal} cal</Text>
            )}
          </View>
          
          <View style={[styles.goalItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>Protein</Text>
            {editMode ? (
              <TextInput
                style={[styles.goalInput, { 
                  borderColor: colors.border, 
                  color: colors.text, 
                  backgroundColor: colors.background 
                }]}
                value={goals.proteinGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, proteinGoal: parseInt(value) || 0 })
                }
                keyboardType="number-pad"
                selectTextOnFocus
              />
            ) : (
              <Text style={[styles.goalValue, { color: colors.primary }]}>{userGoals.proteinGoal}g</Text>
            )}
          </View>
          
          <View style={[styles.goalItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>Carbohydrates</Text>
            {editMode ? (
              <TextInput
                style={[styles.goalInput, { 
                  borderColor: colors.border, 
                  color: colors.text, 
                  backgroundColor: colors.background 
                }]}
                value={goals.carbsGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, carbsGoal: parseInt(value) || 0 })
                }
                keyboardType="number-pad"
                selectTextOnFocus
              />
            ) : (
              <Text style={[styles.goalValue, { color: colors.primary }]}>{userGoals.carbsGoal}g</Text>
            )}
          </View>
          
          <View style={[styles.goalItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.goalLabel, { color: colors.text }]}>Fat</Text>
            {editMode ? (
              <TextInput
                style={[styles.goalInput, { 
                  borderColor: colors.border, 
                  color: colors.text, 
                  backgroundColor: colors.background 
                }]}
                value={goals.fatGoal.toString()}
                onChangeText={(value) => 
                  setGoals({ ...goals, fatGoal: parseInt(value) || 0 })
                }
                keyboardType="number-pad"
                selectTextOnFocus
              />
            ) : (
              <Text style={[styles.goalValue, { color: colors.primary }]}>{userGoals.fatGoal}g</Text>
            )}
          </View>
          
          {editMode && (
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleReset}
            >
              <Text style={{ color: colors.error, fontSize: 16, fontWeight: '500' }}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>App Settings</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              <Settings size={20} color={colors.primary} style={styles.settingIcon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>App Preferences</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <View style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <View style={styles.settingInfo}>
              {isDarkMode ? (
                <Moon size={20} color={colors.primary} style={styles.settingIcon} />
              ) : (
                <Sun size={20} color={colors.primary} style={styles.settingIcon} />
              )}
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.mediumGray, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Privacy Policy</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Terms of Service</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>App Version</Text>
            <Text style={[styles.versionText, { color: colors.textSecondary }]}>1.0.1</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
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
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  goalLabel: {
    fontSize: 16,
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalInput: {
    width: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
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
  },
  versionText: {
    fontSize: 14,
  },
});