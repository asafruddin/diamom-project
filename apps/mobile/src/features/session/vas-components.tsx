import { Image } from "expo-image";
import type { ImageSource } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { SurfaceCard } from "@/components/dia-ui";
import { VAS_LEGEND } from "@/features/session/vas-content";
import {
  getVasCategory,
  getVasPointColor,
  getVasScoreSurfaceColor,
} from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

type VasIllustrationProps = {
  accessibilityLabel: string;
  source: ImageSource;
  variant?: "inline" | "session" | "panel";
};

type VasScoreDisplayProps = {
  score: number;
};

type VasLegendIllustrationPanelProps = {
  accessibilityLabel: string;
  source: ImageSource;
};

export function VasIllustration({
  accessibilityLabel,
  source,
  variant = "inline",
}: VasIllustrationProps) {
  if (variant === "panel") {
    return (
      <View style={styles.panelFrame}>
        <Image
          accessibilityLabel={accessibilityLabel}
          contentFit="contain"
          source={source}
          style={styles.panelImage}
        />
      </View>
    );
  }

  const isSession = variant === "session";

  return (
    <SurfaceCard style={isSession ? styles.sessionCard : styles.inlineCard}>
      <View style={isSession ? styles.sessionFrame : styles.inlineFrame}>
        <Image
          accessibilityLabel={accessibilityLabel}
          contentFit="contain"
          source={source}
          style={styles.image}
        />
      </View>
    </SurfaceCard>
  );
}

export function VasScoreDisplay({ score }: VasScoreDisplayProps) {
  const pointColor = getVasPointColor(score);
  const surfaceColor = getVasScoreSurfaceColor(score);

  return (
    <View style={styles.scoreSection}>
      <View
        style={[
          styles.scoreCircle,
          {
            backgroundColor: surfaceColor,
            borderColor: pointColor,
          },
        ]}
      >
        <Text style={[styles.scoreValue, { color: pointColor }]}>{score}</Text>
      </View>
      <Text style={[styles.scoreCategory, { color: pointColor }]}>
        {getVasCategory(score)}
      </Text>
    </View>
  );
}

export function VasLegendIllustrationPanel({
  accessibilityLabel,
  source,
}: VasLegendIllustrationPanelProps) {
  return (
    <SurfaceCard style={styles.legendPanel}>
      <View style={styles.legendColumn}>
        <Text style={styles.legendTitle}>Keterangan:</Text>
        {VAS_LEGEND.map((item) => (
          <View key={item.range} style={styles.legendRow}>
            <Text style={styles.legendRange}>{item.range}</Text>
            <Text style={styles.legendSeparator}>:</Text>
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
      <VasIllustration
        accessibilityLabel={accessibilityLabel}
        source={source}
        variant="panel"
      />
    </SurfaceCard>
  );
}

const INLINE_HEIGHT = 180;
const SESSION_HEIGHT = 240;
const PANEL_HEIGHT = 168;

const styles = StyleSheet.create({
  inlineCard: {
    alignItems: "center",
    overflow: "hidden",
    padding: diamomTheme.spacing.sm,
  },
  sessionCard: {
    alignItems: "center",
    overflow: "hidden",
    padding: diamomTheme.spacing.md,
  },
  inlineFrame: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    height: INLINE_HEIGHT,
    justifyContent: "center",
    width: "100%",
  },
  sessionFrame: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.border,
    borderRadius: diamomTheme.radius.md,
    borderWidth: 1,
    height: SESSION_HEIGHT,
    justifyContent: "center",
    width: "100%",
  },
  panelFrame: {
    alignItems: "center",
    flex: 1,
    height: PANEL_HEIGHT,
    justifyContent: "center",
    minWidth: 120,
  },
  panelImage: {
    height: "100%",
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  scoreSection: {
    alignItems: "center",
    gap: diamomTheme.spacing.sm,
  },
  scoreCircle: {
    alignItems: "center",
    borderRadius: diamomTheme.radius.pill,
    borderWidth: 2,
    height: 132,
    justifyContent: "center",
    width: 132,
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: "800",
    lineHeight: 64,
  },
  scoreCategory: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  legendPanel: {
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.md,
  },
  legendColumn: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
    justifyContent: "center",
  },
  legendTitle: {
    color: diamomTheme.colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: diamomTheme.spacing.xs,
  },
  legendRow: {
    flexDirection: "row",
    gap: diamomTheme.spacing.xs,
  },
  legendRange: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    fontWeight: "600",
    minWidth: 28,
  },
  legendSeparator: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
  },
  legendLabel: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
