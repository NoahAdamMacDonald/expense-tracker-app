import { StyleSheet, View, Pressable } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { router } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

import { useExpenses } from "@/context/ExpensesContext";

export default function HomeScreen() {
  const { expenses, addExpense, budget } = useExpenses();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - total;

  return (
    <ParallaxScrollView>
      {/* Screen Title */}
      <ThemedText type="title" style={styles.screenTitle}>
        Budget Tracker
      </ThemedText>

      {/* Summary Card */}
      <ThemedView style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <ThemedText type="subtitle" style={styles.summaryLabel}>
            Total Spent
          </ThemedText>
          <ThemedText type="title" style={styles.summaryValue}>
            ${total.toFixed(2)}
          </ThemedText>
        </View>

        <View style={styles.summaryRow}>
          <ThemedText type="subtitle" style={styles.summaryLabel}>
            Budget
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.summaryValue}>
            ${budget}
          </ThemedText>
        </View>

        <View style={styles.summaryRow}>
          <ThemedText type="subtitle" style={styles.summaryLabel}>
            Remaining
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.summaryValue}>
            {remaining >= 0 ? "+" : "-"}${Math.abs(remaining).toFixed(2)}
          </ThemedText>
        </View>
      </ThemedView>

      {/* Add Expense Button */}
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/add-expense")}>
        <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
          + Add Expense
        </ThemedText>
      </Pressable>

      {/* Recent Expenses */}
      <ThemedText type="subtitle" style={styles.sectionHeader}>
        Recent Expenses
      </ThemedText>

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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  screenTitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 22,
  },
  summaryCard: {
    backgroundColor: Colors.light.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    color: Colors.light.cardText,
  },
  summaryValue: {
    color: Colors.light.cardText,
  },
  sectionHeader: {
    marginBottom: 12,
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
    borderRadius: 16,
    backgroundColor: Colors.light.buttonBackground,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.light.cardText,
  },
});
