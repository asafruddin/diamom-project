import type { MaterialHref, MaterialIconName } from "./materials-content";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { SurfaceCard } from "@/components/dia-ui";
import { diamomTheme } from "@/theme";

type MaterialHeroProps = {
  detail: string;
  iconName: MaterialIconName;
  readTime: string;
  title: string;
};

type SectionChipRowProps = {
  sections: string[];
};

type LearningSectionCardProps = {
  body?: string;
  bullets?: string[];
  iconName: MaterialIconName;
  title: string;
  tone?: "calm" | "support" | "safety";
};

type SafetyNoticeCardProps = {
  items: string[];
  title?: string;
};

type StepTimelineCardProps = {
  description: string;
  step: string;
  steps?: string[];
  title: string;
};

type PrevNextMaterialNavProps = {
  next?: {
    href: MaterialHref;
    title: string;
  };
  previous?: {
    href: MaterialHref;
    title: string;
  };
};

type MaterialModuleCardProps = {
  description: string;
  href: MaterialHref;
  iconName: MaterialIconName;
  readTime: string;
  step: string;
  title: string;
};

export function MaterialHero({
  detail,
  iconName,
  readTime,
  title,
}: MaterialHeroProps) {
  return (
    <SurfaceCard style={styles.heroCard}>
      <View style={styles.heroPattern}>
        <View style={styles.heroBandLarge} />
        <View style={styles.heroBandSmall} />
      </View>
      <View style={styles.heroIconWrap}>
        <Ionicons
          color={diamomTheme.colors.onPrimary}
          name={iconName}
          size={42}
        />
      </View>
      <View style={styles.readTimePill}>
        <Ionicons
          color={diamomTheme.colors.primaryStrong}
          name="time"
          size={14}
        />
        <Text style={styles.readTimeText}>{readTime}</Text>
      </View>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroDetail}>{detail}</Text>
    </SurfaceCard>
  );
}

