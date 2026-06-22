import type { ReactNode } from "react";
import { useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  VAS_SCALE_POINTS,
  getVasCategory,
  getVasPointColor,
} from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

interface DiaScreenProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
}

interface PageHeaderProps {
  description?: string;
  eyebrow?: string;
  showBack?: boolean;
  title: string;
}

interface ActionButtonProps {
  accessibilityLabel?: string;
  disabled?: boolean;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

interface SurfaceCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface ListRowCardProps {
  description: string;
  onPress?: () => void;
  step?: string;
  title: string;
}

interface IllustrationPanelProps {
  badge: string;
  detail: string;
  title: string;
}

interface BulletListProps {
  items: string[];
}

interface InfoPillProps {
  label: string;
}

interface VasSelectorProps {
  onChange: (score: number) => void;
  showSummary?: boolean;
  value: number;
}

export function DiaScreen({
  children,
  contentContainerStyle,
  scroll = true,
}: DiaScreenProps) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.content, contentContainerStyle]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

export function PageHeader({
  description,
  eyebrow,
  showBack,
  title,
}: PageHeaderProps) {
  const router = useRouter();
  return (
    <View style={styles.headerBlock}>
      {showBack ? (
        <Pressable
          accessibilityLabel="Kembali"
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={diamomTheme.colors.primary}
          />
        </Pressable>
      ) : null}
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
    </View>
  );
}

