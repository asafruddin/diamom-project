import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import {
  ActionButton,
  DiaScreen,
  PageHeader,
  SurfaceCard,
} from "@/components/dia-ui";
import { useProfileStore } from "@/features/onboarding/profile-store";
import {
  buildResultChartBars,
  formatDurationMinutes,
  getPainChangeSummary,
  getResultStatusLabel,
} from "@/features/session/result-summary";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { useVasHistoryStore } from "@/features/session/vas-history-store";
import { getVasCategory, getVasPointColor } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  month: "long",
  year: "numeric",
});

function getMotivationalMessage(difference: number): string {
  if (difference > 0) {
    return "Luar biasa! Labor Dance membantu Anda merasa lebih nyaman. Tetap utamakan kenyamanan tubuh dan ikuti arahan bidan atau tenaga kesehatan.";
  }
  if (difference === 0) {
    return "Nilai tetap stabil. Istirahatlah sejenak dan lanjutkan kembali bila tubuh terasa siap.";
  }
  return "Nilai meningkat. Dengarkan tubuh Anda dan beristirahatlah bila perlu. Konsultasikan dengan tenaga kesehatan Anda.";
}

export default function VasSummaryScreen() {
  const afterScore = usePracticeSessionStore((state) => state.afterScore);
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const durationMinutes = usePracticeSessionStore(
    (state) => state.durationMinutes,
  );
  const resetPracticeSession = usePracticeSessionStore(
    (state) => state.resetPracticeSession,
  );
  const motherName = useProfileStore(
    (state) => state.motherIdentity?.motherName ?? "Ibu",
  );
  const latestRecord = useVasHistoryStore((state) => state.records[0]);

  const prev = beforeScore ?? 0;
  const next = afterScore ?? 0;
  const difference = prev - next;
  const changeSummary = getPainChangeSummary(prev, next);
  const chartBars = buildResultChartBars(prev, next);
  const status = latestRecord?.status ?? getResultStatusLabel();
  const completedAt = latestRecord?.savedAt;

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="VAS"
        title="Hasil Penilaian"
        description="Perubahan tingkat nyeri yang Anda catat setelah sesi selesai."
      />

      <SurfaceCard style={styles.comparisonCard}>
        <View style={styles.scoreRow}>
          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sebelum</Text>
            <Text
              style={[styles.scoreValue, { color: getVasPointColor(prev) }]}
            >
              {prev}
            </Text>
            <Text
              style={[styles.scoreCategory, { color: getVasPointColor(prev) }]}
            >
              {getVasCategory(prev)}
            </Text>
          </View>

          <Text style={styles.arrow}>{"\u2192"}</Text>

          <View style={styles.scoreBlock}>
            <Text style={styles.scoreLabel}>Sesudah</Text>
            <Text
              style={[styles.scoreValue, { color: getVasPointColor(next) }]}
            >
              {next}
            </Text>
            <Text
              style={[styles.scoreCategory, { color: getVasPointColor(next) }]}
            >
              {getVasCategory(next)}
            </Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Ringkasan Sesi</Text>
        <DetailRow label="Nama" value={motherName} />
        <DetailRow
          label="Durasi"
          value={formatDurationMinutes(durationMinutes)}
        />
        <DetailRow
          label="Nyeri awal"
          value={`${prev} • ${getVasCategory(prev)}`}
        />
        <DetailRow
          label="Nyeri akhir"
          value={`${next} • ${getVasCategory(next)}`}
        />
        <DetailRow
          label="Penurunan / Peningkatan Nyeri"
          value={changeSummary.label}
        />
        <DetailRow label="Status" value={status} />
        {completedAt ? (
          <DetailRow label="Waktu simpan" value={formatSavedAt(completedAt)} />
        ) : null}
      </SurfaceCard>

      <SurfaceCard style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Grafik Hasil</Text>
        <View style={styles.chartArea}>
          {chartBars.map((bar) => (
            <View key={bar.key} style={styles.chartColumn}>
              <Text
                style={[
                  styles.chartValue,
                  { color: getVasPointColor(bar.score) },
                ]}
              >
                {bar.score}
              </Text>
              <View style={styles.chartTrack}>
                <View
                  style={[
                    styles.chartBar,
                    {
                      backgroundColor: getVasPointColor(bar.score),
                      height: `${Math.max(12, bar.score * 10)}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.chartLabel}>{bar.label}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.chartNote}>
          Grafik ini adalah catatan pemantauan mandiri, bukan bukti hasil
          medis.
        </Text>
      </SurfaceCard>

      <SurfaceCard style={styles.motivationalCard}>
        <Text style={styles.motivationalText}>
          {getMotivationalMessage(difference)}
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Selesai"
        onPress={() => {
          resetPracticeSession();
          router.replace("/(tabs)/vas");
        }}
      />
    </DiaScreen>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function formatSavedAt(savedAt: string): string {
  const date = new Date(savedAt);

  if (Number.isNaN(date.getTime())) {
    return savedAt;
  }

  return dateTimeFormatter.format(date);
}

const styles = StyleSheet.create({
  comparisonCard: {
    paddingVertical: diamomTheme.spacing.lg,
  },
  scoreRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreBlock: {
    alignItems: "center",
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  scoreLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 13,
    fontWeight: "700",
  },
  scoreValue: {
    fontSize: 56,
    fontWeight: "800",
    lineHeight: 64,
  },
  scoreCategory: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  arrow: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 28,
    fontWeight: "800",
    paddingHorizontal: diamomTheme.spacing.sm,
  },
  detailsCard: {
    gap: diamomTheme.spacing.sm,
  },
  sectionTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  detailRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
    justifyContent: "space-between",
  },
  detailLabel: {
    color: diamomTheme.colors.mutedText,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  detailValue: {
    color: diamomTheme.colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "right",
  },
  chartCard: {
    gap: diamomTheme.spacing.md,
  },
  chartArea: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: diamomTheme.spacing.lg,
    justifyContent: "space-evenly",
    minHeight: 190,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
    gap: diamomTheme.spacing.sm,
  },
  chartValue: {
    fontSize: 22,
    fontWeight: "800",
  },
  chartTrack: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.md,
    height: 120,
    justifyContent: "flex-end",
    overflow: "hidden",
    padding: diamomTheme.spacing.sm,
    width: "100%",
  },
  chartBar: {
    borderRadius: diamomTheme.radius.sm,
    minHeight: 12,
    width: "100%",
  },
  chartLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  chartNote: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    lineHeight: 20,
  },
  motivationalCard: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderColor: diamomTheme.colors.primaryMuted,
  },
  motivationalText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 26,
  },
});
