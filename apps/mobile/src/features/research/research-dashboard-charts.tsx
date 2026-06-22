import { StyleSheet, Text, View } from "react-native";

import type { DashboardSummary } from "@diamom/contracts";

import { getVasPointColor } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

type VasAverageChartProps = {
  averageAfter: number;
  averageBefore: number;
};

type TrendCountsChartProps = {
  trendCounts: DashboardSummary["trendCounts"];
};

type ChartBar = {
  color: string;
  key: string;
  label: string;
  value: number;
};

export function VasAverageComparisonChart({
  averageAfter,
  averageBefore,
}: VasAverageChartProps) {
  const bars: ChartBar[] = [
    {
      color: getVasPointColor(averageBefore),
      key: "before",
      label: "Sebelum",
      value: averageBefore,
    },
    {
      color: getVasPointColor(averageAfter),
      key: "after",
      label: "Sesudah",
      value: averageAfter,
    },
  ];

  return (
    <View style={styles.chartArea}>
      {bars.map((bar) => (
        <View key={bar.key} style={styles.chartColumn}>
          <Text style={[styles.chartValue, { color: bar.color }]}>
            {bar.value.toFixed(2)}
          </Text>
          <View style={styles.chartTrack}>
            <View
              style={[
                styles.chartBar,
                {
                  backgroundColor: bar.color,
                  height: `${Math.max(12, bar.value * 10)}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.chartLabel}>{bar.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function TrendCountsChart({ trendCounts }: TrendCountsChartProps) {
  const bars: ChartBar[] = [
    {
      color: diamomTheme.colors.success,
      key: "decrease",
      label: "Menurun",
      value: trendCounts.decrease,
    },
    {
      color: diamomTheme.colors.danger,
      key: "increase",
      label: "Meningkat",
      value: trendCounts.increase,
    },
    {
      color: diamomTheme.colors.warning,
      key: "stable",
      label: "Tetap",
      value: trendCounts.stable,
    },
  ];
  const maxValue = Math.max(...bars.map((bar) => bar.value), 1);

  return (
    <View style={styles.chartArea}>
      {bars.map((bar) => (
        <View key={bar.key} style={styles.chartColumn}>
          <Text style={[styles.chartValue, { color: bar.color }]}>
            {bar.value}
          </Text>
          <View style={styles.chartTrack}>
            <View
              style={[
                styles.chartBar,
                {
                  backgroundColor: bar.color,
                  height: `${Math.max(12, (bar.value / maxValue) * 100)}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.chartLabel}>{bar.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chartArea: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    height: 180,
    justifyContent: "space-between",
  },
  chartBar: {
    borderRadius: diamomTheme.radius.sm,
    width: "100%",
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    gap: diamomTheme.spacing.sm,
    justifyContent: "flex-end",
  },
  chartLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  chartTrack: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.sm,
    height: 120,
    justifyContent: "flex-end",
    overflow: "hidden",
    paddingHorizontal: diamomTheme.spacing.sm,
    width: "100%",
  },
  chartValue: {
    fontSize: 18,
    fontWeight: "800",
  },
});
