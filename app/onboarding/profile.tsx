
import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useProfileStore } from '@/features/onboarding/profile-store';
import { diamomTheme } from '@/theme';

export default function OnboardingProfileScreen() {
  const updateProfile = useProfileStore((state) => state.updateProfile);
  const existingProfile = useProfileStore((state) => state.profile);

  const [name, setName] = useState(existingProfile?.name || '');
  const [emergencyContactName, setEmergencyContactName] = useState(existingProfile?.emergencyContactName || '');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(existingProfile?.emergencyContactNumber || '');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (!name.trim() || !emergencyContactName.trim() || !emergencyContactNumber.trim()) {
      setError('Mohon lengkapi semua kolom agar kami dapat memberikan panduan yang sesuai.');
      return;
    }

    updateProfile({
      name,
      emergencyContactName,
      emergencyContactNumber,
    });
    
    router.push('/onboarding/pregnancy' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Profil Ibu</Text>
        <Text style={styles.subtitle}>Data ini disimpan aman di perangkat Anda secara lokal.</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nama panggilan atau lengkap" />
        </View>

        <Text style={styles.sectionTitle}>Kontak Darurat</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Kontak *</Text>
          <TextInput style={styles.input} value={emergencyContactName} onChangeText={setEmergencyContactName} placeholder="Suami, keluarga, atau bidan" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nomor Telepon *</Text>
          <TextInput style={styles.input} value={emergencyContactNumber} onChangeText={setEmergencyContactNumber} keyboardType="phone-pad" placeholder="Contoh: 081234567890" />
        </View>

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Selanjutnya</Text>
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
  errorText: { color: 'red', fontSize: 14, marginBottom: 8 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, fontWeight: '600', color: diamomTheme.colors.text },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: diamomTheme.colors.text, marginTop: 16 },
  button: { backgroundColor: diamomTheme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: diamomTheme.colors.onPrimary, fontSize: 16, fontWeight: 'bold' }
});
