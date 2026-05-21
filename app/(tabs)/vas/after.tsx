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
import { usePracticeSessionStore } from "@/features/session/session-store";
import { getVasCategory } from "@/features/session/vas-scale";
import { diamomTheme } from "@/theme";

export default function VasAfterScreen() {
  const afterScore = usePracticeSessionStore((state) => state.afterScore);
  const setAfterScore = usePracticeSessionStore((state) => state.setAfterScore);
  const [selectedScore, setSelectedScore] = useState(afterScore ?? 3);

  return (
    <DiaScreen>
      <PageHeader
        eyebrow="VAS Sesudah"
        showBack
        title="Penilaian Nyeri (VAS)"
        description="Tentukan nilai kenyamanan Anda setelah menyelesaikan kegiatan."
      />

      <IllustrationPanel
        badge={`${selectedScore}`}
        title={getVasCategory(selectedScore)}
        detail="Bandingkan hasil sebelum dan sesudah untuk memantau perubahan kenyamanan Anda."
      />

      <VasSelector onChange={setSelectedScore} value={selectedScore} />

      <SurfaceCard>
        <Text style={styles.note}>
          {CLAIM_SAFE_COPY.RESULT_LANGUAGE.SCORE_CHANGE}
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Simpan Hasil"
        onPress={() => {
          setAfterScore(selectedScore);
          router.push("/(tabs)/vas/summary");
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
