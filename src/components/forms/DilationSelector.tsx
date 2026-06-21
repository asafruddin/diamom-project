import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

import { diamomTheme } from "@/theme";

export interface DilationSelectorProps {
  options?: readonly number[];
  value: number | null;
  onChange: (value: number) => void;
  error?: string;
  accessibilityLabelPrefix?: string;
  columns?: number;
}

const DEFAULT_OPTIONS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function DilationSelector({
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  error,
  accessibilityLabelPrefix = "Pembukaan",
  columns = 5,
}: DilationSelectorProps) {
  const screenWidth = Dimensions.get("window").width;
  // Account for DiaScreen padding (lg=24) + SurfaceCard padding (md=16) = 40 per side
  const horizontalPadding = 80;
  const gap = diamomTheme.spacing.sm;
  const totalGap = gap * (columns - 1);
  const itemWidth = (screenWidth - horizontalPadding - totalGap) / columns;

  return (
    <View>
      <View style={[styles.dilationGrid, { gap }]}>
        {options.map((option) => {
          const isSelected = value === option;
          return (
            <Pressable
              accessibilityLabel={`${accessibilityLabelPrefix} ${option} cm`}
              accessibilityRole="button"
              key={option}
              onPress={() => onChange(option)}
              style={({ pressed }) => [
                styles.dilationOption,
                { width: itemWidth },
                isSelected && styles.dilationOptionSelected,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.dilationNumber,
                    isSelected && styles.dilationNumberSelected,
                  ]}
                >
                  {option}
                </Text>
                <Text
                  style={[
                    styles.dilationUnit,
                    isSelected && styles.dilationUnitSelected,
                  ]}
                >
                  cm
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dilationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dilationOption: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1.5,
    height: 58,
    justifyContent: "center",
  },
  optionContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  dilationOptionSelected: {
    backgroundColor: diamomTheme.colors.primary,
    borderColor: diamomTheme.colors.primary,
    elevation: 2,
    shadowColor: diamomTheme.colors.primary,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dilationNumber: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 22,
  },
  dilationNumberSelected: {
    color: diamomTheme.colors.onPrimary,
  },
  dilationUnit: {
    color: diamomTheme.colors.mutedText,
    fontSize: 11,
    fontWeight: "700",
    marginTop: -2,
  },
  dilationUnitSelected: {
    color: diamomTheme.colors.onPrimary,
    opacity: 0.9,
  },
  pressed: {
    opacity: 0.84,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: diamomTheme.spacing.xs,
  },
});