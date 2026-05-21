
import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProfileStore } from '@/features/onboarding/profile-store';
import { CLAIM_SAFE_COPY } from '@/constants/claim-safe-copy';
import { diamomTheme } from '@/theme';

export default function OnboardingConsentScreen() {
  const acceptDisclaimer = useProfileStore((state) => state.acceptDisclaimer);
  const [isAccepted, setIsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!isAccepted) {
      setError('Anda harus menyetujui pernyataan medis ini untuk menggunakan fitur aktivitas DiaMom.');
      return;
    }
    
    acceptDisclaimer();
    router.push('/onboarding/safety-screening' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pernyataan Medis</Text>
        <Text style={styles.subtitle}>Harap baca dan pahami batasan penggunaan aplikasi ini.</Text>

        <View style={styles.disclaimerBox}>
          <Text style={styles.disclaimerText}>{CLAIM_SAFE_COPY.MEDICAL_DISCLAIMER}</Text>
          <Text style={styles.disclaimerText}>{CLAIM_SAFE_COPY.SUPPORT_POSITIONING}</Text>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.switchGroup}>
          <Text style={styles.label}>Saya mengerti dan menyetujui pernyataan medis di atas.</Text>
          <Switch value={isAccepted} onValueChange={setIsAccepted} />
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Setuju & Lanjutkan</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { padding: diamomTheme.spacing.xl, gap: diamomTheme.spacing.md },
  title: { fontSize: 32, fontWeight: 'bold', color: diamomTheme.colors.text },
  subtitle: { fontSize: 15, color: diamomTheme.colors.mutedText, marginBottom: diamomTheme.spacing.md },
  disclaimerBox: { backgroundColor: '#fff3e0', padding: 16, borderRadius: 8, gap: 12, borderWidth: 1, borderColor: '#ffcdd2' },
  disclaimerText: { fontSize: 15, lineHeight: 22, color: '#b71c1c' },
  errorText: { color: 'red', fontSize: 14, marginBottom: 8, padding: 12, backgroundColor: '#ffebee', borderRadius: 8 },
  switchGroup: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, gap: 16, flexShrink: 1 },
  label: { fontSize: 16, fontWeight: '600', color: diamomTheme.colors.text, flex: 1, lineHeight: 22 },
  button: { backgroundColor: diamomTheme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonText: { color: diamomTheme.colors.onPrimary, fontSize: 16, fontWeight: 'bold' }
});
