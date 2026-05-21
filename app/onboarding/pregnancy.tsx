
import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, Switch, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProfileStore } from '@/features/onboarding/profile-store';
import { isValidPregnancyWeek } from '@/features/onboarding/validation';
import { diamomTheme } from '@/theme';

export default function OnboardingPregnancyScreen() {
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const completeOnboarding = useProfileStore((state) => state.completeOnboarding);
  const existingProfile = useProfileStore((state) => state.profile);

  const [pregnancyWeek, setPregnancyWeek] = useState(existingProfile?.pregnancyWeek || '');
  const [estimatedDueDate, setEstimatedDueDate] = useState(existingProfile?.estimatedDueDate || '');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState(existingProfile?.isFirstPregnancy ?? true);
  const [hasProviderApproval, setHasProviderApproval] = useState(existingProfile?.hasProviderApproval ?? false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!pregnancyWeek.trim() || !estimatedDueDate.trim()) {
      setError('Mohon lengkapi semua kolom.');
      return;
    }

    if (!isValidPregnancyWeek(pregnancyWeek)) {
      setError('Minggu kehamilan tidak valid. Masukkan angka antara 1 hingga 42.');
      return;
    }

    if (!hasProviderApproval) {
      setError('Anda harus mendapatkan persetujuan dari dokter atau bidan sebelum melanjutkan.');
      return;
    }

    updateProfile({
      pregnancyWeek,
      estimatedDueDate,
      isFirstPregnancy,
      hasProviderApproval,
    });
    
    completeOnboarding();
    
    // We navigate to home, but if there's a medical disclaimer consent flow (Story 2.3), that would come next.
    router.push('/onboarding/consent' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Data Kehamilan</Text>
        <Text style={styles.subtitle}>Informasi ini membantu kami menyesuaikan panduan untuk Anda.</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Minggu Kehamilan *</Text>
          <TextInput style={styles.input} value={pregnancyWeek} onChangeText={setPregnancyWeek} keyboardType="numeric" placeholder="Contoh: 32" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Perkiraan Hari Lahir (HPL) *</Text>
          <TextInput style={styles.input} value={estimatedDueDate} onChangeText={setEstimatedDueDate} placeholder="DD/MM/YYYY" />
        </View>

        <View style={styles.switchGroup}>
          <Text style={styles.label}>Ini Kehamilan Pertama?</Text>
          <Switch value={isFirstPregnancy} onValueChange={setIsFirstPregnancy} />
        </View>

        <View style={styles.approvalBox}>
          <Text style={styles.approvalTitle}>Persetujuan Medis *</Text>
          <Text style={styles.approvalText}>
            DiaMom bukan pengganti saran medis. Panduan dari dokter atau bidan Anda selalu lebih utama dari panduan aplikasi.
          </Text>
          <View style={styles.switchGroup}>
            <Text style={styles.approvalLabel}>Saya sudah mendapat persetujuan dokter/bidan untuk melakukan aktivitas fisik ringan.</Text>
            <Switch value={hasProviderApproval} onValueChange={setHasProviderApproval} />
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Selesai</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: diamomTheme.colors.background },
  container: { padding: diamomTheme.spacing.xl, gap: diamomTheme.spacing.md },
  title: { fontSize: 32, fontWeight: 'bold', color: diamomTheme.colors.text },
  subtitle: { fontSize: 15, color: diamomTheme.colors.mutedText, marginBottom: diamomTheme.spacing.lg },
  errorText: { color: 'red', fontSize: 14, marginBottom: 8, padding: 12, backgroundColor: '#ffebee', borderRadius: 8 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, fontWeight: '600', color: diamomTheme.colors.text },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  switchGroup: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8, gap: 16, flexShrink: 1 },
  approvalBox: { backgroundColor: '#f5f5f5', padding: 16, borderRadius: 8, marginTop: 16, gap: 8 },
  approvalTitle: { fontSize: 16, fontWeight: 'bold', color: diamomTheme.colors.text },
  approvalText: { fontSize: 14, color: diamomTheme.colors.mutedText, lineHeight: 20 },
  approvalLabel: { fontSize: 14, color: diamomTheme.colors.text, flex: 1, lineHeight: 20 },
  button: { backgroundColor: diamomTheme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: diamomTheme.colors.onPrimary, fontSize: 16, fontWeight: 'bold' }
});