export function SurfaceCard({ children, style }: SurfaceCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function ActionButton({
  accessibilityLabel,
  disabled = false,
  label,
  onPress,
  variant = "primary",
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          isPrimary ? styles.primaryButtonText : styles.secondaryButtonText,
          disabled && styles.buttonTextDisabled,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ListRowCard({
  description,
  onPress,
  step,
  title,
}: ListRowCardProps) {
  const content = (
    <View style={styles.listRowContent}>
      <View style={styles.listRowTextBlock}>
        <View style={styles.listRowHeading}>
          {step ? <Text style={styles.stepText}>{step}</Text> : null}
          <Text style={styles.listRowTitle}>{title}</Text>
        </View>
        <Text style={styles.listRowDescription}>{description}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={diamomTheme.colors.mutedText}
      />
    </View>
  );

  if (!onPress) {
    return <SurfaceCard style={styles.listRowCard}>{content}</SurfaceCard>;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.cardPressed]}
    >
      <SurfaceCard style={styles.listRowCard}>{content}</SurfaceCard>
    </Pressable>
  );
}

export function IllustrationPanel({
  badge,
  detail,
  title,
}: IllustrationPanelProps) {
  return (
    <SurfaceCard style={styles.illustrationCard}>
      <View style={styles.illustrationGlowLarge} />
      <View style={styles.illustrationGlowSmall} />
      <View style={styles.badgeCircle}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      <Text style={styles.illustrationTitle}>{title}</Text>
      <Text style={styles.illustrationDetail}>{detail}</Text>
    </SurfaceCard>
  );
}

export function BulletList({ items }: BulletListProps) {
  return (
    <View style={styles.listBlock}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function InfoPill({ label }: InfoPillProps) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

export function VasSelector({
  onChange,
  showSummary = true,
  value,
}: VasSelectorProps) {
  const containerRef = useRef<View>(null);
  const containerLayout = useRef({ width: 1, x: 0 });
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const updateScoreFromPageX = (pageX: number) => {
    const relX = pageX - containerLayout.current.x;
    const ratio = Math.max(
      0,
      Math.min(1, relX / containerLayout.current.width),
    );
    onChangeRef.current(Math.round(ratio * 10));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => updateScoreFromPageX(e.nativeEvent.pageX),
      onPanResponderMove: (e) => updateScoreFromPageX(e.nativeEvent.pageX),
    }),
  ).current;

  return (
    <View style={styles.vasSection}>
      <View
        ref={containerRef}
        onLayout={() => {
          containerRef.current?.measure((_lx, _ly, width, _lh, pageX) => {
            containerLayout.current = { width, x: pageX };
          });
        }}
        style={styles.vasSliderWrapper}
        {...panResponder.panHandlers}
      >
        <View style={styles.vasLabelsRow}>
          {VAS_SCALE_POINTS.map((score) => (
            <Text key={score} style={styles.vasLabel}>
              {score}
            </Text>
          ))}
        </View>
        <View style={styles.vasTrackContainer}>
          <View style={styles.vasTrackGradient}>
            <View
              style={[
                styles.vasTrackSegment,
                { backgroundColor: diamomTheme.colors.vasLow, flex: 3 },
              ]}
            />
            <View
              style={[
                styles.vasTrackSegment,
                { backgroundColor: diamomTheme.colors.vasMid, flex: 2 },
              ]}
            />
            <View
              style={[
                styles.vasTrackSegment,
                { backgroundColor: diamomTheme.colors.vasHigh, flex: 2 },
              ]}
            />
            <View
              style={[
                styles.vasTrackSegment,
                { backgroundColor: diamomTheme.colors.vasSevere, flex: 3 },
              ]}
            />
          </View>
          <View style={styles.vasDotsRow}>
            {VAS_SCALE_POINTS.map((score) => {
              const isSelected = score === value;
              const pointColor = getVasPointColor(score);
              return (
                <View
                  accessibilityLabel={`VAS ${score}`}
                  key={score}
                  style={styles.vasDotWrap}
                >
                  <View
                    style={[
                      styles.vasDot,
                      {
                        backgroundColor: pointColor,
                        height: isSelected ? 22 : 14,
                        width: isSelected ? 22 : 14,
                      },
                      isSelected && styles.vasDotSelected,
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {showSummary ? (
        <SurfaceCard style={styles.vasSummaryCard}>
          <Text style={styles.vasSummaryValue}>{value}</Text>
          <Text style={styles.vasSummaryLabel}>{getVasCategory(value)}</Text>
        </SurfaceCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: diamomTheme.colors.background,
    flex: 1,
  },
  content: {
    gap: diamomTheme.spacing.lg,
    paddingHorizontal: diamomTheme.spacing.lg,
    paddingVertical: diamomTheme.spacing.lg,
  },
  headerBlock: {
    gap: diamomTheme.spacing.xs,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: diamomTheme.spacing.xs,
    marginLeft: -diamomTheme.spacing.xs,
    padding: diamomTheme.spacing.xs,
  },
  eyebrow: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    color: diamomTheme.colors.text,
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 38,
  },
  description: {
    color: diamomTheme.colors.mutedText,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    gap: diamomTheme.spacing.sm,
    padding: diamomTheme.spacing.md,
  },
  cardPressed: {
    opacity: 0.88,
  },
  button: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.pill,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: diamomTheme.spacing.lg,
  },
  buttonPressed: {
    opacity: 0.84,
  },
  primaryButton: {
    backgroundColor: diamomTheme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderColor: diamomTheme.colors.border,
    borderWidth: 1,
  },
  buttonDisabled: {
    backgroundColor: diamomTheme.colors.border,
    borderColor: diamomTheme.colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  buttonTextDisabled: {
    color: diamomTheme.colors.textSoft,
  },
  primaryButtonText: {
    color: diamomTheme.colors.onPrimary,
  },
  secondaryButtonText: {
    color: diamomTheme.colors.primaryStrong,
  },
  listRowCard: {
    paddingBottom: 0,
  },
  listRowContent: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  listRowTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  listRowHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  stepText: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  listRowTitle: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },
  listRowDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  illustrationCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    minHeight: 220,
    overflow: "hidden",
    paddingTop: diamomTheme.spacing.xxl,
    position: "relative",
  },
  illustrationGlowLarge: {
    backgroundColor: diamomTheme.colors.illustrationBase,
    borderRadius: diamomTheme.radius.pill,
    height: 180,
    opacity: 0.72,
    position: "absolute",
    right: -20,
    top: -10,
    width: 180,
  },
  illustrationGlowSmall: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    height: 110,
    left: -15,
    opacity: 0.92,
    position: "absolute",
    top: 78,
    width: 110,
  },
  badgeCircle: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.pill,
    height: 86,
    justifyContent: "center",
    marginBottom: diamomTheme.spacing.md,
    width: 86,
  },
  badgeText: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 28,
    fontWeight: "800",
  },
  illustrationTitle: {
    color: diamomTheme.colors.text,
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    textAlign: "center",
  },
  illustrationDetail: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  listBlock: {
    gap: diamomTheme.spacing.sm,
  },
  bulletRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  bulletDot: {
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.pill,
    height: 8,
    marginTop: 7,
    width: 8,
  },
  bulletText: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  pill: {
    alignSelf: "flex-start",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  pillText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 13,
    fontWeight: "700",
  },
  vasSection: {
    gap: diamomTheme.spacing.md,
  },
  vasSliderWrapper: {
    gap: diamomTheme.spacing.sm,
    paddingVertical: diamomTheme.spacing.sm,
  },
  vasLabelsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vasLabel: {
    color: diamomTheme.colors.text,
    fontSize: 13,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  vasTrackContainer: {
    alignItems: "center",
    height: 28,
    justifyContent: "center",
  },
  vasTrackGradient: {
    borderRadius: diamomTheme.radius.pill,
    flexDirection: "row",
    height: 6,
    left: 10,
    overflow: "hidden",
    position: "absolute",
    right: 10,
  },
  vasTrackSegment: {
    height: "100%",
  },
  vasDotsRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
    position: "absolute",
    right: 0,
  },
  vasDotWrap: {
    alignItems: "center",
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  vasDot: {
    borderRadius: diamomTheme.radius.pill,
  },
  vasDotSelected: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  vasSummaryCard: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
  },
  vasSummaryValue: {
    color: diamomTheme.colors.text,
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
  },
  vasSummaryLabel: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 16,
    fontWeight: "700",
  },
});
