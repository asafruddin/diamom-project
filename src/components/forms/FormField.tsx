import type { TextInputProps } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { diamomTheme } from "@/theme";

export interface FormFieldProps {
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  keyboardType?: "default" | "number-pad";
  label: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  rightLabel?: string;
  value: string;
  accessibilityLabel?: string;
  inputProps?: Omit<TextInputProps, "onChangeText" | "value" | "placeholder" | "keyboardType" | "autoCapitalize" | "accessibilityLabel">;
}

export function FormField({
  autoCapitalize = "words",
  error,
  keyboardType = "default",
  label,
  onChangeText,
  placeholder,
  rightLabel,
  value,
  accessibilityLabel,
  inputProps,
}: FormFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.inputShell, error && styles.inputShellError]}>
        <TextInput
          accessibilityLabel={accessibilityLabel ?? label}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={diamomTheme.colors.textSoft}
          style={styles.input}
          value={value}
          {...inputProps}
        />
        {rightLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: diamomTheme.spacing.xs,
  },
  fieldLabel: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  inputShell: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.sm,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 52,
    paddingHorizontal: diamomTheme.spacing.md,
  },
  inputShellError: {
    borderColor: diamomTheme.colors.danger,
  },
  input: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    minWidth: 0,
    paddingVertical: diamomTheme.spacing.sm,
  },
  rightLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: diamomTheme.spacing.sm,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});