export function SectionChipRow({ sections }: SectionChipRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipContent}
    >
      {sections.map((section) => (
        <View key={section} style={styles.sectionChip}>
          <Text style={styles.sectionChipText}>{section}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export function LearningSectionCard({
  body,
  bullets,
  iconName,
  title,
  tone = "calm",
}: LearningSectionCardProps) {
  return (
    <SurfaceCard style={styles.learningCard}>
      <View style={styles.sectionHeading}>
        <View style={[styles.sectionIconWrap, getToneStyle(tone)]}>
          <Ionicons
            color={
              tone === "safety"
                ? diamomTheme.colors.danger
                : diamomTheme.colors.primaryStrong
            }
            name={iconName}
            size={20}
          />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {body ? <Text style={styles.body}>{body}</Text> : null}
      {bullets ? <MaterialBulletList items={bullets} tone={tone} /> : null}
    </SurfaceCard>
  );
}

export function SafetyNoticeCard({
  items,
  title = "Jangan lanjutkan bila...",
}: SafetyNoticeCardProps) {
  return (
    <SurfaceCard style={styles.safetyCard}>
      <View style={styles.sectionHeading}>
        <View style={[styles.sectionIconWrap, styles.iconSafety]}>
          <Ionicons
            color={diamomTheme.colors.danger}
            name="warning"
            size={20}
          />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <MaterialBulletList items={items} tone="safety" />
    </SurfaceCard>
  );
}

export function StepTimelineCard({
  description,
  step,
  steps,
  title,
}: StepTimelineCardProps) {
  return (
    <SurfaceCard style={styles.timelineCard}>
      <View style={styles.timelineRow}>
        <View style={styles.timelineMarker}>
          <Text style={styles.timelineMarkerText}>{step}</Text>
        </View>
        <View style={styles.timelineTextBlock}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.body}>{description}</Text>
        </View>
      </View>
      {steps ? <MaterialBulletList items={steps} tone="calm" /> : null}
    </SurfaceCard>
  );
}

export function PrevNextMaterialNav({
  next,
  previous,
}: PrevNextMaterialNavProps) {
  return (
    <View style={styles.navRow}>
      {previous ? (
        <Pressable
          accessibilityLabel={`Buka materi sebelumnya: ${previous.title}`}
          accessibilityRole="button"
          onPress={() => router.push(previous.href)}
          style={({ pressed }) => [
            styles.navButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons
            color={diamomTheme.colors.primaryStrong}
            name="chevron-back"
            size={18}
          />
          <View style={styles.navTextBlock}>
            <Text style={styles.navLabel}>Sebelumnya</Text>
            <Text style={styles.navTitle}>{previous.title}</Text>
          </View>
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}

      {next ? (
        <Pressable
          accessibilityLabel={`Buka materi berikutnya: ${next.title}`}
          accessibilityRole="button"
          onPress={() => router.push(next.href)}
          style={({ pressed }) => [
            styles.navButton,
            styles.navButtonNext,
            pressed && styles.pressed,
          ]}
        >
          <View style={[styles.navTextBlock, styles.navTextBlockRight]}>
            <Text style={styles.navLabel}>Berikutnya</Text>
            <Text style={styles.navTitle}>{next.title}</Text>
          </View>
          <Ionicons
            color={diamomTheme.colors.primaryStrong}
            name="chevron-forward"
            size={18}
          />
        </Pressable>
      ) : (
        <View style={styles.navSpacer} />
      )}
    </View>
  );
}

export function MaterialModuleCard({
  description,
  href,
  iconName,
  readTime,
  step,
  title,
}: MaterialModuleCardProps) {
  return (
    <Pressable
      accessibilityLabel={`Buka ${title}`}
      accessibilityRole="button"
      onPress={() => router.push(href)}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <SurfaceCard style={styles.moduleCard}>
        <View style={styles.moduleIconWrap}>
          <Ionicons
            color={diamomTheme.colors.primaryStrong}
            name={iconName}
            size={24}
          />
        </View>
        <View style={styles.moduleTextBlock}>
          <View style={styles.moduleMetaRow}>
            <Text style={styles.stepText}>Materi {step}</Text>
            <Text style={styles.metaDot}>.</Text>
            <Text style={styles.stepText}>{readTime}</Text>
          </View>
          <Text style={styles.moduleTitle}>{title}</Text>
          <Text style={styles.moduleDescription}>{description}</Text>
        </View>
        <Ionicons
          color={diamomTheme.colors.textSoft}
          name="chevron-forward"
          size={20}
        />
      </SurfaceCard>
    </Pressable>
  );
}

function MaterialBulletList({
  items,
  tone,
}: {
  items: string[];
  tone: NonNullable<LearningSectionCardProps["tone"]>;
}) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View
            style={[
              styles.bulletDot,
              tone === "safety" && styles.bulletDotSafety,
            ]}
          />
          <Text style={styles.body}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function getToneStyle(
  tone: NonNullable<LearningSectionCardProps["tone"]>,
): StyleProp<ViewStyle> {
  if (tone === "safety") {
    return styles.iconSafety;
  }

  if (tone === "support") {
    return styles.iconSupport;
  }

  return styles.iconCalm;
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    minHeight: 240,
    overflow: "hidden",
    padding: diamomTheme.spacing.lg,
    position: "relative",
  },
  heroPattern: {
    bottom: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: 150,
  },
  heroBandLarge: {
    backgroundColor: diamomTheme.colors.illustrationBase,
    borderRadius: diamomTheme.radius.lg,
    height: 190,
    opacity: 0.72,
    position: "absolute",
    right: -42,
    top: 18,
    transform: [{ rotate: "-18deg" }],
    width: 86,
  },
  heroBandSmall: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    bottom: 28,
    height: 96,
    opacity: 0.86,
    position: "absolute",
    right: 54,
    transform: [{ rotate: "16deg" }],
    width: 42,
  },
  heroIconWrap: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.lg,
    height: 78,
    justifyContent: "center",
    marginBottom: diamomTheme.spacing.md,
    width: 78,
  },
  readTimePill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.pill,
    borderWidth: 1,
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
    marginBottom: diamomTheme.spacing.sm,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  readTimeText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  heroTitle: {
    color: diamomTheme.colors.text,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 31,
    maxWidth: 300,
  },
  heroDetail: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 315,
  },
  chipContent: {
    gap: diamomTheme.spacing.sm,
    paddingRight: diamomTheme.spacing.lg,
  },
  sectionChip: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.pill,
    borderWidth: 1,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  sectionChipText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  learningCard: {
    gap: diamomTheme.spacing.md,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  sectionIconWrap: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.md,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  iconCalm: {
    backgroundColor: diamomTheme.colors.primaryMuted,
  },
  iconSupport: {
    backgroundColor: diamomTheme.colors.success,
  },
  iconSafety: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.danger,
    borderWidth: 1,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 23,
  },
  body: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  bulletList: {
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
  bulletDotSafety: {
    backgroundColor: diamomTheme.colors.danger,
  },
  safetyCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.danger,
    gap: diamomTheme.spacing.md,
  },
  timelineCard: {
    gap: diamomTheme.spacing.md,
  },
  timelineRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  timelineMarker: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primary,
    borderRadius: diamomTheme.radius.md,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  timelineMarkerText: {
    color: diamomTheme.colors.onPrimary,
    fontSize: 14,
    fontWeight: "800",
  },
  timelineTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  navRow: {
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  navButton: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.surface,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
    minHeight: 74,
    padding: diamomTheme.spacing.md,
  },
  navButtonNext: {
    justifyContent: "flex-end",
  },
  navSpacer: {
    flex: 1,
  },
  navTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  navTextBlockRight: {
    alignItems: "flex-end",
  },
  navLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 12,
    fontWeight: "800",
  },
  navTitle: {
    color: diamomTheme.colors.text,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  moduleCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    minHeight: 116,
    padding: diamomTheme.spacing.md,
  },
  moduleIconWrap: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.md,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  moduleTextBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  moduleMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
  },
  stepText: {
    color: diamomTheme.colors.accentStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  metaDot: {
    color: diamomTheme.colors.textSoft,
    fontSize: 13,
    fontWeight: "800",
  },
  moduleTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  moduleDescription: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.86,
  },
});
