import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFoodStore } from '@/store/foodStore';
import { colors } from '@/constants/colors';
import { formatDisplayDate, getPreviousDays } from '@/utils/date';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HistoryScreen() {
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
        style={styles.dateItem}
        onPress={() => handleDatePress(date)}
      >
        <View style={styles.dateInfo}>
          <Text style={styles.dateText}>{formatDisplayDate(date)}</Text>
          <Text style={styles.calorieText}>
            {Math.round(summary.totals.calories)} calories
          </Text>
        </View>
        
        <View style={styles.macrosContainer}>
          <MacroItem label="P" value={Math.round(summary.totals.protein)} />
          <MacroItem label="C" value={Math.round(summary.totals.carbs)} />
          <MacroItem label="F" value={Math.round(summary.totals.fat)} />
        </View>
        
        <ChevronRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Nutrition History</Text>
      
      <FlatList
        data={dates}
        keyExtractor={(date) => date}
        renderItem={renderDateItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No history yet</Text>
            <Text style={styles.emptySubtext}>
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
}

const MacroItem = ({ label, value }: MacroItemProps) => (
  <View style={styles.macroItem}>
    <Text style={styles.macroLabel}>{label}</Text>
    <Text style={styles.macroValue}>{value}g</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    margin: 16,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
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
    color: colors.text,
    marginBottom: 4,
  },
  calorieText: {
    fontSize: 14,
    color: colors.primary,
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
    color: colors.textSecondary,
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
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
});