import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

const HEADER_HEIGHT = 200;

type Props = PropsWithChildren<{
  headerImage?: ReactElement;
}>;

export default function ParallaxScrollView({ children, headerImage }: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}
      scrollEventThrottle={16}>
      {/* GLOBAL HEADER */}
      <Animated.View
        style={[
          styles.header,
          { backgroundColor: Colors[colorScheme].headerBackground },
          headerAnimatedStyle,
        ]}>
        <View style={styles.headerContent}>
          <View style={styles.logoRow}>
            <Animated.Text
              style={[
                styles.headerTitle,
                { color: Colors[colorScheme].headerText },
              ]}>
              Simply
            </Animated.Text>

            <View
              style={[
                styles.budgetPill,
                { backgroundColor: Colors[colorScheme].headerAccent },
              ]}>
              <Animated.Text
                style={[
                  styles.budgetText,
                  { color: Colors[colorScheme].headerText },
                ]}>
                Budget
              </Animated.Text>
            </View>
          </View>

          {headerImage && (
            <View style={styles.headerImageContainer}>{headerImage}</View>
          )}
        </View>
      </Animated.View>

      <ThemedView style={styles.content}>{children}</ThemedView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  budgetPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  budgetText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerImageContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
});
