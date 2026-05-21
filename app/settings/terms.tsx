
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CLAIM_SAFE_COPY } from '@/constants/claim-safe-copy';
import { diamomTheme } from '@/theme';

export default function SettingsTermsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pernyataan Medis & Ketentuan</Text>
        
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pernyataan Medis</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.MEDICAL_DISCLAIMER}</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.SUPPORT_POSITIONING}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pelacakan VAS</Text>
          <Text style={styles.body}>{CLAIM_SAFE_COPY.VAS_DISCLAIMER}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { padding: diamomTheme.spacing.xl, gap: diamomTheme.spacing.md },
  title: { fontSize: 24, fontWeight: 'bold', color: diamomTheme.colors.text, marginBottom: diamomTheme.spacing.md },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, gap: 8, borderWidth: 1, borderColor: '#eee' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: diamomTheme.colors.text },
  body: { fontSize: 15, lineHeight: 22, color: diamomTheme.colors.mutedText },
});
