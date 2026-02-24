import { useState } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { router } from "expo-router";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

import { useExpenses } from "@/context/ExpensesContext";

export default function AddExpenseScreen() {
  const { addExpense } = useExpenses();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const value = parseFloat(amount);
    if (!title || !category || isNaN(value)) return;

    addExpense({
      id: Date.now().toString(),
      title,
      category,
      amount: value,
      date: new Date().toISOString().split("T")[0],
    });
    router.push("/");
  };

  return (
    <ParallaxScrollView>
      <ThemedText type="title" style={styles.title}>
        Add Expense
      </ThemedText>

      {/* Title Input */}
      <ThemedView style={styles.inputGroup}>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Title
        </ThemedText>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
      </ThemedView>

      {/* Category Input */}
      <ThemedView style={styles.inputGroup}>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Category
        </ThemedText>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Enter category"
        />
      </ThemedView>

      {/* Amount Input */}
      <ThemedView style={styles.inputGroup}>
        <ThemedText type="defaultSemiBold" style={styles.label}>
          Amount
        </ThemedText>

        <View style={styles.amountRow}>
          <ThemedText type="defaultSemiBold" style={styles.dollar}>
            $
          </ThemedText>

          <TextInput
            style={[styles.input, styles.amountInput]}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
          />
        </View>
      </ThemedView>

      {/* Add Expense Button */}
      <Pressable style={styles.addButton} onPress={handleAdd}>
        <ThemedText type="defaultSemiBold" style={styles.addButtonText}>
          + Add Expense
        </ThemedText>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    backgroundColor: Colors.light.buttonBackground,
    color: Colors.light.buttonText,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 18,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollar: {
    fontSize: 20,
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
  },
  addButton: {
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: Colors.light.buttonBackground,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.light.buttonText,
  },
});
