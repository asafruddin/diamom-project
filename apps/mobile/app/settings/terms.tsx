import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PageHeader, SurfaceCard } from "@/components/dia-ui";
import { CLAIM_SAFE_COPY } from "@/constants/claim-safe-copy";
import { diamomTheme } from "@/theme";

export default function SettingsTermsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <PageHeader
          eyebrow="Ketentuan"
          showBack
          title="Pernyataan Medis & Ketentuan"
          description="Halaman ini bisa dibuka kembali kapan pun dari tab Profil tanpa menyimpan data pribadi baru."
        />

        <SurfaceCard style={styles.card}>
          <Text style={styles.sectionTitle}>Pernyataan Medis</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.MEDICAL_DISCLAIMER}</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.SUPPORT_POSITIONING}</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.card}>
          <Text style={styles.sectionTitle}>Pelacakan VAS</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.VAS_DISCLAIMER}</Text>
        </SurfaceCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { padding: diamomTheme.spacing.xl, gap: diamomTheme.spacing.md },
  card: { gap: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: diamomTheme.colors.text,
  },
  body: { fontSize: 15, lineHeight: 22, color: diamomTheme.colors.mutedText },
});
