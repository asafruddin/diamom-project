import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import {
    ActionButton,
    DiaScreen,
    IllustrationPanel,
    PageHeader,
    SurfaceCard,
    VasSelector,
} from "@/components/dia-ui";
import { CLAIM_SAFE_COPY } from "@/constants/claim-safe-copy";
import { useProfileStore } from "@/features/onboarding/profile-store";
import { evaluateSafetyScreening } from "@/features/session/safety-gating";
import { usePracticeSessionStore } from "@/features/session/session-store";
import { getVasCategory } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function VasBeforeScreen() {
  const beforeScore = usePracticeSessionStore((state) => state.beforeScore);
  const setBeforeScore = usePracticeSessionStore(
    (state) => state.setBeforeScore,
  );
  const safetyScreening = useProfileStore((state) => state.safetyScreening);
  const gating = evaluateSafetyScreening(safetyScreening);
  const [selectedScore, setSelectedScore] = useState(beforeScore ?? 6);

  if (gating.decision === "block") {
    return (
      <DiaScreen>
        <PageHeader
          eyebrow="VAS"
          title="Aktivitas dibatasi"
          description={gating.message}
        />
        <SurfaceCard>
          <Text style={styles.note}>
            Anda masih dapat membuka materi edukasi dan panduan napas dengan
            tenang melalui tab Materi.
          </Text>
        </SurfaceCard>
        <ActionButton
          label="Buka Daftar Materi"
          onPress={() => router.push("/(tabs)/materials")}
        />
      </DiaScreen>
    );
  }

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="VAS Sebelum"
        title="Penilaian Nyeri (VAS)"
        description="Geser pilihan Anda untuk menilai kenyamanan tubuh sebelum memulai kegiatan."
      />

      <IllustrationPanel
        badge={`${selectedScore}`}
        title={getVasCategory(selectedScore)}
        detail="Nilai ini membantu Anda memantau perubahan berdasarkan input Anda sendiri."
      />

      <VasSelector onChange={setSelectedScore} value={selectedScore} />

      <SurfaceCard>
        <Text style={styles.note}>
          {CLAIM_SAFE_COPY.RESULT_LANGUAGE.SELF_MONITORING}
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Lanjut ke Pelaksanaan"
        onPress={() => {
          setBeforeScore(selectedScore);
          router.push("/(tabs)/vas/session");
        }}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  note: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
