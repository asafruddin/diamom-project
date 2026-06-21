import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton, DiaScreen, PageHeader, SurfaceCard } from "@/components/dia-ui";
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

export default function VasHistoryScreen() {
  const records = useVasHistoryStore((state) => state.records);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Riwayat"
        showBack
        title="Riwayat VAS"
        description="Catatan VAS tersimpan di database DiaMom. Jika data peserta dihapus, riwayat ini juga akan ikut terhapus."
      />

      {records.length === 0 ? (
        <SurfaceCard style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Belum ada riwayat VAS</Text>
          <Text style={styles.body}>
            Setelah menekan Simpan Hasil, nilai sebelum, nilai setelah, dan
            waktu penyimpanan akan muncul di sini.
          </Text>
          <ActionButton
            accessibilityLabel="Mulai penilaian VAS"
            label="Mulai Penilaian VAS"
            onPress={() => router.push("/(tabs)/vas")}
            variant="secondary"
          />
        </SurfaceCard>
      ) : (
        <View style={styles.list}>
          {records.map((record) => {
            const difference = record.beforeScore - record.afterScore;
            const differenceLabel =
              difference === 0
                ? "Tetap"
                : difference > 0
                  ? `Turun ${difference}`
                  : `Naik ${Math.abs(difference)}`;

            return (
              <SurfaceCard key={record.id} style={styles.historyCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleBlock}>
                    <Text style={styles.cardTitle}>{record.activityTitle}</Text>
                    <Text style={styles.savedAt}>
                      Disimpan {formatSavedAt(record.savedAt)}
                    </Text>
                  </View>
                  <View style={styles.deltaPill}>
                    <Text style={styles.deltaText}>{differenceLabel}</Text>
                  </View>
                </View>

                <View style={styles.scoreRow}>
                  <ScoreBlock label="Sebelum" score={record.beforeScore} />
                  <Text style={styles.arrow}>{"->"}</Text>
                  <ScoreBlock label="Setelah" score={record.afterScore} />
                </View>

                <Text style={styles.note}>
                  Catatan ini untuk pemantauan kenyamanan diri, bukan bukti
                  hasil medis.
                </Text>
              </SurfaceCard>
            );
          })}
        </View>
      )}
    </DiaScreen>
  );
}

function ScoreBlock({ label, score }: { label: string; score: number }) {
  const scoreColor = getVasPointColor(score);

  return (
    <View style={styles.scoreBlock}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <Text style={[styles.scoreValue, { color: scoreColor }]}>{score}</Text>
      <Text style={[styles.scoreCategory, { color: scoreColor }]}>
        {getVasCategory(score)}
      </Text>
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
  emptyCard: {
    gap: diamomTheme.spacing.md,
  },
  emptyTitle: {
    color: diamomTheme.colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  list: {
    gap: diamomTheme.spacing.md,
  },
  historyCard: {
    gap: diamomTheme.spacing.md,
  },
  cardHeader: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: diamomTheme.spacing.md,
  },
  cardTitleBlock: {
    flex: 1,
    gap: diamomTheme.spacing.xs,
  },
  cardTitle: {
    color: diamomTheme.colors.text,
    fontSize: 17,
    fontWeight: "800",
  },
  savedAt: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    lineHeight: 18,
  },
  deltaPill: {
    backgroundColor: diamomTheme.colors.primaryMuted,
    borderRadius: diamomTheme.radius.pill,
    paddingHorizontal: diamomTheme.spacing.md,
    paddingVertical: diamomTheme.spacing.sm,
  },
  deltaText: {
    color: diamomTheme.colors.primaryStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  scoreRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: diamomTheme.spacing.sm,
  },
  scoreBlock: {
    alignItems: "center",
    backgroundColor: diamomTheme.colors.backgroundElevated,
    borderRadius: diamomTheme.radius.md,
    flex: 1,
    gap: diamomTheme.spacing.xs,
    minHeight: 124,
    padding: diamomTheme.spacing.md,
  },
  scoreLabel: {
    color: diamomTheme.colors.textSoft,
    fontSize: 13,
    fontWeight: "800",
  },
  scoreValue: {
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },
  scoreCategory: {
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  arrow: {
    color: diamomTheme.colors.textSoft,
    fontSize: 18,
    fontWeight: "800",
  },
  note: {
    color: diamomTheme.colors.mutedText,
    fontSize: 13,
    lineHeight: 19,
  },
});
