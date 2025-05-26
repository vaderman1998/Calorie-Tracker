import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFoodStore } from '@/store/foodStore';
import { formatDisplayDate, getPreviousDays } from '@/utils/date';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function HistoryScreen() {
  const { colors } = useAppTheme();
  const { getDailySummary } = useFoodStore();
  
  // Get the last 30 days
  const dates = getPreviousDays(30);
  
  const handleDatePress = (date: string) => {
    router.push({
      pathname: '/day-details',
      params: { date }
    });
  };
  
  const renderDateItem = ({ item: date }: { item: string }) => {
    const summary = getDailySummary(date);
    const hasEntries = Object.values(summary.meals).some(meals => meals.length > 0);
    
    if (!hasEntries) return null;
    
    return (
      <TouchableOpacity 
        style={[styles.dateItem, { 
          backgroundColor: colors.card,
          shadowColor: colors.black
        }]}
        onPress={() => handleDatePress(date)}
      >
        <View style={styles.dateInfo}>
          <Text style={[styles.dateText, { color: colors.text }]}>{formatDisplayDate(date)}</Text>
          <Text style={[styles.calorieText, { color: colors.primary }]}>
            {Math.round(summary.totals.calories)} calories
          </Text>
        </View>
        
        <View style={styles.macrosContainer}>
          <MacroItem 
            label="P" 
            value={Math.round(summary.totals.protein)} 
            textColor={colors.text}
            secondaryColor={colors.textSecondary}
          />
          <MacroItem 
            label="C" 
            value={Math.round(summary.totals.carbs)} 
            textColor={colors.text}
            secondaryColor={colors.textSecondary}
          />
          <MacroItem 
            label="F" 
            value={Math.round(summary.totals.fat)} 
            textColor={colors.text}
            secondaryColor={colors.textSecondary}
          />
        </View>
        
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Your Nutrition History</Text>
      
      <FlatList
        data={dates}
        keyExtractor={(date) => date}
        renderItem={renderDateItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>No history yet</Text>
            <Text style={[styles.emptySubtext, { color: colors.textSecondary }]}>
              Start tracking your meals to see your history here
            </Text>
          </View>
        }
      />
    </View>
  );
}

interface MacroItemProps {
  label: string;
  value: number;
  textColor: string;
  secondaryColor: string;
}

const MacroItem = ({ label, value, textColor, secondaryColor }: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={[styles.macroLabel, { color: secondaryColor }]}>{label}</Text>
    <Text style={[styles.macroValue, { color: textColor }]}>{value}g</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    margin: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateInfo: {
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  calorieText: {
    fontSize: 14,
    fontWeight: '500',
  },
  macrosContainer: {
    flexDirection: 'row',
    marginRight: 16,
  },
  macroItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  macroLabel: {
    fontSize: 12,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
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
});