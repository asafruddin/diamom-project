import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import type { DashboardSummary } from "@diamom/contracts";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import {
  fetchResearchDashboardSummary,
  logoutResearcher,
} from "@/features/research/research-api";
import { useResearcherAuthStore } from "@/features/research/researcher-auth-store";
import { diamomTheme } from "@/theme";

export default function ResearcherDashboardScreen() {
  const logoutLocal = useResearcherAuthStore((state) => state.logoutLocal);
  const session = useResearcherAuthStore((state) => state.session);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      return;
    }

    void fetchResearchDashboardSummary(session.accessToken)
      .then((value) => {
        setSummary(value);
        setError(null);
      })
      .catch((dashboardError) => {
        setError(
          dashboardError instanceof Error
            ? dashboardError.message
            : "Dashboard peneliti belum dapat dimuat.",
        );
      });
  }, [session]);

  if (!session) {
    return <Redirect href="/researcher/login" />;
  }

  const handleLogout = async () => {
    try {
      await logoutResearcher(session.accessToken);
    } catch {
      // Ignore remote logout errors and clear local session anyway.
    }

    await logoutLocal();
    router.replace("/researcher/login");
  };

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Peneliti"
        showBack
        title="Dashboard Peneliti"
        description={`Masuk sebagai ${session.researcher.username}. Ringkasan ini berasal dari data peserta yang sudah memberikan persetujuan sinkronisasi.`}
      />

      {error ? (
        <SurfaceCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
        </SurfaceCard>
      ) : null}

      <View style={styles.metricsGrid}>
        <MetricCard
          label="Total Responden"
          value={String(summary?.totalRespondents ?? 0)}
        />
        <MetricCard
          label="Rata-rata VAS Sebelum"
          value={formatMetric(summary?.averageVasBefore)}
        />
        <MetricCard
          label="Rata-rata VAS Sesudah"
          value={formatMetric(summary?.averageVasAfter)}
        />
        <MetricCard
          label="Rata-rata Delta Nyeri"
          value={formatMetric(summary?.averageDelta)}
        />
      </View>

      <SurfaceCard style={styles.trendCard}>
        <Text style={styles.sectionTitle}>Ringkasan Tren Nyeri</Text>
        <TrendRow
          label="Menurun"
          value={String(summary?.trendCounts.decrease ?? 0)}
        />
        <TrendRow
          label="Meningkat"
          value={String(summary?.trendCounts.increase ?? 0)}
        />
        <TrendRow
          label="Tetap"
          value={String(summary?.trendCounts.stable ?? 0)}
        />
      </SurfaceCard>

      <ActionButton label="Keluar" onPress={handleLogout} variant="secondary" />
    </DiaScreen>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <SurfaceCard style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </SurfaceCard>
  );
}

function TrendRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.trendRow}>
      <Text style={styles.trendLabel}>{label}</Text>
      <Text style={styles.trendValue}>{value}</Text>
    </View>
  );
}

function formatMetric(value: number | undefined) {
  return typeof value === "number" ? value.toFixed(2) : "0.00";
}

const styles = StyleSheet.create({
  errorCard: {
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderColor: diamomTheme.colors.danger,
  },
  errorText: {
    color: diamomTheme.colors.danger,
    fontSize: 14,
    lineHeight: 20,
  },
  metricCard: {
    flex: 1,
    gap: diamomTheme.spacing.sm,
    minWidth: "46%",
  },
  metricLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  metricValue: {
    color: diamomTheme.colors.text,
    fontSize: 28,
    fontWeight: "800",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: diamomTheme.spacing.md,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  trendCard: {
    gap: diamomTheme.spacing.sm,
  },
  trendLabel: {
    color: diamomTheme.colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  trendRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trendValue: {
    color: diamomTheme.colors.text,
    fontSize: 16,
    fontWeight: "800",
  },
});
