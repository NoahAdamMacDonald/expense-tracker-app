import { Image } from "expo-image";
import { StyleSheet, View, Pressable } from "react-native";
import { useState } from "react";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

import { useExpenses } from "@/context/ExpensesContext";

import { Expense } from "@/types/expense";

export default function HomeScreen() {
  const { expenses } = useExpenses();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title">Budget Tracker</ThemedText>
      </ThemedView>

      <ThemedView style={styles.summaryCard}>
        <ThemedText type="subtitle">Total Spent</ThemedText>
        <ThemedText type="title">${total.toFixed(2)}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="subtitle">Recent Expenses</ThemedText>
      </ThemedView>

      {expenses.map((expense) => (
        <ThemedView key={expense.id} style={styles.expenseItem}>
          <View>
            <ThemedText type="defaultSemiBold">{expense.title}</ThemedText>
            <ThemedText type="default">
              {expense.category} • {expense.date}
            </ThemedText>
          </View>
          <ThemedText type="defaultSemiBold">
            ${expense.amount.toFixed(2)}
          </ThemedText>
        </ThemedView>
      ))}

      <Pressable
        style={styles.addButton}
        onPress={() => {
          
        }}>
        <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
          + Add Expense
        </ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 16,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 8,
  },
  expenseItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.light.tint,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
