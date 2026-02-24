import { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { router } from "expo-router";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";

import { useExpenses } from "@/context/ExpensesContext";

export default function BudgetScreen() {
  const { budget, setBudget } = useExpenses();
  const [input, setInput] = useState(budget.toString());

  const handleSetBudget = () => {
    const value = parseFloat(input);
    if (!isNaN(value)) {
      setBudget(value);
      router.push("/");
    }
  };

  return (
    <ParallaxScrollView>
      <ThemedText type="title" style={styles.title}>
        Budget
      </ThemedText>

      <ThemedView style={styles.inputRow}>
        <ThemedText type="defaultSemiBold" style={styles.dollar}>
          $
        </ThemedText>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={input}
          onChangeText={setInput}
          placeholder="0.00"
        />
      </ThemedView>

      <Pressable style={styles.bigButton} onPress={handleSetBudget}>
        <ThemedText style={styles.bigButtonText}>Set Budget</ThemedText>
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  dollar: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 10,
    fontSize: 18,
  },
  smallButton: {
    backgroundColor: Colors.light.buttonBackground,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  smallButtonText: {
    color: Colors.light.buttonText,
    fontWeight: "600",
  },
  bigButton: {
    backgroundColor: Colors.light.buttonBackground,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  bigButtonText: {
    color: Colors.light.buttonText,
    fontWeight: "600",
  },
});
