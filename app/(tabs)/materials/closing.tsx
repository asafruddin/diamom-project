import { router } from "expo-router";
import { StyleSheet, Text } from "react-native";

import {
    ActionButton,
    DiaScreen,
    IllustrationPanel,
    PageHeader,
    SurfaceCard,
} from "@/components/dia-ui";
import { diamomTheme } from "@/theme";

export default function ClosingScreen() {
  return (
    <DiaScreen>
      <PageHeader
        eyebrow="Materi 5"
        showBack
        title="Penutup"
        description="Akhiri sesi belajar dengan afirmasi lembut dan fokus pada napas Anda."
      />

      <IllustrationPanel
        badge="OK"
        title="Anda hebat, Ibu."
        detail="Tetap semangat dan yakin, persalinan lancar, ibu dan bayi sehat."
      />

      <SurfaceCard>
        <Text style={styles.body}>
          Labor Dance adalah salah satu cara alami untuk membantu ibu melalui
          proses persalinan dengan lebih nyaman. Lakukan dengan tenang, fokus
          pada napas, dan percayalah pada tubuh Anda.
        </Text>
      </SurfaceCard>

      <ActionButton
        label="Mulai Penilaian VAS"
        onPress={() => router.push("/(tabs)/vas")}
      />
    </DiaScreen>
  );
}

const styles = StyleSheet.create({
  body: {
    color: diamomTheme.colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
